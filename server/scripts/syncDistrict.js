#!/usr/bin/env node
require('dotenv').config();
const mongoose = require('mongoose');
const { fetchDistrictData } = require('../src/services/dataSyncService');

async function main() {
  const [, , stateArg, districtArg, yearArg, monthArg] = process.argv;
  if (!stateArg || !districtArg) {
    console.error('Usage: node syncDistrict.js "STATE" "DISTRICT" [year] [month]');
    process.exit(2);
  }

  const state = stateArg;
  const district = districtArg;
  const year = yearArg ? Number(yearArg) : (new Date()).getFullYear();
  const month = monthArg ? Number(monthArg) : ((new Date()).getMonth() + 1);

  try {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/mgnrega-dashboard');
    console.log('Connected to MongoDB');

    const doc = await fetchDistrictData(state, district, year, month);
    if (!doc) {
      console.log('No data returned for', state, district, year, month);
    } else {
      console.log('Fetched document:');
      console.log(JSON.stringify(doc, null, 2));
    }

    await mongoose.disconnect();
    process.exit(0);
  } catch (err) {
    console.error('Error running sync script:', err);
    process.exit(1);
  }
}

main();
