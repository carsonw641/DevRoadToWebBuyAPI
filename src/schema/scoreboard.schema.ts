import mongoose from "mongoose";
const { Schema, model } = mongoose;

const Score = new Schema({
  id: Schema.Types.ObjectId,
  name: String,
  wuTangName: String,
  strength: Number,
  luck: Number,
  Wisdom: Number,
  health: Number,
  bonusName: String,
  bonusType: String,
  bonusValue: Number
});

const CharacterModel = model("Score", Score);

export default CharacterModel;
