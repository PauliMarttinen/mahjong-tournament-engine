import { GeneralInfo, Player } from "./tournament-data-types";

export enum SeatingTemplateTypes {
	Recommended,
	Custom,
	Randomized
};

export type SeatingTemplateHistoryItem = {
	template: number[][],
	type: SeatingTemplateTypes
};

export type DuplicatePlayerSeating = {
	roundId: number,
	playerId: number,
};

export type MissingPlayer = {
	playerId: number,
	roundId: number,
};

export type PlayerIdOutsideRange = {
	roundId: number,
	tableId: number,
	playerId: number
};

export type SeatingTemplateErrors = {
	duplicates: DuplicatePlayerSeating[],
	missing: MissingPlayer[],
	outsideRange: PlayerIdOutsideRange[],
};

export type NewTournament = {
	info: GeneralInfo,
	playerList: Player[],
	seatingTemplateHistory: SeatingTemplateHistoryItem[],
	currentSeatingTemplateIndex: number,
	seatingTemplateErrors: SeatingTemplateErrors
};