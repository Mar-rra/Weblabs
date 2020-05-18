const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const gazelSchema = new Schema({
  value:Number,
  width:Number,
  height:Number,
  color:String
});

const Gazel = mongoose.model("gazel",gazelSchema);

module.exports = Gazel;
