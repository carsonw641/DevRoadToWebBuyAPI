import { Character } from "../interfaces/character";
import { PartySelection } from "../interfaces/character-selection-input";
import { Tool } from "../interfaces/tool";
import { Party } from "../interfaces/party";
import { Event } from "../interfaces/event";
import { Score } from "../interfaces/score";

import CharacterHandler from "../handler/character.handler";
import ToolHandler from "../handler/tool.handler";
import EventHandler from "../handler/event.handler";
import EncounterCompiler from "./encounter-compiler";

import { EventEmitter } from "events";
import ScoreHandler from "../handler/score.handler";

import * as dayjs from "dayjs";

class DoorKicker {

    private daysSurvived: number = 0;
    private eventLog: string[] = [];
    private party: Party = {
        partyHealth: 0,
        partyLuck: 0,
        partyStrength: 0,
        partyWisdom: 0,
        selectedCharacters: [],
        leader: null
    };;
    private initialized$: EventEmitter = new EventEmitter();

    constructor(
        private userName: string,
        private partySelection: PartySelection,
    ) {
        this.normalizeTeamSelection();
    }

    public get initialized(): EventEmitter {
        return this.initialized$;
    }

    public async survive(): Promise<{ score: number, log: string[] }> {
        const scoreHander: ScoreHandler = new ScoreHandler();

        // Validate user hasn't already played today
        const existingEntry: Score = await scoreHander.get({
            userName: this.userName,
            // @ts-ignore
            date: { $gte: dayjs().startOf('day').toString() }
        });

        if (existingEntry) {
            return {
                score: 0,
                log: ["Cheaters never prosper"]
            }
        }

        // Get all events available for game loop
        const events: Event[] = await new EventHandler().get({});
        const encounterCompiler: EncounterCompiler = new EncounterCompiler(this.eventLog, events);
        
        // Game loop
        while (encounterCompiler.compileEvent(this.daysSurvived, this.party)) {
            this.daysSurvived++;            
        }

        // Record score for the provided user
       await scoreHander.create({
            days: this.daysSurvived,
            userName: this.userName ,
            // @ts-ignore
            date: dayjs().format("YYYY-MM-DD HH:mm:ss")
        });

        return { score: this.daysSurvived, log: this.eventLog };
    }

    private async normalizeTeamSelection(): Promise<void>  {
        // Get list of playable characters and items from the database
        const characterList: Character[] = await new CharacterHandler().get({});
        const toolList: Tool[] = await new ToolHandler().get({});

        // Iterate through selected members and items (if applicable) and find the matching db entry
        for (const teamMember of this.partySelection.characterSelections) {
            const selectedCharacter: Character | undefined = characterList.find((character: Character) => teamMember.characterName === character.name);

            if (selectedCharacter !== undefined) {
                const selectedTool: Tool | undefined = toolList.find((tool: Tool) => teamMember.toolId === tool.id);

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
    }

    private addStats(character: Character): void {
        this.party.partyHealth += character.health + ( character.tool?.healthMod ?? 0);
        this.party.partyLuck += character.luck + ( character.tool?.luckMod ?? 0 );
        this.party.partyStrength += character.strength + ( character.tool?.strengthMod ?? 0 );
        this.party.partyWisdom += character.wisdom + ( character.tool?.wisdomMod ?? 0 );
    }
}

export default DoorKicker;