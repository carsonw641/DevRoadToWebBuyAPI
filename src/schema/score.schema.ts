import mongoose from "mongoose";

const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const Score = new Schema({
  id: ObjectId,
  days: Integer,
  userName: String,
  date: Date
});

const ScoreModel = mongoose.model("Score", Score);

export default ScoreModel;
