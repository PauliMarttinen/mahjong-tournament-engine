import type { Game } from "../../tournament-data-types";

export type GeneralInfoBeforeVersion2 = {
	title: string;
	rounds: number;
};

export type Version0 = {
	info: GeneralInfoBeforeVersion2,
	playerNames: string[],
	seatingTemplate: number[][],
	games: Game[]
};