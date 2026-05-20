import { Input } from "antd";
import { formatPoints } from "../../../../../utils/formatPoints";
import { type Score } from "../../../../../data-types/tournament-data-types";
import styles from "./SumRow.module.css";
import { Seats } from "../../../../../data-types/app-data-types";

type SumRowProps = {
	score: [Score, Score, Score, Score],
	safeMode: boolean
};

const SumRow = (props: SumRowProps) => {
	const raw =
		props.score[Seats.East].raw +
		props.score[Seats.South].raw +
		props.score[Seats.West].raw +
		props.score[Seats.North].raw;

	const uma =
		props.score[Seats.East].uma +
		props.score[Seats.South].uma +
		props.score[Seats.West].uma +
		props.score[Seats.North].uma;

	return (
		<tr>
			<td>{null}</td>
			<td>{null}</td>
			<td>
				<Input
					className={`${styles.pointInput} ${raw !== 0 ? styles.wrong : ""}`}
					value={props.safeMode ? formatPoints({points: raw, sign: true}) : raw}
					disabled={true}
				/>
			</td>
			<td>
				<Input
					className={`${styles.pointInput} ${uma !== 0 ? styles.wrong : ""}`}
					value={props.safeMode ? formatPoints({points: uma, sign: true}) : uma}
					disabled={true}
				/>
			</td>
			<td>{null}</td>
			<td>{null}</td>
		</tr>
	);
};

export default SumRow;