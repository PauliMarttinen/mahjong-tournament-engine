import Round from "./Round/";
import { type Round as RoundType, type Game } from "../../../data-types/tournament-data-types";
import { useTournament } from "../../../utils/hooks/useTournament";

const PrintFullSchedule = () => {
	const tournament = useTournament();

	return (
		<>
			{
				tournament.info.rounds.map((round: RoundType, roundId: number) => (
					<Round
						key={`round-tr-${roundId}`}
						roundId={roundId}
						round={round}
						games={tournament.games.filter((game: Game) => game.round === roundId)}
						playerList={tournament.playerList}
					/>
				))
			}
		</>
	);
};

export default PrintFullSchedule;