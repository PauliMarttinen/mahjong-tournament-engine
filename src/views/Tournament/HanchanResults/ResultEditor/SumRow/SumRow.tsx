import { Input } from "antd";
import { formatPoints } from "../../../../../utils/formatPoints";
import { Score } from "../../../../../data-types/tournament-data-types";
import styles from "./SumRow.module.css";

type SumRowProps = {
	score: [Score, Score, Score, Score],
	safeMode: boolean
};

const SumRow = (props: SumRowProps) => {
	const raw =
		props.score[0].raw +
		props.score[1].raw +
		props.score[2].raw +
		props.score[3].raw;

	const uma =
		props.score[0].uma +
		props.score[1].uma +
		props.score[2].uma +
		props.score[3].uma;

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