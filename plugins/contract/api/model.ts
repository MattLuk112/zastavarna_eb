const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const contractSchema = new Schema(
  {
    client: {
      type: Schema.Types.ObjectId,
      ref: 'Client',
    },
    itemName: {
      type: String,
    },
    itemPrice: {
      type: Number,
    },
    payDate: {
      type: String,
      required: true,
    },
    loanAmount: {
      type: Number,
      required: true,
    },
    rate: {
      type: Schema.Types.ObjectId,
      ref: 'Rate',
    },
    totalInterest: {
      type: Number,
    },
    dayInterest: {
      type: Number,
    },
    totalPrice: {
      type: Number,
    },
  },
  { timestamps: true },
);

try {
  delete mongoose.connection.models.Contract;
} catch {}

const model = mongoose.model('Contract', contractSchema);
export default model;
