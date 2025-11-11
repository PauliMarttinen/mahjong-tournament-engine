import { useState } from "react";
import { generateArray } from "../../../../../utils/generateArray";
import useNewTournament from "../../../../../utils/hooks/useNewTournament";
import styles from "../SeatingTemplateTable.module.css";

type SeatingTemplateTableProps = {
	preview: boolean,
};

const RoundTableVerticalTable = (props: SeatingTemplateTableProps) => {
	const newTournament = useNewTournament();
	const {seatingTemplateErrors} = newTournament;
	const seatingTemplate = newTournament.seatingTemplateHistory[newTournament.currentSeatingTemplateIndex].template;
	
	const [highlightedRow, setHighlightedRow] = useState<number | null>(null);
	const [highlightedColumn, setHighlightedColumn] = useState<number | null>(null);
	const [highlightedPlayerId, setHighlightedPlayerId] = useState<number | null>(null);

	const setHighlights = (rowNumber: number | null, columnNumber: number | null, playerId: number | null) => {
		setHighlightedRow(rowNumber);
		setHighlightedColumn(columnNumber);
		setHighlightedPlayerId(playerId);
	};

	const getClassNames = (rowId: number, columnId: number, playerId: number) => {
		const isDuplicate = seatingTemplateErrors.duplicates.some((duplicate) => duplicate.roundId === Math.floor(rowId) && duplicate.playerId === playerId);
		if (isDuplicate)
			return styles.duplicate;

		const isOutsideRange = playerId < 0 || playerId >= newTournament.playerList.length;
		const playerLight = highlightedPlayerId === playerId;
		const throughLight = highlightedRow === rowId || highlightedColumn === columnId;
		
		return `${isOutsideRange ? styles.outsideRange : ""} ${playerLight ? styles.playerlight : ""} ${throughLight ? styles.throughlight : ""}`.trim();
	}

	return (
		<table className={styles.SeatingTemplateTable}>
			<thead>
				<tr>
					<th>Round \ Table</th>
					{generateArray(newTournament.playerList.length/4).map((tableId: number) => (
						<th key={`th-${tableId}`}>Table {tableId + 1}</th>
					))}
				</tr>
			</thead>
			<tbody>
				{generateArray(newTournament.info.rounds).map((roundId: number) => (
					<>
						<tr key={`tr-table-${roundId}-e`}>
							<td rowSpan={4}>Round {roundId + 1}</td>
							{generateArray(newTournament.playerList.length/4).map((tableId: number) => (
								<td
									onMouseOver={() => setHighlights(roundId, tableId, seatingTemplate[tableId*4][roundId])}
									onMouseOut={() => setHighlights(null, null, null)}
									className={getClassNames(roundId, tableId, seatingTemplate[tableId*4][roundId])}
								 	key={`td-${roundId}-e-td-${tableId}`}>
									{seatingTemplate[tableId*4][roundId]}
								</td>
							))}
						</tr>
						<tr key={`tr-table-${roundId}-s`}>
							{generateArray(newTournament.playerList.length/4).map((tableId: number) => (
								<td
									onMouseOver={() => setHighlights(roundId+0.1, tableId, seatingTemplate[tableId*4+1][roundId])}
									onMouseOut={() => setHighlights(null, null, null)}
									className={getClassNames(roundId+0.1, tableId, seatingTemplate[tableId*4+1][roundId])}
									key={`td-${roundId}-s-td-${tableId}`}>
									{seatingTemplate[tableId*4+1][roundId]}
								</td>
							))}
						</tr>
						<tr key={`tr-table-${roundId}-w`}>
							{generateArray(newTournament.playerList.length/4).map((tableId: number) => (
								<td
									onMouseOver={() => setHighlights(roundId+0.2, tableId, seatingTemplate[tableId*4+2][roundId])}
									onMouseOut={() => setHighlights(null, null, null)}
									className={getClassNames(roundId+0.2, tableId, seatingTemplate[tableId*4+2][roundId])}
									key={`td-${roundId}-w-td-${tableId}`}>
									{seatingTemplate[tableId*4+2][roundId]}
								</td>
							))}
						</tr>
						<tr key={`tr-table-${roundId}-n`}>
							{generateArray(newTournament.playerList.length/4).map((tableId: number) => (
								<td
									onMouseOver={() => setHighlights(roundId+0.3, tableId, seatingTemplate[tableId*4+3][roundId])}
									onMouseOut={() => setHighlights(null, null, null)}
									className={getClassNames(roundId+0.3, tableId, seatingTemplate[tableId*4+3][roundId])}
								 	key={`td-${roundId}-n-td-${tableId}`}>
									{seatingTemplate[tableId*4+3][roundId]}
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