import mongoose from "mongoose";

const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const Character = new Schema({
  name: ObjectId,
  wuTangName: String,
  strength: Integer,
  luck: Integer,
  wisdom: Integer,
  health: Integer,
  bonusName: String,
  bonusType: String,
  bonusValue: Integer
});

const CharacterModel = mongoose.model("Character", Character);

export default CharacterModel;
