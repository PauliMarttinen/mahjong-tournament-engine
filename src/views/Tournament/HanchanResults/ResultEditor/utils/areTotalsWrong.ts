import { type Score } from "../../../../../data-types/tournament-data-types";

const areTotalsWrong = (score: [Score, Score, Score, Score]): boolean => {
	const rawTotal = score[0].raw + score[1].raw + score[2].raw + score[3].raw;
	const umaTotal = score[0].uma + score[1].uma + score[2].uma + score[3].uma;

	return rawTotal !== 0 || umaTotal !== 0;
};

export default areTotalsWrong;