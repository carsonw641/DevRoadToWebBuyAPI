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
const rng_1 = __importDefault(require("../utils/rng"));
class EncounterCompiler {
    constructor(log, events) {
        this.log = log;
        this.events = events;
        this.random = new rng_1.default();
    }
    compileEvent(score, activeParty) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            let isSuccess = true;
            const activeEvent = this.events[this.random.getRandomNumber(0, this.events.length)];
            this.log.push("Event: " + activeEvent.initDescription);
            // calculate isSuccess//
            if (activeEvent.healthReq > activeParty.partyHealth
                || activeEvent.wisdomReq > activeParty.partyWisdom
                || activeEvent.strengthReq > activeParty.partyStrength
                || activeEvent.luckReq > activeParty.partyLuck) {
                isSuccess = false;
            }
            for (const member of activeParty.selectedCharacters) {
                if (member.tool && member.tool.name === activeEvent.keyItemName) {
                    this.log.push(`${member.name}'s ${(_a = member.tool) === null || _a === void 0 ? void 0 : _a.name} saved the day!`);
                    isSuccess = true;
                    break;
                }
            }
            // rng party member select //
            const index = this.random.getRandomNumber(0, activeParty.selectedCharacters.length);
            // edit party info //
            if (isSuccess) {
                this.log.push([
                    activeEvent.successDescription,
                    activeEvent.successValue,
                    activeEvent.successType
                ].join(" "));
                switch (activeEvent.successType) {
                    case "health":
                        activeParty.selectedCharacters[index].health += activeEvent.successValue;
                        activeParty.partyHealth += activeEvent.successValue;
                        break;
                    case "wisdom":
                        activeParty.selectedCharacters[index].wisdom += activeEvent.successValue;
                        activeParty.partyWisdom += activeEvent.successValue;
                        break;
                    case "strength":
                        activeParty.selectedCharacters[index].strength += activeEvent.successValue;
                        activeParty.partyStrength += activeEvent.successValue;
                        break;
                    case "luck":
                        activeParty.selectedCharacters[index].luck += activeEvent.successValue;
                        activeParty.partyLuck += activeEvent.successValue;
                        break;
                    default:
                        break;
                }
            }
            else {
                this.log.push([
                    activeEvent.failDescription,
                    activeEvent.failValue,
                    activeEvent.failType
                ].join(" "));
                switch (activeEvent.failType) {
                    case "health":
                        activeParty.selectedCharacters[index].health -= activeEvent.failValue;
                        activeParty.partyHealth -= activeEvent.failValue;
                        break;
                    case "wisdom":
                        activeParty.selectedCharacters[index].wisdom -= activeEvent.failValue;
                        activeParty.partyWisdom -= activeEvent.failValue;
                        break;
                    case "strength":
                        activeParty.selectedCharacters[index].strength -= activeEvent.failValue;
                        activeParty.partyStrength -= activeEvent.failValue;
                        break;
                    case "luck":
                        activeParty.selectedCharacters[index].luck -= activeEvent.failValue;
                        activeParty.partyLuck -= activeEvent.failValue;
                        break;
                    default:
                        break;
                }
            }
            // if dead make dead //
            if (activeParty.selectedCharacters[index].health < 1) {
                const deadCharacter = activeParty.selectedCharacters.splice(index, 1)[0];
                this.removeDeadCharacterStats(activeParty, deadCharacter);
                this.log.push(`${deadCharacter.name} was killed... Long live ${deadCharacter.wuTangName}`);
            }
            // if party is alive add score //
            if (activeParty.selectedCharacters.length > 0) {
                return true;
            }
            else {
                this.log.push(...[
                    "Your road has come to it dev-inite conclusion. GAME-OVER!",
                    `You mangaged to survive ${score} days...`
                ]);
            }
            return false;
        });
    }
    removeDeadCharacterStats(party, deadCharacter) {
        var _a, _b, _c, _d, _e, _f;
        party.partyLuck -= deadCharacter.luck - ((_b = (_a = deadCharacter.tool) === null || _a === void 0 ? void 0 : _a.luckMod) !== null && _b !== void 0 ? _b : 0);
        party.partyStrength -= deadCharacter.strength - ((_d = (_c = deadCharacter.tool) === null || _c === void 0 ? void 0 : _c.strengthMod) !== null && _d !== void 0 ? _d : 0);
        party.partyWisdom -= deadCharacter.wisdom - ((_f = (_e = deadCharacter.tool) === null || _e === void 0 ? void 0 : _e.wisdomMod) !== null && _f !== void 0 ? _f : 0);
    }
}
exports.default = EncounterCompiler;
