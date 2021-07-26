"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const score_schema_1 = __importDefault(require("../schema/score.schema"));
const handler_1 = __importDefault(require("./handler"));
class ScoreHandler extends handler_1.default {
    constructor() {
        super();
    }
    create(data) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
                try {
                    const results = yield score_schema_1.default.create(data);
                    resolve(results);
                }
                catch (e) {
                    reject(e);
                }
            }));
        });
    }
    update(data) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
                try {
                    const results = yield score_schema_1.default.updateOne(data);
                    resolve(results);
                }
                catch (e) {
                    reject(e);
                }
            }));
        });
    }
    get(data) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
                try {
                    const results = yield score_schema_1.default.find(data);
                    resolve(results);
                }
                catch (e) {
                    reject(e);
                }
            }));
        });
    }
    delete(data) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
                try {
                    const results = yield score_schema_1.default.deleteOne(data);
                    resolve(results);
                }
                catch (e) {
                    reject(e);
                }
            }));
        });
    }
    getTopTenScores() {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
                try {
                    const results = yield score_schema_1.default.find().sore({ days: -1 }).limit(10);
                    resolve(results);
                }
                catch (e) {
                    reject(e);
                }
            }));
        });
    }
}
exports.default = ScoreHandler;
