const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Payment = new Schema({
  ID: {
    type: String
  },
  Name: {
    type: String
  },
  Number: {
    type: String
  },
  CVV: {
    type: String
  }
});
module.exports = User = mongoose.model("Payment", Payment);
