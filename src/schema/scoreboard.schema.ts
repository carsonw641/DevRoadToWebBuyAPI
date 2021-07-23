import mongoose from "mongoose";

const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const Score = new Schema({
  name: ObjectId,
  wuTangName: String,
  strength: Integer,
  luck: Integer,
  Wisdom: Integer,
  health: Integer,
  bonusName: String,
  bonusType: String,
  bonusValue: Integer
});

const CharacterModel = mongoose.model("Score", Character);

export default CharacterModel;
