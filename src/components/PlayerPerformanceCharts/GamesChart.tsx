import {useMemo} from "react";
import useTournament from "../../utils/hooks/useTournament";
import { Game, Score, Seat } from "../../data-types/tournament-data-types";
import { formatPoints } from "../../utils/formatPoints";
import styles from "./PlayerPerformanceCharts.module.css";

type GamesChartProps = {
	playerId: number,
	anonymize: boolean
};

const GamesChart = (props: GamesChartProps) => {
	const tournament = useTournament();

	const games = useMemo(() => tournament.games
		//Find the games where the selected player was in.
		.filter((game: Game): boolean => game.participants.some((seat: Seat): boolean => seat.playerId === props.playerId))
		//Make sure they're sorted in round order
		.sort((a: Game, b: Game) => a.round - b.round), [props.playerId]);

	const getTotal = (score: Score): string => formatPoints({points: score.raw + score.uma + score.penalty, sign: true});

	//Function for anonymizing the other players.
	const getName = (params: {game: Game, seatNumber: number}) => {
		//If fetching name for the selected player's seat, return player's name.
		if (params.game.participants[params.seatNumber].playerId === props.playerId)
		{
			return <span>{tournament.playerList[props.playerId].name}</span>;
		}

		//If names need not be anonymized
		if (!props.anonymize)
		{
			return <span>{tournament.playerList[params.game.participants[params.seatNumber].playerId].name}</span>
		}

		//Otherwise return "shimocha", "toimen" or "kamicha" for the other seats appropriately.
		const playerSeat = params.game.participants.findIndex((seat: Seat): boolean => seat.playerId === props.playerId);

		if (params.seatNumber === (playerSeat + 1) % 4)
		{
			return <span className={styles.anonymized}>shimocha</span>;
		}

		if (params.seatNumber === (playerSeat + 2) % 4)
		{
			return <span className={styles.anonymized}>toimen</span>;
		}

		return <span className={styles.anonymized}>kamicha</span>;
	};

	return (
		<table className={styles.games}>
		{
			games.map((game: Game, round: number) => (
				<tbody key={`games-round-${round}`}>
					<tr>
						<th className={styles.roundHeader} colSpan={4}>Round {round + 1}</th>
					</tr>
					<tr>
						<td>East</td>
						<td>{getName({game, seatNumber: 0})}</td>
						<td>{getTotal(game.participants[0].score)}</td>
					</tr>
					<tr>
						<td>South</td>
						<td>{getName({game, seatNumber: 1})}</td>
						<td>{getTotal(game.participants[1].score)}</td>
					</tr>
					<tr>
						<td>West</td>
						<td>{getName({game, seatNumber: 2})}</td>
						<td>{getTotal(game.participants[2].score)}</td>
					</tr>
					<tr>
						<td>North</td>
						<td>{getName({game, seatNumber: 3})}</td>
						<td>{getTotal(game.participants[3].score)}</td>
					</tr>
				</tbody>
			))
		}
		</table>
	);
};

export default GamesChart;