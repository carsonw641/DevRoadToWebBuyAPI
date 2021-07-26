import mongoose from "mongoose";
const { Schema, model } = mongoose;

const Tool = new Schema({
  id: Schema.Types.ObjectId,
  name: String,
  description: String,
  strengthMod: Number,
  wisdomMod: Number,
  healthMod: Number,
  luckMod: Number
});

const ToolModel = model("Tool", Tool);

export default ToolModel;
