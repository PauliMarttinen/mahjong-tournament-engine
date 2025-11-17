import { useState } from "react";
import { generateArray } from "../../../../../utils/generateArray";
import useNewTournament from "../../../../../utils/hooks/useNewTournament";
import styles from "../SeatingTemplateTable.module.css";
import type { ChangeEvent } from "react";
import { newTournamentActionCreators } from "../../../../../state";
import { bindActionCreators } from "redux";
import { useDispatch } from "react-redux";

type SeatingTemplateTableProps = {
	preview: boolean,
};

const TableRoundVerticalTable = (props: SeatingTemplateTableProps) => {
	const newTournament = useNewTournament();
	const {seatingTemplateErrors} = newTournament;
	const seatingTemplate = newTournament.seatingTemplateHistory[newTournament.currentSeatingTemplateIndex].template;
	
	const dispatch = useDispatch();
	const {editTemplateField} = bindActionCreators(newTournamentActionCreators, dispatch);

	const [highlightedRow, setHighlightedRow] = useState<number | null>(null);
	const [highlightedColumn, setHighlightedColumn] = useState<number | null>(null);
	const [highlightedPlayerId, setHighlightedPlayerId] = useState<number | null>(null);

	const setHighlights = (rowNumber: number | null, columnNumber: number | null, playerId: number | null) => {
		setHighlightedRow(rowNumber);
		setHighlightedColumn(columnNumber);
		setHighlightedPlayerId(playerId);
	};

	const [editingRoundId, setEditingRoundId] = useState<number>(-1);
	const [editingTableId, setEditingTableId] = useState<number>(-1);
	const [editingSeatId, setEditingSeatId] = useState<number>(-1);
	const [editValue, setEditValue] = useState<number>(-1);

	const startEditing = (roundId: number, tableId: number, seatId: number, value: number) => {
		setEditingRoundId(roundId);
		setEditingTableId(tableId);
		setEditingSeatId(seatId);
		setEditValue(value);
	};

	const isEditingThis = (roundId: number, tableId: number, seatId: number) => {
		return editingRoundId === roundId && editingTableId === tableId && editingSeatId === seatId;
	};

	const endEditing = () => {
		editTemplateField(editingTableId, editingRoundId, editingSeatId, editValue);

		setEditingRoundId(-1);
		setEditingTableId(-1);
		setEditingSeatId(-1);
		setEditValue(-1);
	};

	const changeEditValue = (newValue: string) => {
		if (isNaN(+newValue)) return;
		setEditValue(+newValue);
	};

	const getClassNames = (rowId: number, columnId: number, playerId: number, seat: "east"|"south"|"west"|"north") => {
		const isDuplicate = seatingTemplateErrors.duplicates.some((duplicate) => duplicate.roundId === columnId && duplicate.playerId === playerId);
		if (isDuplicate)
			return `${styles[seat]} ${styles.duplicate}`;

		const isOutsideRange = playerId < 0 || playerId >= newTournament.playerList.length;
		const playerLight = highlightedPlayerId === playerId;
		const throughLight = highlightedRow === rowId || highlightedColumn === columnId;
		
		return `${styles[seat]} ${isOutsideRange ? styles.outsideRange : ""} ${playerLight ? styles.playerlight : ""} ${throughLight ? styles.throughlight : ""}`.trim();
	};

	return (
		<table className={styles.SeatingTemplateTable}>
			<thead>
				<tr>
					<th>Table \ Round</th>
					{generateArray(newTournament.info.rounds).map((roundId: number) => (
						<th key={`th-${roundId}`}>Round {roundId + 1}</th>
					))}
				</tr>
			</thead>
			<tbody>
				{generateArray(newTournament.playerList.length/4).map((tableId: number) => (
					<>
						<tr key={`tr-table-${tableId}-e`}>
							<td rowSpan={4}>Table {tableId + 1}</td>
							{generateArray(newTournament.info.rounds).map((roundId: number) => (
								<td
									onMouseOver={() => setHighlights(tableId, roundId, seatingTemplate[tableId*4][roundId])}
									onMouseOut={() => setHighlights(null, null, null)}
									className={getClassNames(tableId, roundId, seatingTemplate[tableId*4][roundId], "east")}
								 	key={`td-${tableId}-e-td-${roundId}`}>
									<input
										type={"text"}
										value={isEditingThis(roundId, tableId, 0) ? ""+editValue : ""+seatingTemplate[tableId*4][roundId]}
										onFocus={() => startEditing(roundId, tableId, 0, seatingTemplate[tableId*4][roundId])}
										onChange={(e) => changeEditValue(e.target.value)}
										onBlur={endEditing}
									/>
								</td>
							))}
						</tr>
						<tr key={`tr-table-${tableId}-s`}>
							{generateArray(newTournament.info.rounds).map((roundId: number) => (
								<td
									onMouseOver={() => setHighlights(tableId+0.1, roundId, seatingTemplate[tableId*4+1][roundId])}
									onMouseOut={() => setHighlights(null, null, null)}
									className={getClassNames(tableId+0.1, roundId, seatingTemplate[tableId*4+1][roundId], "south")}
								 	key={`td-${tableId}-s-td-${roundId}`}>
									<input
										type={"text"}
										value={isEditingThis(roundId, tableId, 1) ? ""+editValue : ""+seatingTemplate[tableId*4+1][roundId]}
										onFocus={() => startEditing(roundId, tableId, 1, seatingTemplate[tableId*4+1][roundId])}
										onChange={(e: ChangeEvent<HTMLInputElement>) => changeEditValue(e.target.value)}
										onBlur={endEditing}
									/>
								</td>
							))}
						</tr>
						<tr key={`tr-table-${tableId}-w`}>
							{generateArray(newTournament.info.rounds).map((roundId: number) => (
								<td
									onMouseOver={() => setHighlights(tableId+0.2, roundId, seatingTemplate[tableId*4+2][roundId])}
									onMouseOut={() => setHighlights(null, null, null)}
									className={getClassNames(tableId+0.2, roundId, seatingTemplate[tableId*4+2][roundId], "west")}
								 	key={`td-${tableId}-w-td-${roundId}`}>
									<input
										type={"text"}
										value={isEditingThis(roundId, tableId, 2) ? ""+editValue : ""+seatingTemplate[tableId*4+2][roundId]}
										onFocus={() => startEditing(roundId, tableId, 2, seatingTemplate[tableId*4+2][roundId])}
										onChange={(e: ChangeEvent<HTMLInputElement>) => changeEditValue(e.target.value)}
										onBlur={endEditing}
									/>
								</td>
							))}
						</tr>
						<tr key={`tr-table-${tableId}-n`}>
							{generateArray(newTournament.info.rounds).map((roundId: number) => (
								<td
									onMouseOver={() => setHighlights(tableId+0.3, roundId, seatingTemplate[tableId*4+3][roundId])}
									onMouseOut={() => setHighlights(null, null, null)}
									className={getClassNames(tableId+0.3, roundId, seatingTemplate[tableId*4+3][roundId], "north")}
								 	key={`td-${tableId}-n-td-${roundId}`}>
									<input
										type={"text"}
										value={isEditingThis(roundId, tableId, 3) ? ""+editValue : ""+seatingTemplate[tableId*4+3][roundId]}
										onFocus={() => startEditing(roundId, tableId, 3, seatingTemplate[tableId*4+3][roundId])}
										onChange={(e: ChangeEvent<HTMLInputElement>) => changeEditValue(e.target.value)}
										onBlur={endEditing}
									/>
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