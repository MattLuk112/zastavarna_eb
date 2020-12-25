const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const pageSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
  },
  { timestamps: true },
);

try {
  delete mongoose.connection.models.Page;
} catch {}

const model = mongoose.model('Page', pageSchema);
export default model;
