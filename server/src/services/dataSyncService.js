const axios = require('axios');
const cron = require('node-cron');
const District = require('../models/District');
const logger = require('../utils/logger');

const API_BASE_URL = process.env.API_BASE_URL || 'https://api.data.gov.in/resource';
const API_KEY = process.env.DATA_GOV_API_KEY;
const RESOURCE_ID = process.env.MGNREGA_DATASET_ID;

const DEFAULT_PAGE_LIMIT = 1000; // data.gov.in supports paging

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function safeNumber(v) {
  if (v == null) return 0;
  const n = Number(String(v).replace(/[^0-9.-]/g, ''));
  return Number.isNaN(n) ? 0 : n;
}

function mapRecordToDoc(record) {
  // Attempt to find common field names across possible dataset variants
  const stateRaw = record.state_name || record.state || record['State Name'] || record.st_name || record.state_ut || record.state_name_en || record['state'];
  const districtRaw = record.district_name || record.district || record['District Name'] || record.districtname || record['district'];

  // Normalize to uppercase trimmed strings to reduce duplicates
  const state = String(stateRaw || 'Unknown').trim().toUpperCase();
  const district = String(districtRaw || 'Unknown').trim().toUpperCase();

  // Year parsing: fin_year may be '2024-2025' or 'FY 2024-25' — extract first 4-digit number
  let year = null;
  const yearCandidates = [record.year, record.fin_year, record['Year'], record['year']];
  for (const y of yearCandidates) {
    if (!y) continue;
    const m = String(y).match(/(\d{4})/);
    if (m) {
      year = Number(m[1]);
      break;
    }
    const n = safeNumber(y);
    if (n) { year = n; break; }
  }
  if (!year) year = new Date().getFullYear();

  // Month parsing: accept numeric or textual months
  const monthRaw = record.month || record.month_no || record['Month'] || record['month'];
  let month = 0;
  if (monthRaw) {
    const mnum = safeNumber(monthRaw);
    if (mnum) month = mnum;
    else {
      const mstr = String(monthRaw).toLowerCase();
      const months = { jan:1, feb:2, mar:3, apr:4, may:5, jun:6, jul:7, aug:8, sep:9, sept:9, oct:10, nov:11, dec:12 };
      for (const key of Object.keys(months)) if (mstr.indexOf(key) !== -1) { month = months[key]; break; }
    }
  }
  if (!month) month = new Date().getMonth() + 1;

  // Total workers/expenditure/workdays/wages: include alternate field names observed in data.gov.in
  const totalWorkers = safeNumber(
    record.total_workers || record.no_of_workers || record['No. of Workers'] || record.persons || record['beneficiaries'] || record.total_persons || record['Total Workers'] || record.Total_Individuals_Worked || record.Total_No_of_Workers || record.total_individuals_worked
  );
  const totalExpenditure = safeNumber(
    record.total_expenditure || record.amount || record.expenditure || record.total_expenditure_in_rs || record['Total Expenditure'] || record.Total_Exp || record.total_exp || record['Total_Exp'] || record.Wages
  );
  const workdaysGenerated = safeNumber(
    record.workdays_generated || record.work_days || record['Work Days'] || record.total_person_days || record['Workdays'] || record['Total_Persondays'] || record.Persondays_of_Central_Liability_so_far || record.Women_Persondays
  );
  let wagesPerDay = safeNumber(
    record.wages_per_day || record.avg_daily_wage || record['Avg Daily Wage'] || record.Average_Wage_rate_per_day_per_person || record.Average_Wage || record['Average_Wage_rate_per_day_per_person']
  );
  if (!wagesPerDay && totalExpenditure && workdaysGenerated) {
    wagesPerDay = Math.round(totalExpenditure / Math.max(1, workdaysGenerated));
  }

  // Gender distribution: extract if available in API data
  const maleWorkers = safeNumber(
    record.male_workers || record.males || record['Male'] || record.Male_Workers || record['male workers']
  );
  const femaleWorkers = safeNumber(
    record.female_workers || record.females || record['Female'] || record.Female_Workers || record['female workers']
  );
  const transgenderWorkers = safeNumber(
    record.transgender_workers || record.transgender || record['Transgender'] || record.Transgender_Workers || record['transgender workers']
  );

  // Project categories: extract expenditure by category if available in API data
  const ruralRoadsExpenditure = safeNumber(
    record.rural_roads_expenditure || record.rural_roads || record['Rural Roads'] || record.Rural_Infrastructure
  );
  const irrigationExpenditure = safeNumber(
    record.irrigation_expenditure || record.irrigation || record['Irrigation'] || record.Irrigation_Projects
  );
  const waterStructuresExpenditure = safeNumber(
    record.water_structures_expenditure || record.water_structures || record['Water Structures'] || record.Water_Projects
  );
  const otherProjectsExpenditure = safeNumber(
    record.other_projects_expenditure || record.other_projects || record['Other Projects']
  );

  // Additional project categories (percentages from API)
  const categoryBWorksPercent = safeNumber(
    record.percent_of_Category_B_Works || record.category_b_works_percent || record['percent_of_Category_B_Works']
  );
  const agricultureAlliedWorksPercent = safeNumber(
    record.percent_of_Expenditure_on_Agriculture_Allied_Works || record.agriculture_allied_works_percent || record['percent_of_Expenditure_on_Agriculture_Allied_Works']
  );
  const nrmExpenditurePercent = safeNumber(
    record.percent_of_NRM_Expenditure || record.nrm_expenditure_percent || record['percent_of_NRM_Expenditure']
  );

  // Works information
  const completedWorks = safeNumber(
    record.Number_of_Completed_Works || record.completed_works || record['Number of Completed Works']
  );
  const ongoingWorks = safeNumber(
    record.Number_of_Ongoing_Works || record.ongoing_works || record['Number of Ongoing Works']
  );

  return {
    state: String(state || 'Unknown').trim(),
    district: String(district || 'Unknown').trim(),
    year: Number(year),
    month: Number(month),
    totalWorkers: Number(totalWorkers),
    totalExpenditure: Number(totalExpenditure),
    workdaysGenerated: Number(workdaysGenerated),
    wagesPerDay: Number(wagesPerDay),
    maleWorkers: Number(maleWorkers),
    femaleWorkers: Number(femaleWorkers),
    transgenderWorkers: Number(transgenderWorkers),
    ruralRoadsExpenditure: Number(ruralRoadsExpenditure),
    irrigationExpenditure: Number(irrigationExpenditure),
    waterStructuresExpenditure: Number(waterStructuresExpenditure),
    otherProjectsExpenditure: Number(otherProjectsExpenditure),
    categoryBWorksPercent: Number(categoryBWorksPercent),
    agricultureAlliedWorksPercent: Number(agricultureAlliedWorksPercent),
    nrmExpenditurePercent: Number(nrmExpenditurePercent),
    completedWorks: Number(completedWorks),
    ongoingWorks: Number(ongoingWorks),
    lastUpdated: new Date()
  };
}

async function fetchResourcePage(limit = DEFAULT_PAGE_LIMIT, offset = 0, filters = {}) {
  if (!RESOURCE_ID || !API_KEY) {
    throw new Error('RESOURCE_ID or API_KEY is not configured in environment');
  }

  const params = {
    'api-key': API_KEY,
    format: 'json',
    limit,
    offset,
    // filters can be passed as a JSON encoded string in some APIs, but data.gov.in accepts filter params directly if documented.
    // We'll pass nothing additional by default.
  };
    // Merge any provided filters into params (caller may pass state/district/year/month keys using various possible names)
    if (filters && typeof filters === 'object') {
      Object.assign(params, filters);
    }

  try {
    const url = `${API_BASE_URL}/${RESOURCE_ID}`;
    const resp = await axios.get(url, { params, headers: { Accept: 'application/json' } });
    if (resp?.data?.records) return resp.data.records;
    // some responses may provide data directly
    if (Array.isArray(resp.data)) return resp.data;
    return [];
  } catch (err) {
    logger.error('Error fetching resource page:', err?.response?.data || err.message || err);
    throw err;
  }
}

async function fetchAllAndUpsert() {
  logger.info('Starting full fetch from data.gov.in');
  let offset = 0;
  const limit = DEFAULT_PAGE_LIMIT;
  let page = 0;
  const maxPages = 1000; // safety guard

  while (page < maxPages) {
    try {
      const records = await fetchResourcePage(limit, offset);
      if (!records || records.length === 0) {
        logger.info('No more records returned by API');
        break;
      }

      logger.info(`Fetched ${records.length} records (offset=${offset})`);

      for (const rec of records) {
        const doc = mapRecordToDoc(rec);
        if (!doc.state || !doc.district) continue; // skip incomplete records

        const query = { state: doc.state, district: doc.district, year: doc.year, month: doc.month };
        try {
          await District.findOneAndUpdate(query, doc, { upsert: true, new: true, runValidators: true });
        } catch (dbErr) {
          logger.error('DB upsert error for', query, dbErr.message || dbErr);
        }
      }

      // rate-limit friendly pause
      await sleep(500);

      offset += records.length;
      page += 1;
    } catch (err) {
      logger.error('Stopping fetch loop due to error:', err.message || err);
      break;
    }
  }

  logger.info('Full fetch and upsert completed');
}

async function fetchDistrictData(state, district, year, month) {
  // Fetch most recent record for specific district/month/year from our DB; if not present, attempt to fetch from API
  try {
    const doc = await District.findOne({ state, district, year, month });
    if (doc) return doc.toObject();

    // If not present in DB, try to fetch from API filtered by state/district/year/month
    // data.gov.in supports filters but exact param names may vary; try fetching full dataset and filter client-side as fallback
    logger.info(`No DB entry for ${district}, ${state} ${month}/${year} — will attempt API fetch`);

    // Try a few filter combinations to ask the API for the specific district/month/year
    const finYearStr = `${year}-${year + 1}`;
    const filterSets = [
      { state_name: state, district_name: district, month, fin_year: finYearStr },
      { state: state, district: district, month, year },
      { state_name: state, district: district, month },
      { state: state, district: district, month }
    ];

    for (const filters of filterSets) {
      try {
        let offset = 0;
        const pages = 5; // try up to 5 pages for targeted search
        for (let p = 0; p < pages; p++) {
          const records = await fetchResourcePage(1000, offset, filters);
          if (!records || records.length === 0) break;

          const matched = records.find(r => {
            const s = (r.state_name || r.state || r.st_name || r.state_ut || r['State Name'] || '').toString().trim().toLowerCase();
            const d = (r.district_name || r.district || r.districtname || r['District Name'] || '').toString().trim().toLowerCase();
            const ryear = Number(r.year || (r.fin_year && String(r.fin_year).match(/(\d{4})/)?.[1]) || year);
            return s === (String(state).toLowerCase()) && d === (String(district).toLowerCase()) && (ryear === Number(year));
          });

          if (matched) {
            const docMapped = mapRecordToDoc(matched);
            await District.findOneAndUpdate({ state: docMapped.state, district: docMapped.district, year: docMapped.year, month: docMapped.month }, docMapped, { upsert: true, new: true });
            return docMapped;
          }

          offset += records.length;
          await sleep(300);
        }
      } catch (err) {
        logger.error('Error while attempting filtered API fetch:', err?.message || err);
      }
    }

    // fallback: return null
    return null;
  } catch (err) {
    logger.error('fetchDistrictData error:', err.message || err);
    return null;
  }
}

async function updateDistrictData(data) {
  try {
    const query = {
      state: data.state,
      district: data.district,
      year: data.year,
      month: data.month
    };

    const updatedDistrict = await District.findOneAndUpdate(
      query,
      data,
      {
        upsert: true,
        new: true,
        runValidators: true
      }
    );

    logger.info(`Updated data for ${data.district}, ${data.state}`);
    return updatedDistrict;
  } catch (error) {
    logger.error('Error updating district data:', error);
    throw error;
  }
}

function setupDataSync() {
  // Run a full sync once at startup (non-blocking)
  (async () => {
    try {
      await fetchAllAndUpsert();
    } catch (err) {
      logger.error('Initial full sync failed:', err.message || err);
    }
  })();

  // Schedule incremental full-sync daily at 02:00 AM
  cron.schedule('0 2 * * *', async () => {
    logger.info('Scheduled daily full sync starting');
    try {
      await fetchAllAndUpsert();
      logger.info('Scheduled daily full sync completed');
    } catch (err) {
      logger.error('Scheduled sync failed:', err.message || err);
    }
  });

  // Additionally, a lighter daily sync for most recent month at midnight
  cron.schedule('0 0 * * *', async () => {
    logger.info('Scheduled incremental sync starting');
    try {
      // simple approach: fetch first few pages and upsert — keeps recent data fresh
      let offset = 0;
      const pages = 3;
      for (let i = 0; i < pages; i++) {
        const records = await fetchResourcePage(DEFAULT_PAGE_LIMIT, offset);
        if (!records || records.length === 0) break;
        for (const rec of records) {
          const doc = mapRecordToDoc(rec);
          if (!doc.state || !doc.district) continue;
          await District.findOneAndUpdate({ state: doc.state, district: doc.district, year: doc.year, month: doc.month }, doc, { upsert: true, new: true });
        }
        offset += records.length;
        await sleep(400);
      }
      logger.info('Scheduled incremental sync completed');
    } catch (err) {
      logger.error('Scheduled incremental sync failed:', err.message || err);
    }
  });
}

module.exports = {
  setupDataSync,
  fetchDistrictData,
  updateDistrictData,
};