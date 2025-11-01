require('dotenv').config();
const mongoose = require('mongoose');
const District = require('../src/models/District');

async function main() {
  try {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/mgnrega-dashboard');
    const states = await District.distinct('state');
    console.log('States count:', states.length);
    console.log(states.slice(0,50));

    const kDistricts = await District.distinct('district', { state: { $regex: /^K/i } });
    console.log('\nDistricts for states starting with K (samples):', kDistricts.slice(0,60));

    const samples = await District.find({ district: { $regex: /^RAMAN/i } }).limit(20).sort({ year: -1, month: -1 });
    console.log('\nSample docs for district matching RAMAN* (count:', samples.length, ')');
    samples.forEach(d => {
      console.log(`- ${d.state} | ${d.district} | ${d.year}-${d.month} | workers:${d.totalWorkers} exp:${d.totalExpenditure}`);
    });

    await mongoose.disconnect();
  } catch (err) {
    console.error('Error:', err);
    process.exit(1);
  }
}

main();
