import type { Tournament } from "../../tournament-data-types";
import areGamesValid from "../utils/areGamesValid";

const isValidVersion3 = (data: any): data is Tournament => {
	const infoExists = "info" in data;
	const playerListExists = "playerList" in data;
	const gamesExists = "games" in data;
	const metaExists = "meta" in data;

	if (!infoExists || !playerListExists || !gamesExists || !metaExists) {
		return false;
	}

	const infoValid = infoExists &&
		"title" in data.info && typeof data.info.title === "string" &&
		"roundLength" in data.info && typeof data.info.roundLength === "number" &&
		"rounds" in data.info && Array.isArray(data.info.rounds) && data.info.rounds.length > 0 &&
		"uma" in data.info;
	const playerListValid = playerListExists &&
		Array.isArray(data.playerList) &&
		data.playerList.every((player: any): boolean =>
			"name" in player && typeof player.name === "string" &&
			"substitute" in player && typeof player.substitute === "boolean"
		);
	const gamesValid = gamesExists && areGamesValid(data.games) &&
		data.games.length >= data.info.rounds.length * (data.playerList.length / 4);
	const metaValid = metaExists &&
		"dataFormatVersion" in data.meta && Number.isInteger(data.meta.dataFormatVersion) && data.meta.dataFormatVersion === 3;

	return infoValid && playerListValid && gamesValid && metaValid;
};

export default isValidVersion3;