import { Standing } from "../../../../data-types/tournament-data-types";
import useStandings from "../../../../utils/hooks/useStandings";
import styles from "./Column.module.css";
import Row from "./Row/Row";

type ColumnProps = {
	columnIndex: number,
	playersPerColumn: number,
	afterRound: number
};

const Column = (props: ColumnProps) => {
	const rangeMin = props.columnIndex*props.playersPerColumn;
	const rangeMax = props.columnIndex*props.playersPerColumn+props.playersPerColumn;
	const standings = useStandings()[props.afterRound]
		.filter((_: Standing, standingIndex: number) => rangeMin <= standingIndex && standingIndex < rangeMax);

	return (
		<table
			className={styles.standingsTable}>
			<thead>
				<tr>
					<th>Pos.</th>
					<th>Player</th>
					<th>Total</th>
					<th>{null}</th>
				</tr>
				</thead>
			<tbody>
			{
				standings
					.map((standing: Standing, rank: number) => (
						<Row
							key={`standings-row-${rank}`}
							standing={standing}
						/>
				))
			}
			</tbody>
		</table>
	);
};

export default Column;