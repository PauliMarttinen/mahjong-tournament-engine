import { type Game, type GeneralInfo, type Meta, type Player } from "../../tournament-data-types";

export type Version3 = {
	info: GeneralInfo,
	playerList: Player[],
	games: Game[],
	meta: Meta
};