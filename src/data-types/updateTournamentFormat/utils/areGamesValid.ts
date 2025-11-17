import type { Game } from "../../tournament-data-types";

const gamesValid = (games: Game[]): boolean => {
	return Array.isArray(games) &&
		games.every((game: Game): boolean =>
			"round" in game && Number.isInteger(game.round) && game.round >= 0 &&
			"table" in game && Number.isInteger(game.table) && game.table >= 0 &&
			"finished" in game && typeof game.finished === "boolean" &&
			"participants" in game && Array.isArray(game.participants) && game.participants.length === 4 &&
			game.participants.every((seat) =>
				"playerId" in seat && Number.isInteger(seat.playerId) && seat.playerId >= 0 &&
				"score" in seat && 
				"raw" in seat.score && typeof seat.score.raw === "number" &&
				"uma" in seat.score && typeof seat.score.uma === "number" &&
				"penalty" in seat.score && typeof seat.score.penalty === "number"
			)
		);
};

export default gamesValid;