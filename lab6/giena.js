const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const gienaSchema = new Schema({
  value:Number,
  width:Number,
  height:Number,
  color:String
});

const Giena = mongoose.model("giena",gienaSchema);

module.exports = Giena;
