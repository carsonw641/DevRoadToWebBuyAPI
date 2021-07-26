import mongoose from "mongoose";
const { Schema, model } = mongoose;

const Score = new Schema({
  id: Schema.Types.ObjectId,
  days: Number,
  userName: String,
  date: Date
});

const ScoreModel = model("Score", Score);

export default ScoreModel;
