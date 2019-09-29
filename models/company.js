const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Company = new Schema({
  UserID: {
    type: String
  },
  CompanyName: {
    type: String
  },
  UserName: {
    type: String
  },
  Status: {
    type: String
  },
  Address: {
    type: String
  },
  Headquarter: {
    type: String
  },
  Date: {
    type: String
  },
  Type: {
    type: String
  },
  ACN: {
    type: String
  },
  CEOName: {
    type: String
  }
});
module.exports = User = mongoose.model("Company", Company);
