"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const db_1 = __importDefault(require("../utils/db"));
class Handler {
    constructor() {
        this.dbConnection = db_1.default.Instance;
    }
}
exports.default = Handler;
