import { type Score } from "../../../../../data-types/tournament-data-types";
import { Seats } from "../../../../../data-types/app-data-types";

export const isModified = (original: [Score, Score, Score, Score], compare: [Score, Score, Score, Score]): boolean => {
	return (
		(
			//Allow saving when everything is zero - it might be a completely tied game
			original[Seats.East].raw === 0 || original[Seats.East].uma === 0 ||
			original[Seats.South].raw === 0 || original[Seats.South].uma === 0 ||
			original[Seats.West].raw === 0 || original[Seats.West].uma === 0 ||
			original[Seats.North].raw === 0 || original[Seats.North].uma === 0
		)
		||
		(
			original[Seats.East].raw !== compare[Seats.East].raw ||
			original[Seats.East].uma !== compare[Seats.East].uma ||
			original[Seats.East].penalty !== compare[Seats.East].penalty ||
			original[Seats.South].raw !== compare[Seats.South].raw ||
			original[Seats.South].uma !== compare[Seats.South].uma ||
			original[Seats.South].penalty !== compare[Seats.South].penalty ||
			original[Seats.West].raw !== compare[Seats.West].raw ||
			original[Seats.West].uma !== compare[Seats.West].uma ||
			original[Seats.West].penalty !== compare[Seats.West].penalty ||
			original[Seats.North].raw !== compare[Seats.North].raw ||
			original[Seats.North].uma !== compare[Seats.North].uma ||
			original[Seats.North].penalty !== compare[Seats.North].penalty
		)
	);
};