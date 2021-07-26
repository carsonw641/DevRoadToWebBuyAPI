"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
const character_handler_1 = __importDefault(require("./handler/character.handler"));
const score_handler_1 = __importDefault(require("./handler/score.handler"));
const tool_handler_1 = __importDefault(require("./handler/tool.handler"));
const door_kicker_1 = __importDefault(require("./services/door-kicker"));
const dayjs = __importStar(require("dayjs"));
const express_1 = __importDefault(require("express"));
const app = express_1.default();
app.use(express_1.default.json());
const port = 3000;
// endpoints
app.get("/", (req, res) => {
    res.send("hello world");
});
app.get("/tools", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const tools = yield new tool_handler_1.default().get({});
    return {
        succuess: true,
        code: 200,
        message: "Success",
        tools
    };
}));
app.get("/characters", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const characters = yield new character_handler_1.default().get({});
    return {
        success: true,
        code: 200,
        message: "Success",
        characters
    };
}));
app.get("/dailyScoreBoard", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const scores = yield new score_handler_1.default().get({
        // @ts-ignore
        date: { $gte: dayjs().startOf('day').toString() }
    });
    return {
        success: true,
        code: 200,
        message: "Success",
        scores
    };
}));
app.get("/globalScoreBoard", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const scores = yield new score_handler_1.default().getTopTenScores();
    return {
        success: true,
        code: 200,
        message: "Success",
        scores
    };
}));
app.post("/battle", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(req.body); // { Test: "Test" }
    const doorKicker = new door_kicker_1.default(req.body.userName, req.body.partySelection);
    yield new Promise((resolve, reject) => {
        doorKicker.initialized.on("ready", () => resolve());
    });
    const { score, log } = yield doorKicker.survive();
    res.json({
        code: 200,
        message: "Success",
        success: true,
        score,
        log
    });
}));
app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});
