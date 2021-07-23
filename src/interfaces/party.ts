import { Character } from "./character";

export interface Party {
  partyId: number;
  party: Character[];
  partyStrength: number;
  partyWisdom: number;
  partyHealth: number;
  partyLuck: number;
}
