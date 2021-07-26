"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const { Schema, model } = mongoose_1.default;
const Tool = new Schema({
    id: Schema.Types.ObjectId,
    name: String,
    description: String,
    strengthMod: Number,
    wisdomMod: Number,
    healthMod: Number,
    luckMod: Number
});
const ToolModel = model("Tool", Tool);
exports.default = ToolModel;
