const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const rateSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    percentageFromPrice: {
      type: Number,
      required: true,
    },
    amount: {
      type: Number,
      required: true,
    },
    days: {
      type: Number,
      required: true,
    },
    maxPrice: {
      type: Number,
      required: true,
    },
    maxDays: {
      type: Number,
      required: true,
    },
    fineForLost: {
      type: Number,
    },
  },
  { timestamps: true },
);

try {
  delete mongoose.connection.models.Rate;
} catch {}

const model = mongoose.model('Rate', rateSchema);
export default model;
