import Round from "./Round/";
import { Game } from "../../../data-types/tournament-data-types";
import { generateArray } from "../../../utils/generateArray";
import useTournament from "../../../utils/hooks/useTournament";

const PrintFullSchedule = () => {
	const tournament = useTournament();

	const rounds = generateArray(tournament.info.rounds);
	const tables = generateArray(tournament.playerNames.length/4);

	return (
		<>
			{
				rounds.map((roundId: number) => (
					<Round
						key={`round-tr-${roundId}`}
						roundId={roundId}
						games={tournament.games.filter((game: Game) => game.round === roundId)}
						playerNames={tournament.playerNames}
					/>
				))
			}
		</>
	);
};

export default PrintFullSchedule;