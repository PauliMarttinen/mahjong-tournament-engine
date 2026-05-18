import { type Score } from "../../../../../data-types/tournament-data-types";

const isModified = (original: [Score, Score, Score, Score], compare: [Score, Score, Score, Score]): boolean => {
	return (
		(
			//Allow saving when everything is zero - it might be a completely tied game
			original[0].raw === 0 || original[0].uma === 0 ||
			original[1].raw === 0 || original[1].uma === 0 ||
			original[2].raw === 0 || original[2].uma === 0 ||
			original[3].raw === 0 || original[3].uma === 0
		)
		||
		(
			original[0].raw !== compare[0].raw ||
			original[0].uma !== compare[0].uma ||
			original[0].penalty !== compare[0].penalty ||
			original[1].raw !== compare[1].raw ||
			original[1].uma !== compare[1].uma ||
			original[1].penalty !== compare[1].penalty ||
			original[2].raw !== compare[2].raw ||
			original[2].uma !== compare[2].uma ||
			original[2].penalty !== compare[2].penalty ||
			original[3].raw !== compare[3].raw ||
			original[3].uma !== compare[3].uma ||
			original[3].penalty !== compare[3].penalty
		)
	);
};

export default isModified