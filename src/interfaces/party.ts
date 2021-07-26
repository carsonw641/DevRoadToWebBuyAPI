import { Character } from "./character";

export interface Party {
  leader: Character | null;
  selectedCharacters: Character[];
  partyStrength: number;
  partyWisdom: number;
  partyHealth: number;
  partyLuck: number;
}
