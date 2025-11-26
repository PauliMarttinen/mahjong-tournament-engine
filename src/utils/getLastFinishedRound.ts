import type { Tournament, Game } from "../data-types/tournament-data-types";
import { generateArray } from "./generateArray";

export const getLastFinishedRound = (tournament: Tournament): number => {
	const getGamesOfRound = (roundId: number) => tournament.games.filter((game: Game) => game.round === roundId);
	const isRoundFinished = (roundId: number) => getGamesOfRound(roundId).every((game: Game): boolean => game.finished);

	const roundStatuses = generateArray(tournament.info.rounds).map((roundId: number) => isRoundFinished(roundId));
	const firstUnfinishedRound = roundStatuses.findIndex((isFinished: boolean) => !isFinished);

	if (firstUnfinishedRound === -1) return roundStatuses.length-1;

	return firstUnfinishedRound - 1;
};