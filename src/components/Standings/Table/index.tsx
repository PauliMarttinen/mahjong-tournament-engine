import { generateArray } from "../../../utils/generateArray";
import styles from "./Table.module.css";
import Column from "./Column";
import useTournament from "../../../utils/hooks/useTournament";

type StandingsProps = {
	className?: string,
	singleColumn?: boolean,
	afterRound: number
};

const Table = (props: StandingsProps) => {
	const tournament = useTournament();
	const playerCount = tournament.playerList.length;

	const columnSplitLimit = 24;
	const playersPerColumn = props.singleColumn ? playerCount : 16;
	const columns =
		playerCount >= columnSplitLimit
		?
		Math.ceil(playerCount/playersPerColumn)
		:
		1;

	return (
		<div className={styles.standings}>
			{
				generateArray(columns).map((columnIndex: number) => (
					<Column
						key={`standings-column-${columnIndex}`}
						afterRound={props.afterRound}
						columnIndex={columnIndex}
						playersPerColumn={playersPerColumn}
					/>	
				))
			}
		</div>
	);
};

export default Table;