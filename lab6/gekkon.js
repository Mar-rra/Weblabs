const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const gekkonSchema = new Schema({
  value:Number,
  width:Number,
  height:Number,
  color:String
});

const Gekkon = mongoose.model("gekkon",gekkonSchema);

module.exports = Gekkon;
