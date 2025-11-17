import type { Game, Seat, Standing, Player } from "../../data-types/tournament-data-types";
import { generateArray } from "../generateArray";
import useTournament from "./useTournament";

const useStandings = (): Standing[][] => {
	const tournament = useTournament();
	return generateArray(tournament.info.rounds).reduce((carry: Standing[][], roundIndex: number) => {
		const byThisRound = tournament.playerList.map((_: Player, playerId: number): Standing => ({
			rank: 0,
			playerId: playerId,
			points: tournament.games.reduce((subTotal: number, game: Game) => {
				const playerSeat = game.participants.find((seat: Seat): boolean => seat.playerId === playerId);

				if (game.finished && playerSeat && game.round <= roundIndex)
				{
					return subTotal + playerSeat.score.raw + playerSeat.score.uma + playerSeat.score.penalty;
				}
				return subTotal;
			}, 0),
			change: 0
		}))
			.sort((a: Standing, b: Standing): number => {
				//Move substitute players to the bottom of the standings
				const aIsSubstitute = tournament.playerList[a.playerId].substitute;
				const bIsSubstitute = tournament.playerList[b.playerId].substitute;

				if (aIsSubstitute && !bIsSubstitute) return 1;
				if (!aIsSubstitute && bIsSubstitute) return -1;

				//Then sort by points

				return (a.points < b.points) ? 1 : -1;
			})
			.map((standing: Standing, standingIndex: number) => ({
				...standing,
				rank: standingIndex + 1,
				change: ((): number => {
					if (roundIndex === 0) return 0;

					const previousPlacement = carry[roundIndex - 1].findIndex((previousStanding: Standing) => previousStanding.playerId === standing.playerId);

					return previousPlacement - standingIndex;
				})()
			}));

		return [...carry, byThisRound];
	}, []);
};

export default useStandings;