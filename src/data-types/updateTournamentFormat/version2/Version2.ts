import { type Game, type Meta, type Player, type Round } from "../../tournament-data-types";

export type GeneralInfoBeforeVersion3 = {
	title: string,
	roundLength: number,
	rounds: Round[]
};

export type Version2 = {
	info: GeneralInfoBeforeVersion3,
	playerList: Player[],
	games: Game[],
	meta: Meta
};