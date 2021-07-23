import { Event } from "../interfaces/event";
import { Party } from "../interfaces/party";
import RandomNumberGenerator from "../utils/rng";
import EventHandler from "../handler/event.handler";
import ToolHandler from "../handler/tool.handler";
import { Tool } from "../interfaces/tool";

const random: RandomNumberGenerator = new RandomNumberGenerator();

export class encounterCompiler {
  public async compileEvent(score: number, activeParty: Party, log: string[]) {
    const eventId = random.getRandomNumber(0, 19);
    let isSuccess = true;
    // rng event picker //
    const activeEvent: Event = await new EventHandler().get({ id: eventId });

    log.push("event: " + activeEvent.initDescription);

    // calculate isSuccess//
    if (activeEvent.healthReq > activeParty.partyHealth) {
      isSuccess = false;
    }
    if (activeEvent.wisdomReq > activeParty.partyWisdom) {
      isSuccess = false;
    }
    if (activeEvent.strengthReq > activeParty.partyStrength) {
      isSuccess = false;
    }
    if (activeEvent.luckReq > activeParty.partyLuck) {
      isSuccess = false;
    }

    for (let i = 0; i < activeParty.party.length; i++) {
      if (activeParty.party[i].toolName === activeEvent.keyItemName) {
        log.push(
          activeParty.party[i].name +
            "'s " +
            activeParty.party[i].toolName +
            " saved the day!"
        );
        isSuccess = true;
      }
    }

    // rng party member select //
    const charId = random.getRandomNumber(0, activeParty.party.length);

    // edit party info //
    if (isSuccess) {
      log.push(
        activeEvent.successDescription +
          " " +
          activeEvent.successValue +
          " " +
          activeEvent.successType
      );
      switch (activeEvent.successType) {
        case "health":
          activeParty.party[charId].health =
            activeParty.party[charId].health + activeEvent.successValue;
          break;
        case "wisdom":
          activeParty.party[charId].wisdom =
            activeParty.party[charId].wisdom + activeEvent.successValue;
          break;
        case "strength":
          activeParty.party[charId].strength =
            activeParty.party[charId].strength + activeEvent.successValue;
          break;
        case "luck":
          activeParty.party[charId].luck =
            activeParty.party[charId].luck + activeEvent.successValue;
          break;
      }
    } else {
      log.push(
        activeEvent.failDescription +
          " " +
          activeEvent.failValue +
          " " +
          activeEvent.failType
      );
      switch (activeEvent.successType) {
        case "health":
          activeParty.party[charId].health =
            activeParty.party[charId].health + activeEvent.failValue;
          break;
        case "wisdom":
          activeParty.party[charId].wisdom =
            activeParty.party[charId].wisdom + activeEvent.failValue;
          break;
        case "strength":
          activeParty.party[charId].strength =
            activeParty.party[charId].strength + activeEvent.failValue;
          break;
        case "luck":
          activeParty.party[charId].luck =
            activeParty.party[charId].luck + activeEvent.failValue;
          break;
      }
    }

    // if dead make dead //
    if (activeParty.party[charId].health < 1) {
      activeParty.party.splice(charId, 1);
    }

    activeParty.partyHealth = 0;
    activeParty.partyWisdom = 0;
    activeParty.partyStrength = 0;
    activeParty.partyLuck = 0;
    for (let i = 0; i < activeParty.party.length; i++) {
      const tool: Tool = await new ToolHandler().get({
        name: activeParty.party[i].toolName
      });
      activeParty.partyHealth =
        activeParty.partyHealth + activeParty.party[i].health + tool.healthMod;
      activeParty.partyWisdom =
        activeParty.partyWisdom + activeParty.party[i].wisdom + tool.wisdomMod;
      activeParty.partyStrength =
        activeParty.partyStrength +
        activeParty.party[i].strength +
        tool.strengthMod;
      activeParty.partyLuck =
        activeParty.partyLuck + activeParty.party[i].luck + tool.luckMod;
    }

    // if party is alive add score //
    if (activeParty.party.length > 0) {
      score++;
      return true;
    } else {
      log.push("Your road has come to it dev-inite conclusion GAME-OVER!!");
      log.push("you mangaged to survive: " + score + " days...");
    }
    return false;
  }
}
