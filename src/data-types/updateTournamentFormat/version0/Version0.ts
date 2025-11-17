import type { Game, GeneralInfo } from "../../tournament-data-types";

export type Version0 = {
	info: GeneralInfo,
	playerNames: string[],
	seatingTemplate: number[][],
	games: Game[]
};