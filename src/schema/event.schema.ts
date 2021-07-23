import mongoose from "mongoose";

const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const Event = new Schema({
  id: Integer,
  name: String,
  initDescription: String,
  successDescription: String,
  failDescription: String,
  strengthReq: Integer,
  wisdomReq: Integer,
  healthReq: Integer,
  luckReq: Integer,
  successType: String,
  successValue: Integer,
  failType: Integer,
  failValue: Integer,
  keyItemName: String
});

const EventModel = mongoose.model("Event", Event);

export default EventModel;
