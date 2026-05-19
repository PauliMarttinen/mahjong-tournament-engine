import { type Game, type Meta, type Player } from "../../tournament-data-types";
import { type GeneralInfoBeforeVersion2 } from "../version0/Version0";

export type Version1 = {
	info: GeneralInfoBeforeVersion2,
	playerList: Player[],
	games: Game[],
	meta: Meta
};