import type { Tournament } from "../../tournament-data-types";
import areGamesValid from "../utils/areGamesValid";

const isValidVersion1 = (data: any): data is Tournament => {
	const infoExists = "info" in data;
	const playerListExists = "playerList" in data;
	const gamesExists = "games" in data;
	const metaExists = "meta" in data;

	if (!infoExists || !playerListExists || !gamesExists || !metaExists) {
		return false;
	}

	const infoValid = infoExists &&
		"title" in data.info && typeof data.info.title === "string" &&
		"rounds" in data.info && Number.isInteger(data.info.rounds) && data.info.rounds > 0;
	const playerListValid = playerListExists &&
		Array.isArray(data.playerList) &&
		data.playerList.every((player: any): boolean =>
			"name" in player && typeof player.name === "string" &&
			"substitute" in player && typeof player.substitute === "boolean"
		);
	const gamesValid = gamesExists && areGamesValid(data.games) &&
		data.games.length >= data.info.rounds * (data.playerList.length / 4);
	const metaValid = metaExists &&
		"dataFormatVersion" in data.meta && Number.isInteger(data.meta.dataFormatVersion) && data.meta.dataFormatVersion === 1;

	return infoValid && playerListValid && /* seatingTemplateValid && */ gamesValid && metaValid;
};

export default isValidVersion1;