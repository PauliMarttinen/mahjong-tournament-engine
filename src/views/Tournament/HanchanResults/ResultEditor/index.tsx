import {useState} from "react";
import { useDispatch } from "react-redux";
import { bindActionCreators } from "redux";
import useTournament from "../../../../utils/hooks/useTournament";
import { getNumericValue } from "../../../../utils/getNumericValue";
import PointInput from "../../../../components/PointInput";
import type { Game, PointInputType } from "../../../../data-types/tournament-data-types";
import { Alert, Switch, Space, Button, Input } from "antd";
import { tournamentActionCreators } from "../../../../state";
import {formatPoints} from "../../../../utils/formatPoints";
import styles from "./ResultEditor.module.css";

type ResultEditorPros = {
	roundId: number,
	tableId: number
};

const ResultEditor = (props: ResultEditorPros) => {
	const tournament = useTournament();
	const game = tournament.games.find((game: Game): boolean => (game.round === props.roundId && game.table === props.tableId));
	const [safeMode, setSafeMode] = useState<boolean>(true);

	const dispatch = useDispatch();
	const {addGames} = bindActionCreators(tournamentActionCreators, dispatch)

	const eastRawOrig = {
		positive: game ? game.participants[0].score.raw >= 0 : true,
		value: Math.abs(game ? game.participants[0].score.raw : 0)
	};
	const eastUmaOrig = {
		positive: game ? game.participants[0].score.uma >= 0 : true,
		value: Math.abs(game ? game.participants[0].score.uma : 0)
	};
	const eastPenaltyOrig = {
		positive: false,
		value: Math.abs(game ? game.participants[0].score.penalty : 0)
	};

	const southRawOrig = {
		positive: game ? game.participants[1].score.raw >= 0 : true,
		value: Math.abs(game ? game.participants[1].score.raw : 0)
	};
	const southUmaOrig = {
		positive: game ? game.participants[1].score.uma >= 0 : true,
		value: Math.abs(game ? game.participants[1].score.uma : 0)
	};
	const southPenaltyOrig = {
		positive: false,
		value: Math.abs(game ? game.participants[1].score.penalty : 0)
	};

	const westRawOrig = {
		positive: game ? game.participants[2].score.raw >= 0 : true,
		value: Math.abs(game ? game.participants[2].score.raw : 0)
	};
	const westUmaOrig = {
		positive: game ? game.participants[2].score.uma >= 0 : true,
		value: Math.abs(game ? game.participants[2].score.uma : 0)
	};
	const westPenaltyOrig = {
		positive: false,
		value: Math.abs(game ? game.participants[2].score.penalty : 0)
	};

	const northRawOrig = {
		positive: game ? game.participants[3].score.raw >= 0 : true,
		value: Math.abs(game ? game.participants[3].score.raw : 0)
	};
	const northUmaOrig = {
		positive: game ? game.participants[3].score.uma >= 0 : true,
		value: Math.abs(game ? game.participants[3].score.uma : 0)
	};
	const northPenaltyOrig = {
		positive: false,
		value: Math.abs(game ? game.participants[3].score.penalty : 0)
	};

	const [eastRaw, setEastRaw] = useState<PointInputType>(eastRawOrig);
	const [eastUma, setEastUma] = useState<PointInputType>(eastUmaOrig);
	const [eastPenalty, setEastPenalty] = useState<PointInputType>(eastPenaltyOrig);

	const [southRaw, setSouthRaw] = useState<PointInputType>(southRawOrig);
	const [southUma, setSouthUma] = useState<PointInputType>(southUmaOrig);
	const [southPenalty, setSouthPenalty] = useState<PointInputType>(southPenaltyOrig);

	const [westRaw, setWestRaw] = useState<PointInputType>(westRawOrig);
	const [westUma, setWestUma] = useState<PointInputType>(westUmaOrig);
	const [westPenalty, setWestPenalty] = useState<PointInputType>(westPenaltyOrig);

	const [northRaw, setNorthRaw] = useState<PointInputType>(northRawOrig);
	const [northUma, setNorthUma] = useState<PointInputType>(northUmaOrig);
	const [northPenalty, setNorthPenalty] = useState<PointInputType>(northPenaltyOrig);

	const rawSum = getNumericValue(eastRaw) + getNumericValue(southRaw) + getNumericValue(westRaw) + getNumericValue(northRaw);
	const umaSum = getNumericValue(eastUma) + getNumericValue(southUma) + getNumericValue(westUma) + getNumericValue(northUma);

	const eastScore = {
		raw: getNumericValue(eastRaw),
		uma: getNumericValue(eastUma),
		penalty: getNumericValue(eastPenalty)
	};
	const southScore = {
		raw: getNumericValue(southRaw),
		uma: getNumericValue(southUma),
		penalty: getNumericValue(southPenalty)
	};
	const westScore = {
		raw: getNumericValue(westRaw),
		uma: getNumericValue(westUma),
		penalty: getNumericValue(westPenalty)
	};
	const northScore = {
		raw: getNumericValue(northRaw),
		uma: getNumericValue(northUma),
		penalty: getNumericValue(northPenalty)
	};

	const eastFinal = eastScore.raw + eastScore.uma + eastScore.penalty;
	const southFinal = southScore.raw + southScore.uma + southScore.penalty;
	const westFinal = westScore.raw + westScore.uma + westScore.penalty;
	const northFinal = northScore.raw + northScore.uma + northScore.penalty;

	const save = () => {
		if (!game) return;

		const updatedGame: Game = {
			round: props.roundId,
			table: props.tableId,
			finished: true,
			participants: [
				{
					playerId: game.participants[0].playerId,
					score: eastScore
				},
				{
					playerId: game.participants[1].playerId,
					score: southScore
				},
				{
					playerId: game.participants[2].playerId,
					score: westScore
				},
				{
					playerId: game.participants[3].playerId,
					score: northScore
				}
			]
		};

		const updatedGames = tournament.games.map((currentGame: Game) => (
			currentGame.round === props.roundId && currentGame.table === props.tableId ? updatedGame : currentGame
		));

		addGames(updatedGames);
	};

	const revertChanges = () => {
		setEastRaw(eastRawOrig);
		setEastUma(eastUmaOrig);
		setEastPenalty(eastPenaltyOrig);

		setSouthRaw(southRawOrig);
		setSouthUma(southUmaOrig);
		setSouthPenalty(southPenaltyOrig);

		setWestRaw(westRawOrig);
		setWestUma(westUmaOrig);
		setWestPenalty(westPenaltyOrig);

		setNorthRaw(northRawOrig);
		setNorthUma(northUmaOrig);
		setNorthPenalty(northPenaltyOrig);
	};

	if (!game) {
		return (
			<div>
				<Alert
					type={"error"}
					message={"It seems that this game is missing from the tournament data for some reason."}
				/>
				</div>
		);
	};

	const totalsWrong = safeMode && (rawSum !== 0 || umaSum !== 0);

	const eastRawMod = eastScore.raw !== game.participants[0].score.raw;
	const eastUmaMod = eastScore.uma !== game.participants[0].score.uma;
	const eastPenaltyMod = eastScore.penalty !== game.participants[0].score.penalty;
	const eastModified = eastRawMod || eastUmaMod || eastPenaltyMod;

	const southRawMod = southScore.raw !== game.participants[1].score.raw;
	const southUmaMod = southScore.uma !== game.participants[1].score.uma;
	const southPenaltyMod = southScore.penalty !== game.participants[1].score.penalty;
	const southModified = southRawMod || southUmaMod || southPenaltyMod;

	const westRawMod = westScore.raw !== game.participants[2].score.raw;
	const westUmaMod = westScore.uma !== game.participants[2].score.uma;
	const westPenaltyMod = westScore.penalty !== game.participants[2].score.penalty;
	const westModified = westRawMod || westUmaMod || westPenaltyMod;

	const northRawMod = northScore.raw !== game.participants[3].score.raw;
	const northUmaMod = northScore.uma !== game.participants[3].score.uma;
	const northPenaltyMod = northScore.penalty !== game.participants[3].score.penalty;
	const northModified = northRawMod || northUmaMod || northPenaltyMod;
	
	/**
	 * It's possible (although ridiculously unlikely) for a game to end in a complete tie,
	 * so we need to allow saving and finishing when every field is 0.
	 */
	const everythingIsZero =
		eastScore.raw === 0 && eastScore.uma === 0 &&
		southScore.raw === 0 && southScore.uma === 0 &&
		westScore.raw === 0 && westScore.uma === 0 &&
		northScore.raw === 0 && northScore.uma === 0;

	const modified = everythingIsZero || eastModified || southModified || westModified || northModified;

	return (
		<div className={styles.resultEditor}>
			<Space direction={"vertical"}>
				<Space>
					<label htmlFor={`safeSwitch-${props.tableId}`}>Safe mode</label>
					<Switch
						checked={!safeMode}
						onChange={() => setSafeMode(!safeMode)}
						size={"small"}
						id={`safeSwitch-${props.tableId}`}
					/>
					<label htmlFor={`safeSwitch-${props.tableId}`}>Danger mode</label>
				</Space>
				<table>
					<thead>
						<tr>
							<th className={styles.windColumn}>{null}</th>
							<th className={styles.name}>Player</th>
							<th>Raw points</th>
							<th>Uma</th>
							<th>Penalty</th>
							<th className={styles.final}>Final</th>
							<th>{null}</th>
						</tr>
					</thead>
					<tbody>
						<tr>
							<td>East</td>
							<td className={styles.name}>{tournament.playerList[game.participants[0].playerId].name}</td>
							<td>
								<PointInput
									className={styles.pointInput}
									value={eastRaw}
									onChange={(newValue: PointInputType) => setEastRaw(newValue)}
									tabIndex={1}
									short={safeMode}
								/>
							</td>
							<td>
								<PointInput
									className={styles.pointInput}
									value={eastUma}
									onChange={(newValue: PointInputType) => setEastUma(newValue)}
									tabIndex={5}
									short={safeMode}
									uma
								/>
							</td>
							<td>
								<PointInput
									className={styles.pointInput}
									value={eastPenalty}
									onChange={(newValue: PointInputType) => setEastPenalty(newValue)}
									tabIndex={9}
									short={safeMode}
									unflippable
								/>
							</td>
							<td className={styles.final}>{safeMode ? formatPoints({points: eastFinal, sign: true}) : eastFinal}</td>
							<td>{tournament.playerList[game.participants[0].playerId].substitute && "(Substitute)"}</td>
						</tr>
						<tr>
							<td>South</td>
							<td className={styles.name}>{tournament.playerList[game.participants[1].playerId].name}</td>
							<td>
								<PointInput
									className={styles.pointInput}
									value={southRaw}
									onChange={(newValue: PointInputType) => setSouthRaw(newValue)}
									tabIndex={2}
									short={safeMode}
								/>
							</td>
							<td>
								<PointInput
									className={styles.pointInput}
									value={southUma}
									onChange={(newValue: PointInputType) => setSouthUma(newValue)}
									tabIndex={6}
									short={safeMode}
									uma
								/>
							</td>
							<td>
								<PointInput
									className={styles.pointInput}
									value={southPenalty}
									onChange={(newValue: PointInputType) => setSouthPenalty(newValue)}
									tabIndex={10}
									short={safeMode}
									unflippable
								/>
							</td>
							<td className={styles.final}>{safeMode ? formatPoints({points: southFinal, sign: true}) : southFinal}</td>
							<td>{tournament.playerList[game.participants[1].playerId].substitute && "(Substitute)"}</td>
						</tr>
						<tr>
							<td>West</td>
							<td className={styles.name}>{tournament.playerList[game.participants[2].playerId].name}</td>
							<td>
								<PointInput
									className={styles.pointInput}
									value={westRaw}
									onChange={(newValue: PointInputType) => setWestRaw(newValue)}
									tabIndex={3}
									short={safeMode}
								/>
							</td>
							<td>
								<PointInput
									className={styles.pointInput}
									value={westUma}
									onChange={(newValue: PointInputType) => setWestUma(newValue)}
									tabIndex={7}
									short={safeMode}
									uma
								/>
							</td>
							<td>
								<PointInput
									className={styles.pointInput}
									value={westPenalty}
									onChange={(newValue: PointInputType) => setWestPenalty(newValue)}
									tabIndex={11}
									short={safeMode}
									unflippable
								/>
							</td>
							<td className={styles.final}>{safeMode ? formatPoints({points: westFinal, sign: true}) : westFinal}</td>
							<td>{tournament.playerList[game.participants[2].playerId].substitute && "(Substitute)"}</td>
						</tr>
						<tr>
							<td>North</td>
							<td className={styles.name}>{tournament.playerList[game.participants[3].playerId].name}</td>
							<td>
								<PointInput
									className={styles.pointInput}
									value={northRaw}
									onChange={(newValue: PointInputType) => setNorthRaw(newValue)}
									tabIndex={4}
									short={safeMode}
								/>
							</td>
							<td>
								<PointInput
									className={styles.pointInput}
									value={northUma}
									onChange={(newValue: PointInputType) => setNorthUma(newValue)}
									tabIndex={8}
									short={safeMode}
									uma
								/>
							</td>
							<td>
								<PointInput
									className={styles.pointInput}
									value={northPenalty}
									onChange={(newValue: PointInputType) => setNorthPenalty(newValue)}
									tabIndex={12}
									short={safeMode}
									unflippable
								/>
							</td>
							<td className={styles.final}>{safeMode ? formatPoints({points: northFinal, sign: true}) : northFinal}</td>
							<td>{tournament.playerList[game.participants[3].playerId].substitute && "(Substitute)"}</td>
						</tr>
						<tr>
							<td>{null}</td>
							<td>{null}</td>
							<td>
								<Input
									className={`${styles.pointInput} ${styles.sumField} ${rawSum !== 0 ? styles.wrong : ""}`}
									value={safeMode ? formatPoints({points: rawSum, sign: true}) : rawSum}
									disabled={true}
								/>
							</td>
							<td>
								<Input
									className={`${styles.pointInput} ${styles.sumField} ${umaSum !== 0 ? styles.wrong : ""}`}
									value={safeMode ? formatPoints({points: umaSum, sign: true}) : umaSum}
									disabled={true}
								/>
							</td>
							<td>{null}</td>
							<td>{null}</td>
						</tr>
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
						disabled={totalsWrong || !modified}
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