import { generateArray } from "../../../../../utils/generateArray";
import useTournament from "../../../../../utils/hooks/useTournament";
import styles from "../SeatingTemplateTable.module.css";

type SeatingTemplateTableProps = {
	seatingTemplate: number[][],
	preview: boolean
};

const RoundTableHorizontalTable = (props: SeatingTemplateTableProps) => {
	const tournament = useTournament();
	
	return (
		<table className={styles.SeatingTemplateTable}>
			<thead>
				<tr>
					<th>Round \ Table</th>
					{generateArray(tournament.playerList.length/4).map((roundId: number) => (
						<th key={`th-${roundId}`} colSpan={4}>Table {roundId + 1}</th>
					))}
				</tr>
			</thead>
			<tbody>
				{generateArray(tournament.info.rounds).map((roundId: number) => (
					<tr key={`tr-table-${roundId}-e`}>
						<td>Round {roundId + 1}</td>
						{generateArray(tournament.playerList.length/4).map((tableId: number) => (
							<>
								<td key={`td-${tableId}-e-td-${roundId}`}>
									{props.seatingTemplate[tableId*4][roundId]}
								</td>
								<td key={`td-${tableId}-s-td-${roundId}`}>
									{props.seatingTemplate[tableId*4+1][roundId]}
								</td>
								<td key={`td-${tableId}-w-td-${roundId}`}>
									{props.seatingTemplate[tableId*4+2][roundId]}
								</td>
								<td key={`td-${tableId}-n-td-${roundId}`}>
									{props.seatingTemplate[tableId*4+3][roundId]}
								</td>
							</>
						))}
					</tr>					
				))}
			</tbody>
		</table>
	);
};

export default RoundTableHorizontalTable;