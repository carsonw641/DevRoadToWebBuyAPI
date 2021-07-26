import mongoose from "mongoose";
const { Schema, model } = mongoose;

const Event = new Schema({
  id: Schema.Types.ObjectId,
  name: String,
  initDescription: String,
  successDescription: String,
  failDescription: String,
  strengthReq: Number,
  wisdomReq: Number,
  healthReq: Number,
  luckReq: Number,
  successType: String,
  successValue: Number,
  failType: Number,
  failValue: Number,
  keyItemName: String
});

const EventModel = model("Event", Event);

export default EventModel;
