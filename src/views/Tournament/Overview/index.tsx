import { useState } from "react";
import { Game } from "../../../data-types/tournament-data-types";
import TextInput from "../../../components/TextInput";
import EditResult from "./EditResult";
import Hanchan from "../../../components/Hanchan";
import { generateArray } from "../../../utils/generateArray";
import styles from "./Overview.module.css";
import Toggle from "../../../components/Toggle";
import useTournament from "../../../utils/hooks/useTournament";

type ResultsCoordinate = {
	round: number,
	table: number
};

const notEditingResults: ResultsCoordinate = {
	round: -1,
	table: -1
};

const Overview = () => {
	const [editingResults, setEditingResults] = useState<ResultsCoordinate>(notEditingResults);
	const [hilight, setHilight] = useState<string>("");
	const [resultsEnterMode, setResultsEnterMode] = useState<boolean>(true);

	const tournament = useTournament();

	const rounds = generateArray(tournament.info.rounds);
	const tables = generateArray(tournament.playerList.length/4);

	return (
		<div>
			<div className={styles.toolbar}>
				<TextInput
					label={"Hilight"}
					value={hilight}
					onChange={(newValue: string): void => setHilight(newValue)}
				/>
				<Toggle
					false={"Selection mode"}
					true={"Results enter mode"}
					value={resultsEnterMode}
					onSwitch={() => setResultsEnterMode(!resultsEnterMode)}
				/>
			</div>
			<div className={styles.seatingTable}>
				<table className={styles.table}>
					<tbody>
						<tr>
							<th className={styles.sticky}>{null}</th>
							{
								tables.map((tableId: number) => <th key={`table-th-${tableId}`}>{`Table ${tableId+1}`}</th>)
							}
						</tr>
						{
							rounds.map((roundId: number) => (
								<tr key={`round-tr-${roundId}`}>
									<th className={styles.sticky}>{`Round ${roundId+1}`}</th>
									{
										tables.map((tableId: number) => {
											const game = tournament.games.find((game: Game): boolean => game.round === roundId && game.table === tableId);

											return (
												game
												?
												<td key={`round-tr-${roundId}-table-td-${tableId}`}>
													<Hanchan
														east={tournament.playerList[game.participants[0].playerId].name}
														south={tournament.playerList[game.participants[1].playerId].name}
														west={tournament.playerList[game.participants[2].playerId].name}
														north={tournament.playerList[game.participants[3].playerId].name}
														finished={game.finished}
														hilight={hilight}
														onClick={() => setEditingResults({round: roundId, table: tableId})}
														clickable={resultsEnterMode}
													/>
												</td>
												:
												<td key={`round-tr-${roundId}-table-td-${tableId}`}>Game undefined</td>
											);
										})
									}
								</tr>
							))
						}
					</tbody>
				</table>
			</div>
			{
				editingResults.round !== -1 &&
				<EditResult
					round={editingResults.round}
					table={editingResults.table}
					onFinish={() => setEditingResults(notEditingResults)}
				/>
			}
		</div>
	);
};

export default Overview;