const express = require('express');
const router = express.Router();
const District = require('../models/District');
const { fetchDistrictData } = require('../services/dataSyncService');
const { createReport } = require('../services/reportService');
const logger = require('../utils/logger');
const { paginationMiddleware, buildPaginatedResponse } = require('../utils/pagination');
const {
  handleValidationErrors,
  validateSyncBody,
  validateSyncBodyDistrict,
  validateSyncBodyYear,
  validateSyncBodyMonth,
  validateReverseGeocodeBody,
  validateReverseGeocodeBodyLongitude
} = require('../utils/validators');

// Admin: trigger on-demand sync for a specific district (useful for testing)
router.post('/sync', 
  validateSyncBody,
  validateSyncBodyDistrict,
  validateSyncBodyYear,
  validateSyncBodyMonth,
  handleValidationErrors,
  async (req, res) => {
    try {
      const { state, district, year, month } = req.body || {};
      if (!state || !district) return res.status(400).json({ error: 'state and district required' });
      const y = year || new Date().getFullYear();
      const m = month || (new Date().getMonth() + 1);
      const doc = await fetchDistrictData(state, district, y, m);
      if (!doc) return res.status(404).json({ error: 'No data found from API for given params' });
      return res.json({ ok: true, doc });
    } catch (err) {
      logger.error('Error in on-demand sync:', err);
      return res.status(500).json({ error: 'Internal server error' });
    }
  }
);

// Return list of all states (distinct) - with pagination support
router.get('/states', paginationMiddleware, async (req, res) => {
  try {
    const states = await District.distinct('state');
    // sort alphabetically
    // normalize to uppercase and dedupe
    const norm = Array.from(new Set(states.map(s => String(s || '').trim().toUpperCase()))).sort((a, b) => a.localeCompare(b));
    
    // Apply pagination
    const { limit, offset } = req.pagination;
    const paginatedStates = norm.slice(offset, offset + limit);
    
    res.json(buildPaginatedResponse(paginatedStates, norm.length, limit, offset));
  } catch (error) {
    logger.error('Error fetching states:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Return list of districts for a state
// helper to escape regex chars
function escapeRegExp(string) {
  return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

// Return list of districts for a specific state - with pagination
const { validateStateParam, validateDateRangeQuery } = require('../utils/validators');
router.get('/states/:state/districts', 
  validateStateParam,
  handleValidationErrors,
  paginationMiddleware,
  async (req, res) => {
    try {
      const { state } = req.params;
      const stateRegex = new RegExp(`^${escapeRegExp(state)}$`, 'i');
      const districts = await District.distinct('district', { state: stateRegex });
      // Sort alphabetically and dedupe
      const norm = Array.from(new Set(districts.map(d => String(d || '').trim().toUpperCase()))).sort((a, b) => a.localeCompare(b));
      
      // Apply pagination
      const { limit, offset } = req.pagination;
      const paginatedDistricts = norm.slice(offset, offset + limit);
      
      res.json(buildPaginatedResponse(paginatedDistricts, norm.length, limit, offset));
    } catch (error) {
      logger.error('Error fetching districts for state:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  }
);

const { validateDistrictParam } = require('../utils/validators');
router.get('/:state/:district', 
  validateStateParam,
  validateDistrictParam,
  validateDateRangeQuery,
  handleValidationErrors,
  async (req, res) => {
    const { state, district } = req.params;
    const { range, startMonth, endMonth } = req.query;
    try {
      let startYear, endYear, startMonthNum = 1, endMonthNum = 12;

      // Parse date range from query parameters if provided
      if (startMonth && endMonth) {
        // startMonth and endMonth should be in YYYY-MM format
        const [startYear_param, startMonth_param] = startMonth.split('-').map(Number);
        const [endYear_param, endMonth_param] = endMonth.split('-').map(Number);
        startYear = startYear_param;
        endYear = endYear_param;
        startMonthNum = startMonth_param;
        endMonthNum = endMonth_param;
      } else {
        // Default: use range parameter or default to 1 year
        const endDate = new Date();
        const startDate = new Date();
        const rangeMonths = parseInt(range?.replace('m', '')?.replace('y', '') || '12') || 12;
        if (range?.includes('y')) {
          startDate.setFullYear(endDate.getFullYear() - (rangeMonths || 1));
        } else {
          startDate.setMonth(endDate.getMonth() - (rangeMonths || 12));
        }
        startYear = startDate.getFullYear();
        endYear = endDate.getFullYear();
      }

      // Use case-insensitive matching to handle inconsistent casing in DB
      const stateRegex = new RegExp(`^${escapeRegExp(state)}$`, 'i');
      const districtRegex = new RegExp(`^${escapeRegExp(district)}$`, 'i');

      // Build query with date range filter
      let query = { state: stateRegex, district: districtRegex };
      
      if (startMonth && endMonth) {
        // Filter by month/year range
        query.$or = [];
        for (let y = startYear; y <= endYear; y++) {
          const minMonth = y === startYear ? startMonthNum : 1;
          const maxMonth = y === endYear ? endMonthNum : 12;
          query.$or.push({
            year: y,
            month: { $gte: minMonth, $lte: maxMonth }
          });
        }
      } else {
        query.year = { $gte: startYear, $lte: endYear };
      }

      const data = await District.find(query).sort({ year: 1, month: 1 });
      
      // Prefer latest non-zero record
      const desc = data.slice().sort((a, b) => (b.year - a.year) || (b.month - a.month));
      const latest = desc.find(d => (d.totalWorkers && d.totalWorkers > 0) || (d.totalExpenditure && d.totalExpenditure > 0) || (d.workdaysGenerated && d.workdaysGenerated > 0)) || desc[0] || null;

      // Calculate gender distribution from the data range
      let totalMaleWorkers = 0;
      let totalFemaleWorkers = 0;
      let totalTransgenderWorkers = 0;
      
      data.forEach(d => {
        totalMaleWorkers += d.maleWorkers || 0;
        totalFemaleWorkers += d.femaleWorkers || 0;
        totalTransgenderWorkers += d.transgenderWorkers || 0;
      });
      
      // If no specific gender data, derive from total workers (reasonable split)
      let genderDistribution = [];
      if (totalMaleWorkers > 0 || totalFemaleWorkers > 0 || totalTransgenderWorkers > 0) {
        genderDistribution = [
          { name: 'Male', value: Math.round(totalMaleWorkers) },
          { name: 'Female', value: Math.round(totalFemaleWorkers) },
          { name: 'Transgender', value: Math.round(totalTransgenderWorkers) }
        ].filter(g => g.value > 0);
      } else {
        // Fallback: estimate based on total workers (60% male, 39% female, 1% transgender)
        const total = data.reduce((sum, d) => sum + (d.totalWorkers || 0), 0);
        genderDistribution = [
          { name: 'Male', value: Math.round(total * 0.60) },
          { name: 'Female', value: Math.round(total * 0.39) },
          { name: 'Transgender', value: Math.round(total * 0.01) }
        ];
      }

      // Calculate project categories distribution
      let totalRuralRoads = 0;
      let totalIrrigation = 0;
      let totalWaterStructures = 0;
      let totalOtherProjects = 0;
      
      data.forEach(d => {
        totalRuralRoads += d.ruralRoadsExpenditure || 0;
        totalIrrigation += d.irrigationExpenditure || 0;
        totalWaterStructures += d.waterStructuresExpenditure || 0;
        totalOtherProjects += d.otherProjectsExpenditure || 0;
      });
      
      let projectCategories = [];
      if (totalRuralRoads > 0 || totalIrrigation > 0 || totalWaterStructures > 0 || totalOtherProjects > 0) {
        projectCategories = [
          { category: 'Rural Roads', value: Math.round(totalRuralRoads) },
          { category: 'Irrigation', value: Math.round(totalIrrigation) },
          { category: 'Water Structures', value: Math.round(totalWaterStructures) },
          { category: 'Other Projects', value: Math.round(totalOtherProjects) }
        ].filter(p => p.value > 0);
      } else {
        // Fallback: estimate based on total expenditure (35% rural roads, 25% irrigation, 25% water, 15% other)
        const totalExp = data.reduce((sum, d) => sum + (d.totalExpenditure || 0), 0);
        projectCategories = [
          { category: 'Rural Roads', value: Math.round(totalExp * 0.35) },
          { category: 'Irrigation', value: Math.round(totalExp * 0.25) },
          { category: 'Water Structures', value: Math.round(totalExp * 0.25) },
          { category: 'Other Projects', value: Math.round(totalExp * 0.15) }
        ];
      }

      const processed = {
        totalWorkers: latest?.totalWorkers || 0,
        totalExpenditure: latest?.totalExpenditure || 0,
        workdaysGenerated: latest?.workdaysGenerated || 0,
        wagesPerDay: latest?.wagesPerDay || 0,
        genderDistribution: genderDistribution,
        projectCategories: projectCategories,
        monthlyTrend: data.map(d => ({ month: `${d.month}/${d.year}`, workers: d.totalWorkers, workdays: d.workdaysGenerated, expenditure: d.totalExpenditure }))
      };

      res.json(processed);
    } catch (err) {
      logger.error('Error fetching district dashboard data', err);
      res.status(500).json({ error: 'Server error' });
    }
  }
);


// Get comparison data for nearby districts
router.get('/:state/compare/:district', 
  validateStateParam,
  validateDistrictParam,
  handleValidationErrors,
  async (req, res) => {
    try {
      const { state, district } = req.params;

      // Get data for all districts in the state
      const stateRegex = new RegExp(`^${state.replace(/[.*+?^${}()|[\\]\\]/g, '\\$&')}$`, 'i');
      
      // Find the most recent year and month available in the database
      const latestRecord = await District.findOne({ state: stateRegex })
        .sort({ year: -1, month: -1 });
      
      if (!latestRecord) {
        return res.json([]);
      }

      // Get all districts for that latest month/year
      const districtsData = await District.find({
        state: stateRegex,
        year: latestRecord.year,
        month: latestRecord.month
      }).select('district totalWorkers workdaysGenerated totalExpenditure').lean();

      // Map to expected frontend format
      const formattedData = districtsData.map(d => ({
        district: d.district,
        workers: d.totalWorkers,
        workdays: d.workdaysGenerated,
        expenditure: d.totalExpenditure
      }));

      res.json(formattedData);
    } catch (error) {
      logger.error('Error fetching comparison data:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  }
);

// Reverse geocode coordinates and find matching state/district
router.post('/reverse-geocode', 
  validateReverseGeocodeBody,
  validateReverseGeocodeBodyLongitude,
  handleValidationErrors,
  async (req, res) => {
    try {
      const { latitude, longitude } = req.body;

      // Step 1: Reverse geocode using Nominatim
      const nominatimUrl = `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${latitude}&lon=${longitude}`;
      const nominatimResponse = await fetch(nominatimUrl);
      const nominatimData = await nominatimResponse.json();
      
      const address = nominatimData.address || {};
      // Extract possible state/district names from Nominatim response
      const possibleState = address.state || address.province || address.region || '';
      const possibleDistrict = address.state_district || address.county || address.district || address.subdivision || '';

      // Step 2: Get all available states and districts
      const allStates = await District.distinct('state');
      const availableStates = Array.from(new Set(allStates.map(s => String(s || '').trim().toUpperCase()))).sort();

      // Step 3: Fuzzy match to find the best matching state
      const matchedState = findBestMatch(possibleState, availableStates);
      if (!matchedState) {
        return res.status(404).json({ 
          error: 'Could not detect state from coordinates',
          detected: possibleState
        });
      }

      // Step 4: Get districts for matched state and find best matching district
      const stateRegex = new RegExp(`^${escapeRegExp(matchedState)}$`, 'i');
      const allDistricts = await District.distinct('district', { state: stateRegex });
      const availableDistricts = Array.from(new Set(allDistricts.map(d => String(d || '').trim().toUpperCase()))).sort();

      const matchedDistrict = findBestMatch(possibleDistrict, availableDistricts);
      if (!matchedDistrict) {
        return res.status(404).json({ 
          error: 'Could not detect district from coordinates',
          state: matchedState,
          detected: possibleDistrict
        });
      }

      res.json({
        state: matchedState,
        district: matchedDistrict,
        coordinates: { latitude, longitude },
        nominatimData: { possibleState, possibleDistrict }
      });
    } catch (error) {
      logger.error('Error in reverse geocoding:', error);
      res.status(500).json({ error: 'Failed to reverse geocode coordinates' });
    }
  }
);

// Fuzzy match helper: find the best matching string from a list
function findBestMatch(searchTerm, options) {
  if (!searchTerm || !options || options.length === 0) return null;

  const search = String(searchTerm).trim().toUpperCase();
  
  // Exact match
  if (options.includes(search)) return search;

  // Contains match
  for (const opt of options) {
    if (opt.includes(search) || search.includes(opt)) {
      return opt;
    }
  }

  // Levenshtein-like similarity (simple version)
  let bestMatch = null;
  let bestScore = 0;
  
  for (const opt of options) {
    const score = stringSimilarity(search, opt);
    if (score > bestScore && score > 0.6) { // Require at least 60% similarity
      bestScore = score;
      bestMatch = opt;
    }
  }

  return bestMatch;
}

// Simple string similarity scorer (0-1 scale)
function stringSimilarity(s1, s2) {
  const longer = s1.length > s2.length ? s1 : s2;
  const shorter = s1.length > s2.length ? s2 : s1;
  
  if (longer.length === 0) return 1;

  const editDistance = getEditDistance(longer, shorter);
  return (longer.length - editDistance) / longer.length;
}

// Calculate Levenshtein distance
function getEditDistance(s1, s2) {
  const costs = [];
  for (let i = 0; i <= s1.length; i++) {
    let lastValue = i;
    for (let j = 0; j <= s2.length; j++) {
      if (i === 0) {
        costs[j] = j;
      } else if (j > 0) {
        let newValue = costs[j - 1];
        if (s1.charAt(i - 1) !== s2.charAt(j - 1)) {
          newValue = Math.min(Math.min(newValue, lastValue), costs[j]) + 1;
        }
        costs[j - 1] = lastValue;
        lastValue = newValue;
      }
    }
    if (i > 0) costs[s2.length] = lastValue;
  }
  return costs[s2.length];
}

// Get project descriptions with statistics across all available data
router.get('/projects/descriptions/all', async (req, res) => {
  try {
    // Get all districts data and aggregate project statistics
    const data = await District.find({}).lean();
    
    if (!data || data.length === 0) {
      return res.json({
        projects: [
          {
            id: 'ruralRoads',
            label: 'Rural Roads',
            totalWorks: 0,
            totalExpenditure: 0,
            averageExpenditure: 0
          },
          {
            id: 'irrigation',
            label: 'Irrigation',
            totalWorks: 0,
            totalExpenditure: 0,
            averageExpenditure: 0
          },
          {
            id: 'waterStructures',
            label: 'Water Structures',
            totalWorks: 0,
            totalExpenditure: 0,
            averageExpenditure: 0
          },
          {
            id: 'agriculture',
            label: 'Agriculture & Allied Activities',
            totalWorks: 0,
            totalExpenditure: 0,
            averageExpenditure: 0
          },
          {
            id: 'categoryB',
            label: 'Category B Works',
            percentOfWorks: 0
          },
          {
            id: 'nrm',
            label: 'Natural Resource Management',
            percentOfExpenditure: 0
          }
        ],
        summary: {
          totalCompletedWorks: 0,
          totalOngoingWorks: 0,
          totalExpenditure: 0
        }
      });
    }

    // Aggregate project statistics
    let totalRuralRoadsExp = 0;
    let totalIrrigationExp = 0;
    let totalWaterStructuresExp = 0;
    let totalAgricultureExp = 0;
    let totalCategoryBPercent = 0;
    let totalNRMPercent = 0;
    let totalExpenditure = 0;
    let totalCompletedWorks = 0;
    let totalOngoingWorks = 0;
    let recordCount = 0;

    data.forEach(d => {
      if (d.ruralRoadsExpenditure) totalRuralRoadsExp += d.ruralRoadsExpenditure;
      if (d.irrigationExpenditure) totalIrrigationExp += d.irrigationExpenditure;
      if (d.waterStructuresExpenditure) totalWaterStructuresExp += d.waterStructuresExpenditure;
      totalExpenditure += (d.totalExpenditure || 0);
      totalCategoryBPercent += (d.categoryBWorksPercent || 0);
      totalNRMPercent += (d.nrmExpenditurePercent || 0);
      totalCompletedWorks += (d.completedWorks || 0);
      totalOngoingWorks += (d.ongoingWorks || 0);
      recordCount++;
    });

    // Calculate average percentages
    const avgCategoryBPercent = recordCount > 0 ? totalCategoryBPercent / recordCount : 0;
    const avgNRMPercent = recordCount > 0 ? totalNRMPercent / recordCount : 0;

    const projects = [
      {
        id: 'ruralRoads',
        label: 'Rural Roads',
        totalExpenditure: Math.round(totalRuralRoadsExp),
        averageExpenditure: recordCount > 0 ? Math.round(totalRuralRoadsExp / recordCount) : 0
      },
      {
        id: 'irrigation',
        label: 'Irrigation',
        totalExpenditure: Math.round(totalIrrigationExp),
        averageExpenditure: recordCount > 0 ? Math.round(totalIrrigationExp / recordCount) : 0
      },
      {
        id: 'waterStructures',
        label: 'Water Structures',
        totalExpenditure: Math.round(totalWaterStructuresExp),
        averageExpenditure: recordCount > 0 ? Math.round(totalWaterStructuresExp / recordCount) : 0
      },
      {
        id: 'agriculture',
        label: 'Agriculture & Allied Activities',
        percentOfExpenditure: Math.round(totalAgricultureExp > 0 ? (totalAgricultureExp / totalExpenditure * 100) : 0)
      },
      {
        id: 'categoryB',
        label: 'Category B Works',
        averagePercent: Math.round(avgCategoryBPercent)
      },
      {
        id: 'nrm',
        label: 'Natural Resource Management',
        averagePercent: Math.round(avgNRMPercent)
      }
    ];

    const summary = {
      totalCompletedWorks,
      totalOngoingWorks,
      totalExpenditure: Math.round(totalExpenditure),
      recordsProcessed: recordCount
    };

    res.json({ projects, summary });
  } catch (error) {
    logger.error('Error fetching project descriptions:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Export district data
router.get('/export/:state/:district', 
  validateStateParam,
  validateDistrictParam,
  async (req, res) => {
    try {
      const { state, district } = req.params;
      let { format } = req.query;
      
      // Validate format parameter
      format = format?.toLowerCase() || 'pdf';
      if (!['csv', 'pdf'].includes(format)) {
        return res.status(400).json({ error: 'Invalid format. Use csv or pdf.' });
      }
      
      const stateRegex = new RegExp(`^${escapeRegExp(state)}$`, 'i');
      const districtRegex = new RegExp(`^${escapeRegExp(district)}$`, 'i');
      const data = await District.find({ state: stateRegex, district: districtRegex })
                               .sort({ year: 1, month: 1 })
                               .lean();
      
      if (!data || data.length === 0) {
        return res.status(404).json({ error: 'No data found for specified state/district' });
      }

      const report = await createReport(data, format);
      
      // Set proper headers for file download
      const mimeType = format === 'csv' ? 'text/csv; charset=utf-8' : 'application/pdf';
      const filename = `MGNREGA-${district}-${new Date().toISOString().split('T')[0]}.${format}`;
      
      res.setHeader('Content-Type', mimeType);
      res.setHeader('Content-Disposition', `attachment; filename="${filename}"`);
      res.setHeader('Content-Length', Buffer.byteLength(report));
      res.send(report);
    } catch (error) {
      logger.error('Error exporting district data:', error);
      res.status(500).json({ error: 'Failed to generate report' });
    }
  }
);

module.exports = router;