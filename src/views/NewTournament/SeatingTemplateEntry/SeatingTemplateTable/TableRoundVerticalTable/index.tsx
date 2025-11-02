import { generateArray } from "../../../../../utils/generateArray";
import useTournament from "../../../../../utils/hooks/useTournament";
import styles from "../SeatingTemplateTable.module.css";

type SeatingTemplateTableProps = {
	seatingTemplate: number[][],
	preview: boolean

};

const TableRoundVerticalTable = (props: SeatingTemplateTableProps) => {
	const tournament = useTournament();
	
	return (
		<table className={styles.SeatingTemplateTable}>
			<thead>
				<tr>
					<th>Table \ Round</th>
					{generateArray(tournament.info.rounds).map((roundId: number) => (
						<th key={`th-${roundId}`}>Round {roundId + 1}</th>
					))}
				</tr>
			</thead>
			<tbody>
				{generateArray(tournament.playerList.length/4).map((tableId: number) => (
					<>
						<tr key={`tr-table-${tableId}-e`}>
							<td rowSpan={4}>Table {tableId + 1}</td>
							{generateArray(tournament.info.rounds).map((roundId: number) => (
								<td key={`td-${tableId}-e-td-${roundId}`}>
									{props.seatingTemplate[tableId*4][roundId]}
								</td>
							))}
						</tr>
						<tr key={`tr-table-${tableId}-s`}>
							{generateArray(tournament.info.rounds).map((roundId: number) => (
								<td key={`td-${tableId}-s-td-${roundId}`}>
									{props.seatingTemplate[tableId*4+1][roundId]}
								</td>
							))}
						</tr>
						<tr key={`tr-table-${tableId}-w`}>
							{generateArray(tournament.info.rounds).map((roundId: number) => (
								<td key={`td-${tableId}-w-td-${roundId}`}>
									{props.seatingTemplate[tableId*4+2][roundId]}
								</td>
							))}
						</tr>
						<tr key={`tr-table-${tableId}-n`}>
							{generateArray(tournament.info.rounds).map((roundId: number) => (
								<td key={`td-${tableId}-n-td-${roundId}`}>
									{props.seatingTemplate[tableId*4+3][roundId]}
								</td>
							))}
						</tr>
					</>
				))}
			</tbody>
		</table>
	);
};

export default TableRoundVerticalTable;