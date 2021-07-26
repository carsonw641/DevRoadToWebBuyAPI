import { Tool } from "./tool";

export interface Character {
  id: string;
  name: string;
  wuTangName: string;
  strength: number;
  luck: number;
  wisdom: number;
  health: number;
  bonusName: string;
  bonusType: string;
  bonusValue: number;
  tool?: Tool;
}
