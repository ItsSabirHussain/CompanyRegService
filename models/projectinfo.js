const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ProjectInfo = new Schema({
  ID: {
    type: String
  },
  CompanyName: {
    type: String
  },
  UserName: {
    type: String
  },
  Address: {
    type: String
  },
  Type: {
    type: String
  },
  Status: {
    type: String
  },
  CEOName: {
    type: String
  },
  Headquarter: {
    type: String
  },
  Date: {
    type: String
  },
  ACN: {
    type: String
  }
});
module.exports = User = mongoose.model("ProjectInfo", ProjectInfo);
