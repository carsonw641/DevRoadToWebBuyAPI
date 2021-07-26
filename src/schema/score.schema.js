"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const { Schema, model } = mongoose_1.default;
const Score = new Schema({
    id: Schema.Types.ObjectId,
    days: Number,
    userName: String,
    date: Date
});
const ScoreModel = model("Score", Score);
exports.default = ScoreModel;
