import type { Tournament, Game } from "../data-types/tournament-data-types";
import { generateArray } from "./generateArray";

export const getLastFinishedRound = (tournament: Tournament): number => {
	const getGamesOfRound = (roundId: number) => tournament.games.filter((game: Game) => game.round === roundId);
	const isRoundUnfinished = (roundId: number) => getGamesOfRound(roundId).some((game: Game): boolean => !game.finished);

	const rounds = generateArray(tournament.info.rounds);
	const firstUnfinishedRound = rounds.findIndex((roundId: number): boolean => isRoundUnfinished(roundId));

	if (firstUnfinishedRound === 0)
	{
		return 0;
	}

	return (firstUnfinishedRound === -1 ? tournament.info.rounds : firstUnfinishedRound) - 1;    
};