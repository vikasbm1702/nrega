const mongoose = require('mongoose');

const districtSchema = new mongoose.Schema({
  state: {
    type: String,
    required: true
  },
  district: {
    type: String,
    required: true
  },
  month: {
    type: Number,
    required: true
  },
  year: {
    type: Number,
    required: true
  },
  totalWorkers: {
    type: Number,
    required: true
  },
  totalExpenditure: {
    type: Number,
    required: true
  },
  workdaysGenerated: {
    type: Number,
    required: true
  },
  wagesPerDay: {
    type: Number,
    required: true
  },
  // Gender distribution data
  maleWorkers: {
    type: Number,
    default: 0
  },
  femaleWorkers: {
    type: Number,
    default: 0
  },
  transgenderWorkers: {
    type: Number,
    default: 0
  },
  // Project categories data
  ruralRoadsExpenditure: {
    type: Number,
    default: 0
  },
  irrigationExpenditure: {
    type: Number,
    default: 0
  },
  waterStructuresExpenditure: {
    type: Number,
    default: 0
  },
  otherProjectsExpenditure: {
    type: Number,
    default: 0
  },
  // Additional project categories (percentage-based from API)
  categoryBWorksPercent: {
    type: Number,
    default: 0
  },
  agricultureAlliedWorksPercent: {
    type: Number,
    default: 0
  },
  nrmExpenditurePercent: {
    type: Number,
    default: 0
  },
  completedWorks: {
    type: Number,
    default: 0
  },
  ongoingWorks: {
    type: Number,
    default: 0
  },
  lastUpdated: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true
});

// Compound index for efficient querying
districtSchema.index({ state: 1, district: 1, year: 1, month: 1 });

// Individual field indexes for faster lookups
districtSchema.index({ state: 1 });
districtSchema.index({ district: 1 });
districtSchema.index({ year: 1 });
districtSchema.index({ month: 1 });

// Index for reverse geocoding and spatial queries
districtSchema.index({ state: 1, year: -1, month: -1 });

// Index for timestamp-based queries
districtSchema.index({ lastUpdated: -1 });
districtSchema.index({ createdAt: -1 });

module.exports = mongoose.model('District', districtSchema);