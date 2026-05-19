import { useState } from "react";
import { type Game, type Score } from "../../../../data-types/tournament-data-types";
import { useTournament } from "../../../../utils/hooks/useTournament";
import { useDispatch } from "react-redux";
import { tournamentActionCreators } from "../../../../state";
import { bindActionCreators } from "redux";
import styles from "./ResultEditor.module.css";
import { Space, Alert, Button } from "antd";
import SafeSwitch from "./SafeSwitch";
import UmaSwitch from "./UmaSwitch";
import PlayerRow from "./PlayerRow";
import SumRow from "./SumRow";
import { Seats } from "../../../../data-types/app-data-types";
import { getUma } from "./utils/getUma";
import { getOriginalScore } from "./utils/getOriginalScore";
import { isModified } from "./utils/isModified";
import { areTotalsWrong } from "./utils/areTotalsWrong";
import { disableSave } from "./utils/disableSave";

type ResultEditorProps = {
	tableId: number,
	roundId: number
};

const ResultEditor = (props: ResultEditorProps) => {
	const tournament = useTournament();
	const game = tournament.games.find((game: Game): boolean => game.round === props.roundId && game.table === props.tableId)!
	const originalScore = getOriginalScore(game);
	const modifiableScore = getOriginalScore(game);
	const [currentScore, setCurrentScore] = useState<[Score, Score, Score, Score]>(modifiableScore);
	const [safeMode, setSafeMode] = useState<boolean>(true);
	const [automaticUma, setAutomaticUma] = useState<boolean>(tournament.info.uma.automatic);

	const dispatch = useDispatch();
	const {addGames} = bindActionCreators(tournamentActionCreators, dispatch);

	const save = () => {
		const updatedGames = tournament.games.map((game: Game): Game => {
			if (game.table !== props.tableId || game.round !== props.roundId) return game;

			return {
				...game,
				finished: true,
				participants: [
					{
						playerId: game.participants[Seats.East].playerId,
						score: currentScore[Seats.East]
					},
					{
						playerId: game.participants[Seats.South].playerId,
						score: currentScore[Seats.South]
					},
					{
						playerId: game.participants[Seats.West].playerId,
						score: currentScore[Seats.West]
					},
					{
						playerId: game.participants[Seats.North].playerId,
						score: currentScore[Seats.North]
					}
				]
			};
		});

		addGames(updatedGames);
	};

	const revertChanges = () => {
		setCurrentScore(originalScore);
	};

	const updateScore = (seat: Seats, newValue: Score) => {
		const updatedScore: [Score, Score, Score, Score] = [...currentScore];
		updatedScore[seat] = newValue;

		if (automaticUma)
		{
			const [updatedEastUma, updatedSouthUma, updatedWestUma, updatedNorthUma] = getUma(
				tournament.info.uma,
				updatedScore
			);

			updatedScore[0].uma = updatedEastUma;
			updatedScore[1].uma = updatedSouthUma;
			updatedScore[2].uma = updatedWestUma;
			updatedScore[3].uma = updatedNorthUma;
		}

		setCurrentScore(updatedScore);
	};

	const totalsWrong = areTotalsWrong(currentScore);
	const modified = isModified(originalScore, currentScore);

	return (
		<div className={styles.resultEditor}>
			<Space direction={"vertical"}>
				<Space>
					<SafeSwitch
						safeMode={safeMode}
						tableId={props.tableId}
						onClick={setSafeMode}
					/>
					<UmaSwitch
						automaticUma={automaticUma}
						tournamentAutomaticUma={tournament.info.uma.automatic}
						tableId={props.tableId}
						onClick={setAutomaticUma}
					/>
				</Space>
				<table>
					<tbody>
						<tr>
							<th className={styles.windColumn}></th>
							<th className={styles.name}>Player</th>
							<th>Raw point</th>
							<th>Uma</th>
							<th>Penalty</th>
							<th className={styles.final}>Final</th>
							<th></th>
						</tr>
						<PlayerRow
							seat={Seats.East}
							player={tournament.playerList[game.participants[Seats.East].playerId]}
							safeMode={safeMode}
							automaticUma={automaticUma}
							score={currentScore[Seats.East]}
							onChange={(newValue: Score) => updateScore(Seats.East, newValue)}
						/>
						<PlayerRow
							seat={Seats.South}
							player={tournament.playerList[game.participants[Seats.South].playerId]}
							safeMode={safeMode}
							automaticUma={automaticUma}
							score={currentScore[Seats.South]}
							onChange={(newValue: Score) => updateScore(Seats.South, newValue)}
						/>
						<PlayerRow
							seat={Seats.West}
							player={tournament.playerList[game.participants[Seats.West].playerId]}
							safeMode={safeMode}
							automaticUma={automaticUma}
							score={currentScore[Seats.West]}
							onChange={(newValue: Score) => updateScore(Seats.West, newValue)}
						/>
						<PlayerRow
							seat={Seats.North}
							player={tournament.playerList[game.participants[Seats.North].playerId]}
							safeMode={safeMode}
							automaticUma={automaticUma}
							score={currentScore[Seats.North]}
							onChange={(newValue: Score) => updateScore(Seats.North, newValue)}
						/>
						<SumRow
							score={currentScore}
							safeMode={safeMode}
						/>
					</tbody>
				</table>
				<Alert
					type={safeMode ? "info" : "warning"}
					message={
						safeMode
						?
						"Enter points in short form, i.e. \"12.3\" instead of \"12300\"."
						:
						"Enter points in long form, i.e. \"12300\" instead of \"12.3\". Note that the sum is not checked in danger more."
					}
				/>
				<Space>
					<Button
						type={"primary"}
						onClick={save}
						disabled={disableSave(safeMode, totalsWrong, modified)}
						title={totalsWrong ? "Raw and uma points do not sum up to 0." : ""}>
						Save and mark finished
					</Button>
					<Button
						type={"default"}
						disabled={!modified}
						onClick={revertChanges}>
						Revert changes
					</Button>
				</Space>
			</Space>
		</div>
	);
};

export default ResultEditor;