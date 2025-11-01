require('dotenv').config();
const mongoose = require('mongoose');
const District = require('../src/models/District');

async function main() {
  const [, , stateArg, districtArg] = process.argv;
  if (!stateArg || !districtArg) {
    console.error('Usage: node showDistrict.js "STATE" "DISTRICT"');
    process.exit(2);
  }
  const state = stateArg;
  const district = districtArg;

  try {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/mgnrega-dashboard');
    const endDate = new Date();
    const startDate = new Date();
    startDate.setFullYear(endDate.getFullYear() - 1);
    const startYear = startDate.getFullYear();
    const endYear = endDate.getFullYear();

  const stateRegex = new RegExp(`^${state.replace(/[.*+?^${}()|[\\]\\]/g, '\\$&')}$`, 'i');
  const districtRegex = new RegExp(`^${district.replace(/[.*+?^${}()|[\\]\\]/g, '\\$&')}$`, 'i');
  const data = await District.find({ state: stateRegex, district: districtRegex, year: { $gte: startYear, $lte: endYear } }).sort({ year: 1, month: 1 });
    const desc = data.slice().sort((a, b) => (b.year - a.year) || (b.month - a.month));
    const latest = desc.find(d => (d.totalWorkers && d.totalWorkers > 0) || (d.totalExpenditure && d.totalExpenditure > 0) || (d.workdaysGenerated && d.workdaysGenerated > 0)) || desc[0] || null;

    const processed = {
      totalWorkers: latest?.totalWorkers || 0,
      totalExpenditure: latest?.totalExpenditure || 0,
      workdaysGenerated: latest?.workdaysGenerated || 0,
      wagesPerDay: latest?.wagesPerDay || 0,
      monthlyTrend: data.map(d => ({ month: `${d.month}/${d.year}`, workers: d.totalWorkers, workdays: d.workdaysGenerated, expenditure: d.totalExpenditure }))
    };

    console.log(JSON.stringify(processed, null, 2));
    await mongoose.disconnect();
  } catch (err) {
    console.error('Error:', err);
    process.exit(1);
  }
}

main();
