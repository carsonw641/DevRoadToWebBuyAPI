import { Event } from "../interfaces/event";
import { Party } from "../interfaces/party";
import { Character } from "../interfaces/character";

import RandomNumberGenerator from "../utils/rng";

class EncounterCompiler {

  private random: RandomNumberGenerator;

  constructor(
    private log: string[],
    private events: Event[]
  ) {
    this.random = new RandomNumberGenerator();
  }

  public async compileEvent(score: number, activeParty: Party) {
    let isSuccess: boolean = true;
    const activeEvent: Event = this.events[this.random.getRandomNumber(0, this.events.length)];

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
        this.log.push(`${member.name}'s ${member.tool?.name} saved the day!`)
        isSuccess = true;
        break;
      }
    }

    // rng party member select //
    const index: number = this.random.getRandomNumber(0, activeParty.selectedCharacters.length);

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
    } else {
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
      const deadCharacter: Character = activeParty.selectedCharacters.splice(index, 1)[0];
      this.removeDeadCharacterStats(activeParty, deadCharacter);
      this.log.push(`${deadCharacter.name} was killed... Long live ${deadCharacter.wuTangName}`);
    }

    // if party is alive add score //
    if (activeParty.selectedCharacters.length > 0) {
      return true;
    } else {
      this.log.push(...[
        "Your road has come to it dev-inite conclusion. GAME-OVER!",
        `You mangaged to survive ${score} days...`
      ]);
    }
    return false;
  }

  private removeDeadCharacterStats(party: Party, deadCharacter: Character): void  {
    party.partyLuck -= deadCharacter.luck - ( deadCharacter.tool?.luckMod ?? 0 );
    party.partyStrength -= deadCharacter.strength - ( deadCharacter.tool?.strengthMod ?? 0 );
    party.partyWisdom -= deadCharacter.wisdom - ( deadCharacter.tool?.wisdomMod ?? 0 );
  }
}

export default EncounterCompiler;
