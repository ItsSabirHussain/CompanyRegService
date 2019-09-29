const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ANoti = new Schema({
  ID: {
    type: String
  },
  Date: {
    type: String
  },
  Content: {
    type: String
  }
});
module.exports = User = mongoose.model("ANoti", ANoti);
