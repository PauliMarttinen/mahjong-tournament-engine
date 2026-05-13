import type { Game, GeneralInfo, Meta, Player } from "../../tournament-data-types";

export type Version2 = {
	info: GeneralInfo,
	playerList: Player[],
	games: Game[],
	meta: Meta
};