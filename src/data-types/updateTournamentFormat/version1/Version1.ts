import { Game, GeneralInfo, Meta, Player } from "../../tournament-data-types";

export type Version1 = {
	info: GeneralInfo,
	playerList: Player[],
	games: Game[],
	meta: Meta
};