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
const character_handler_1 = __importDefault(require("../handler/character.handler"));
const tool_handler_1 = __importDefault(require("../handler/tool.handler"));
const event_handler_1 = __importDefault(require("../handler/event.handler"));
const encounter_compiler_1 = __importDefault(require("./encounter-compiler"));
const events_1 = require("events");
const score_handler_1 = __importDefault(require("../handler/score.handler"));
const dayjs = __importStar(require("dayjs"));
class DoorKicker {
    constructor(userName, partySelection) {
        this.userName = userName;
        this.partySelection = partySelection;
        this.daysSurvived = 0;
        this.eventLog = [];
        this.party = {
            partyHealth: 0,
            partyLuck: 0,
            partyStrength: 0,
            partyWisdom: 0,
            selectedCharacters: [],
            leader: null
        };
        this.initialized$ = new events_1.EventEmitter();
        this.normalizeTeamSelection();
    }
    ;
    get initialized() {
        return this.initialized$;
    }
    survive() {
        return __awaiter(this, void 0, void 0, function* () {
            const scoreHander = new score_handler_1.default();
            // Validate user hasn't already played today
            const existingEntry = yield scoreHander.get({
                userName: this.userName,
                // @ts-ignore
                date: { $gte: dayjs().startOf('day').toString() }
            });
            if (existingEntry) {
                return {
                    score: 0,
                    log: ["Cheaters never prosper"]
                };
            }
            // Get all events available for game loop
            const events = yield new event_handler_1.default().get({});
            const encounterCompiler = new encounter_compiler_1.default(this.eventLog, events);
            // Game loop
            while (encounterCompiler.compileEvent(this.daysSurvived, this.party)) {
                this.daysSurvived++;
            }
            // Record score for the provided user
            yield scoreHander.create({
                days: this.daysSurvived,
                userName: this.userName,
                // @ts-ignore
                date: dayjs().format("YYYY-MM-DD HH:mm:ss")
            });
            return { score: this.daysSurvived, log: this.eventLog };
        });
    }
    normalizeTeamSelection() {
        return __awaiter(this, void 0, void 0, function* () {
            // Get list of playable characters and items from the database
            const characterList = yield new character_handler_1.default().get({});
            const toolList = yield new tool_handler_1.default().get({});
            // Iterate through selected members and items (if applicable) and find the matching db entry
            for (const teamMember of this.partySelection.characterSelections) {
                const selectedCharacter = characterList.find((character) => teamMember.characterName === character.name);
                if (selectedCharacter !== undefined) {
                    const selectedTool = toolList.find((tool) => teamMember.toolId === tool.id);
                    if (selectedTool !== undefined) {
                        selectedCharacter.tool = selectedTool;
                    }
                    this.party.selectedCharacters.push(selectedCharacter);
                    this.addStats(selectedCharacter);
                    if (this.partySelection.leaderName === teamMember.characterName) {
                        this.party.leader = selectedCharacter;
                    }
                }
            }
            // Notify listeners that game loop is ready
            this.initialized$.emit("ready");
            this.initialized$.removeAllListeners();
        });
    }
    addStats(character) {
        var _a, _b, _c, _d, _e, _f, _g, _h;
        this.party.partyHealth += character.health + ((_b = (_a = character.tool) === null || _a === void 0 ? void 0 : _a.healthMod) !== null && _b !== void 0 ? _b : 0);
        this.party.partyLuck += character.luck + ((_d = (_c = character.tool) === null || _c === void 0 ? void 0 : _c.luckMod) !== null && _d !== void 0 ? _d : 0);
        this.party.partyStrength += character.strength + ((_f = (_e = character.tool) === null || _e === void 0 ? void 0 : _e.strengthMod) !== null && _f !== void 0 ? _f : 0);
        this.party.partyWisdom += character.wisdom + ((_h = (_g = character.tool) === null || _g === void 0 ? void 0 : _g.wisdomMod) !== null && _h !== void 0 ? _h : 0);
    }
}
exports.default = DoorKicker;
