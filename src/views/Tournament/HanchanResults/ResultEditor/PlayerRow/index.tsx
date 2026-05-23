import { Seats } from "../../../../../data-types/app-data-types";
import PointInput from "../../../../../components/PointInput";
import { type Player, type Score } from "../../../../../data-types/tournament-data-types";
import { type PointInputType } from "../../../../../components/PointInput";
import { formatPoints } from "../../../../../utils/formatPoints";
import { getNumericValue } from "../../../../../utils/getNumericValue";
import { isPositive } from "../utils/isPositive";
import styles from "./PlayerRow.module.css";

type PlayerRowProps = {
	seat: Seats,
	player: Player,
	safeMode: boolean,
	automaticUma: boolean,
	score: Score,
	onChange: (newValue: Score) => void
};

const PlayerRow = (props: PlayerRowProps) => {
	const seats = ["East", "South", "West", "North"];

	const raw = {
		positive: isPositive(props.score.raw),
		value: Math.abs(props.score.raw)
	};
	const uma = {
		positive: isPositive(props.score.uma),
		value: Math.abs(props.score.uma)
	};
	const penalty = {
		positive: false,
		value: Math.abs(props.score.penalty)
	};

	const final = props.score.raw + props.score.uma + props.score.penalty;

	const update = (field: "raw"|"uma"|"penalty", newValue: PointInputType) => {
		props.onChange({
			...props.score,
			[field]: getNumericValue(newValue)
		});
	};

	return (
		<tr>
			<td>{seats[props.seat]}</td>
			<td className={styles.name}>{props.player.name}</td>
			<td>
				<PointInput
					className={styles.pointInput}
					value={raw}
					onChange={(newValue: PointInputType) => update("raw", newValue)}
					tabIndex={1}
					short={props.safeMode}
				/>
			</td>
			<td>
				<PointInput
					className={styles.pointInput}
					value={uma}
					onChange={(newValue: PointInputType) => update("uma", newValue)}
					tabIndex={5}
					short={props.safeMode}
					disabled={props.automaticUma}
					uma
				/>
			</td>
			<td>
				<PointInput
					className={styles.pointInput}
					value={penalty}
					onChange={(newValue: PointInputType) => update("penalty", newValue)}
					tabIndex={9}
					short={props.safeMode}
					forceSigned={"negative"}
				/>
			</td>
			<td className={styles.final}>{props.safeMode ? formatPoints({points: final, sign: true}) : final}</td>
			<td>{props.player.substitute && "(Substitute)"}</td>
		</tr>
	);
};

export default PlayerRow;