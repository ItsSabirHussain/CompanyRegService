const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Uploads = new Schema({
  CompanyName: {
    type: String
  },
  Date: {
    type: String
  }
});
module.exports = User = mongoose.model("Uploads", Uploads);
