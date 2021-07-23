import mongoose from "mongoose";

const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const Tool = new Schema({
  name: String,
  description: String,
  strengthMod: Integer,
  wisdomMod: Integer,
  healthMod: Integer,
  luckMod: Integer
});

const ToolModel = mongoose.model("Tool", Tool);

export default ToolModel;
