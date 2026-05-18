import { type Game, type Score } from "../../../../../data-types/tournament-data-types";

const getOriginalScore = (game: Game): [Score, Score, Score, Score] => {
	return [
		{
			raw: game.participants[0].score.raw,
			uma: game.participants[0].score.uma,
			penalty: game.participants[0].score.penalty
		},
		{
			raw: game.participants[1].score.raw,
			uma: game.participants[1].score.uma,
			penalty: game.participants[1].score.penalty
		},
		{
			raw: game.participants[2].score.raw,
			uma: game.participants[2].score.uma,
			penalty: game.participants[2].score.penalty
		},
		{
			raw: game.participants[3].score.raw,
			uma: game.participants[3].score.uma,
			penalty: game.participants[3].score.penalty
		}
	];
};

export default getOriginalScore;