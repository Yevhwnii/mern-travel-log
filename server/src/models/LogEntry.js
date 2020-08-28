const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const requiredString = {
  type: String,
  required: true,
};

const requiredNumber = {
  type: Number,
  required: true,
};

const logEntrySchema = new Schema(
  {
    title: requiredString,
    description: String,
    comments: String,
    rating: {
      type: Number,
      min: 0,
      max: 10,
      default: 0,
    },
    image: String,
    lat: { ...requiredNumber, min: -90, max: 90 },
    lng: { ...requiredNumber, min: -180, max: 180 },
    visitDate: {
      required: true,
      type: Date,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('LogEntry', logEntrySchema);
