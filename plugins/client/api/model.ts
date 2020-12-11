const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const clientSchema = new Schema(
  {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    street: {
      type: String,
      required: true,
    },
    city: {
      type: String,
      required: true,
    },
    idCard: {
      type: String,
      required: true,
    },
    birthNumber: {
      type: String,
      required: true,
    },
    nationality: {
      type: String,
      required: true,
    },
    sex: {
      type: String,
      required: false,
    },
  },
  { timestamps: true },
);

try {
  delete mongoose.connection.models.Client;
} catch {}

const model = mongoose.model('Client', clientSchema);
export default model;
