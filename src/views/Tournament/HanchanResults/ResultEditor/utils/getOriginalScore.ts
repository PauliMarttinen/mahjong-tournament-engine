import { type Game, type Score } from "../../../../../data-types/tournament-data-types";
import { Seats } from "../../../../../data-types/app-data-types";

export const getOriginalScore = (game: Game): [Score, Score, Score, Score] => {
	return [
		{
			raw: game.participants[Seats.East].score.raw,
			uma: game.participants[Seats.East].score.uma,
			penalty: game.participants[Seats.East].score.penalty
		},
		{
			raw: game.participants[Seats.South].score.raw,
			uma: game.participants[Seats.South].score.uma,
			penalty: game.participants[Seats.South].score.penalty
		},
		{
			raw: game.participants[Seats.West].score.raw,
			uma: game.participants[Seats.West].score.uma,
			penalty: game.participants[Seats.West].score.penalty
		},
		{
			raw: game.participants[Seats.North].score.raw,
			uma: game.participants[Seats.North].score.uma,
			penalty: game.participants[Seats.North].score.penalty
		}
	];
};