"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const { Schema, model } = mongoose_1.default;
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
exports.default = EventModel;
