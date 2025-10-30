import { Game, GeneralInfo } from "../../tournament-data-types";
import areGamesValid from "../utils/areGamesValid";
import { Version0 } from "./Version0";

const isValidVersion0 = (data: any): data is Version0 => {
	const infoExists = "info" in data;
	const playerNamesExists = "playerNames" in data;
	const seatingTemplateExists = "seatingTemplate" in data;
	const gamesExists = "games" in data;

	if (!infoExists || !playerNamesExists || !seatingTemplateExists || !gamesExists) {
		return false;
	}

	const infoValid = infoExists &&
		"title" in data.info && typeof data.info.title === "string" &&
		"rounds" in data.info && typeof data.info.rounds === "number";
	const playerNamesValid = playerNamesExists &&
		Array.isArray(data.playerNames) &&
		!data.playerNames.some((name: string): boolean => typeof name !== "string");
	const seatingTemplateValid = seatingTemplateExists &&
		Array.isArray(data.seatingTemplate) &&
		data.seatingTemplate.every((table: number[]): boolean =>
			Array.isArray(table) &&
			table.every((playerId: number): boolean => Number.isInteger(playerId) && playerId >= 0)
		);

	const gamesValid = gamesExists && areGamesValid(data.games) &&
		data.games.length >= data.info.rounds * (data.playerNames.length / 4);

	return infoValid && playerNamesValid && seatingTemplateValid && gamesValid;
};

export default isValidVersion0;