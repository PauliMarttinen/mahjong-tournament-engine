import { useState } from "react";
import { generateArray } from "../../../../../utils/generateArray";
import useTournament from "../../../../../utils/hooks/useTournament";
import styles from "../SeatingTemplateTable.module.css";

type SeatingTemplateTableProps = {
	seatingTemplate: number[][],
	preview: boolean

};

const RoundTableVerticalTable = (props: SeatingTemplateTableProps) => {
	const tournament = useTournament();
	
	const [highlightedRow, setHighlightedRow] = useState<number | null>(null);
	const [highlightedColumn, setHighlightedColumn] = useState<number | null>(null);
	const [highlightedPlayerId, setHighlightedPlayerId] = useState<number | null>(null);

	const setHighlights = (rowNumber: number | null, columnNumber: number | null, playerId: number | null) => {
		setHighlightedRow(rowNumber);
		setHighlightedColumn(columnNumber);
		setHighlightedPlayerId(playerId);
	};

	const getClassNames = (rowId: number, columnId: number, playerId: number) => {
		if (highlightedPlayerId === playerId)
			return styles.playerlight;
		if (highlightedRow === rowId || highlightedColumn === columnId)
			return styles.throughlight;
		return "";
	}

	return (
		<table className={styles.SeatingTemplateTable}>
			<thead>
				<tr>
					<th>Round \ Table</th>
					{generateArray(tournament.playerList.length/4).map((tableId: number) => (
						<th key={`th-${tableId}`}>Table {tableId + 1}</th>
					))}
				</tr>
			</thead>
			<tbody>
				{generateArray(tournament.info.rounds).map((roundId: number) => (
					<>
						<tr key={`tr-table-${roundId}-e`}>
							<td rowSpan={4}>Round {roundId + 1}</td>
							{generateArray(tournament.playerList.length/4).map((tableId: number) => (
								<td
									onMouseOver={() => setHighlights(roundId, tableId, props.seatingTemplate[tableId*4][roundId])}
									onMouseOut={() => setHighlights(null, null, null)}
									className={getClassNames(roundId, tableId, props.seatingTemplate[tableId*4][roundId])}
								 	key={`td-${roundId}-e-td-${tableId}`}>
									{props.seatingTemplate[tableId*4][roundId]}
								</td>
							))}
						</tr>
						<tr key={`tr-table-${roundId}-s`}>
							{generateArray(tournament.playerList.length/4).map((tableId: number) => (
								<td
									onMouseOver={() => setHighlights(roundId+0.1, tableId, props.seatingTemplate[tableId*4+1][roundId])}
									onMouseOut={() => setHighlights(null, null, null)}
									className={getClassNames(roundId+0.1, tableId, props.seatingTemplate[tableId*4+1][roundId])}
									key={`td-${roundId}-s-td-${tableId}`}>
									{props.seatingTemplate[tableId*4+1][roundId]}
								</td>
							))}
						</tr>
						<tr key={`tr-table-${roundId}-w`}>
							{generateArray(tournament.playerList.length/4).map((tableId: number) => (
								<td
									onMouseOver={() => setHighlights(roundId+0.2, tableId, props.seatingTemplate[tableId*4+2][roundId])}
									onMouseOut={() => setHighlights(null, null, null)}
									className={getClassNames(roundId+0.2, tableId, props.seatingTemplate[tableId*4+2][roundId])}
									key={`td-${roundId}-w-td-${tableId}`}>
									{props.seatingTemplate[tableId*4+2][roundId]}
								</td>
							))}
						</tr>
						<tr key={`tr-table-${roundId}-n`}>
							{generateArray(tournament.playerList.length/4).map((tableId: number) => (
								<td
									onMouseOver={() => setHighlights(roundId+0.3, tableId, props.seatingTemplate[tableId*4+3][roundId])}
									onMouseOut={() => setHighlights(null, null, null)}
									className={getClassNames(roundId+0.3, tableId, props.seatingTemplate[tableId*4+3][roundId])}
								 	key={`td-${roundId}-n-td-${tableId}`}>
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

export default RoundTableVerticalTable;