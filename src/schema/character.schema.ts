import mongoose from "mongoose";
const { Schema, model } = mongoose;

const Character = new Schema({
  id: Schema.Types.ObjectId,
  name: String,
  wuTangName: String,
  strength: Number,
  luck: Number,
  wisdom: Number,
  health: Number,
  bonusName: String,
  bonusType: String,
  bonusValue: Number
});

const CharacterModel = model("Character", Character);

export default CharacterModel;
