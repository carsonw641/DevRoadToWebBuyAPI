interface CharacterSelection {
    characterName: string;
    toolId: string;
}

interface PartySelection {
    characterSelections: CharacterSelection[];
    leaderName: string;
}

export { CharacterSelection, PartySelection };