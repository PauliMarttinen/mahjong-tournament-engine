import type { Standing } from "../../../../../data-types/tournament-data-types";
import { formatPoints } from "../../../../../utils/formatPoints";
import useTournament from "../../../../../utils/hooks/useTournament";
import Comparison from "./Comparison";
import styles from "./Row.module.css";

type RowProps = {
	standing: Standing
};

const Row = (props: RowProps) => {
	const tournament = useTournament();
	const rank = tournament.playerList[props.standing.playerId].substitute ? "—" : props.standing.rank;
	const playerName = tournament.playerList[props.standing.playerId].name;
	const points = formatPoints({points: props.standing.points, sign: true});

	return (
		<tr key={`player-standing-${props.standing.playerId}`}>
			<td className={styles.cell}>{rank}.</td>
			<td className={styles.cell}>{playerName}</td>
			<td className={styles.cell}>{points}</td>
			{
				props.standing.change !== 0
				?
				<Comparison change={props.standing.change}/>
				:
				<td>{null}</td>
			}
		</tr>
	);
};

export default Row;