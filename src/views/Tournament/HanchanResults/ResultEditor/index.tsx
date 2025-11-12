import {useState} from "react";
import { useDispatch } from "react-redux";
import { bindActionCreators } from "redux";
import useTournament from "../../../../utils/hooks/useTournament";
import { getNumericValue } from "../../../../utils/getNumericValue";
import Toggle from "../../../../components/Toggle";
import PointInput from "../../../../components/PointInput";
import Button from "../../../../components/Button";
import { Game, PointInputType, Score } from "../../../../data-types/tournament-data-types";
import { Alert } from "antd";
import { tournamentActionCreators } from "../../../../state";
import {formatPoints} from "../../../../utils/formatPoints";

type ResultEditorPros = {
	round: number,
	table: number
};

const ResultEditor = (props: ResultEditorPros) => {
	const tournament = useTournament();
	const game = tournament.games.find((game: Game): boolean => (game.round === props.round && game.table === props.table));
	const [safeMode, setSafeMode] = useState<boolean>(true);

	const dispatch = useDispatch();
	const {addGames} = bindActionCreators(tournamentActionCreators, dispatch)

	const [eastRaw, setEastRaw] = useState<PointInputType>({
		positive: game ? game.participants[0].score.raw >= 0 : true,
		value: Math.abs(game ? game.participants[0].score.raw : 0)
	});
	const [eastUma, setEastUma] = useState<PointInputType>({
		positive: game ? game.participants[0].score.uma >= 0 : true,
		value: Math.abs(game ? game.participants[0].score.uma : 0)
	});
	const [eastPenalty, setEastPenalty] = useState<PointInputType>({
		positive: false,
		value: Math.abs(game ? game.participants[0].score.penalty : 0)
	});

	const [southRaw, setSouthRaw] = useState<PointInputType>({
		positive: game ? game.participants[1].score.raw >= 0 : true,
		value: Math.abs(game ? game.participants[1].score.raw : 0)
	});
	const [southUma, setSouthUma] = useState<PointInputType>({
		positive: game ? game.participants[1].score.uma >= 0 : true,
		value: Math.abs(game ? game.participants[1].score.uma : 0)
	});
	const [southPenalty, setSouthPenalty] = useState<PointInputType>({
		positive: false,
		value: Math.abs(game ? game.participants[1].score.penalty : 0)
	});

	const [westRaw, setWestRaw] = useState<PointInputType>({
		positive: game ? game.participants[2].score.raw >= 0 : true,
		value: Math.abs(game ? game.participants[2].score.raw : 0)
	});
	const [westUma, setWestUma] = useState<PointInputType>({
		positive: game ? game.participants[2].score.uma >= 0 : true,
		value: Math.abs(game ? game.participants[2].score.uma : 0)
	});
	const [westPenalty, setWestPenalty] = useState<PointInputType>({
		positive: false,
		value: Math.abs(game ? game.participants[2].score.penalty : 0)
	});

	const [northRaw, setNorthRaw] = useState<PointInputType>({
		positive: game ? game.participants[3].score.raw >= 0 : true,
		value: Math.abs(game ? game.participants[3].score.raw : 0)
	});
	const [northUma, setNorthUma] = useState<PointInputType>({
		positive: game ? game.participants[3].score.uma >= 0 : true,
		value: Math.abs(game ? game.participants[3].score.uma : 0)
	});
	const [northPenalty, setNorthPenalty] = useState<PointInputType>({
		positive: false,
		value: Math.abs(game ? game.participants[3].score.penalty : 0)
	});

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

	const totalsOk = !safeMode || (rawSum === 0 && umaSum === 0);

	const save = () => {
		if (!game) return;

		const updatedGame: Game = {
			round: props.round,
			table: props.table,
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
			currentGame.round === props.round && currentGame.table === props.table ? updatedGame : currentGame
		));

		addGames(updatedGames);
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

	return (
		<div>
			<Toggle
				false={"Danger more"}
				true={"Safe mode"}
				value={safeMode}
				onSwitch={() => setSafeMode(!safeMode)}
			/>
			<table>
				<thead>
					<tr>
						<th colSpan={2}>Player</th>
						<th>Raw points</th>
						<th>Uma</th>
						<th>Penalty</th>
						<th>Final</th>
						<th>{null}</th>
					</tr>
				</thead>
				<tbody>
					<tr>
						<td>East</td>
						<td>{tournament.playerList[game.participants[0].playerId].name}</td>
						<td>
							<PointInput
								value={eastRaw}
								onChange={(newValue: PointInputType) => setEastRaw(newValue)}
								tabIndex={1}
								short={safeMode}
							/>
						</td>
						<td>
							<PointInput
								value={eastUma}
								onChange={(newValue: PointInputType) => setEastUma(newValue)}
								tabIndex={5}
								short={safeMode}
								uma
							/>
						</td>
						<td>
							<PointInput
								value={eastPenalty}
								onChange={(newValue: PointInputType) => setEastPenalty(newValue)}
								tabIndex={9}
								short={safeMode}
								unflippable
							/>
						</td>
						<td>{safeMode ? formatPoints({points: eastFinal, sign: true}) : eastFinal}</td>
						<td>{tournament.playerList[game.participants[0].playerId].substitute && "(Substitute)"}</td>
					</tr>
					<tr>
						<td>South</td>
						<td>{tournament.playerList[game.participants[1].playerId].name}</td>
						<td>
							<PointInput
								value={southRaw}
								onChange={(newValue: PointInputType) => setSouthRaw(newValue)}
								tabIndex={2}
								short={safeMode}
							/>
						</td>
						<td>
							<PointInput
								value={southUma}
								onChange={(newValue: PointInputType) => setSouthUma(newValue)}
								tabIndex={6}
								short={safeMode}
								uma
							/>
						</td>
						<td>
							<PointInput
								value={southPenalty}
								onChange={(newValue: PointInputType) => setSouthPenalty(newValue)}
								tabIndex={10}
								short={safeMode}
								unflippable
							/>
						</td>
						<td>{safeMode ? formatPoints({points: southFinal, sign: true}) : southFinal}</td>
						<td>{tournament.playerList[game.participants[1].playerId].substitute && "(Substitute)"}</td>
					</tr>
					<tr>
						<td>West</td>
						<td>{tournament.playerList[game.participants[2].playerId].name}</td>
						<td>
							<PointInput
								value={westRaw}
								onChange={(newValue: PointInputType) => setWestRaw(newValue)}
								tabIndex={3}
								short={safeMode}
							/>
						</td>
						<td>
							<PointInput
								value={westUma}
								onChange={(newValue: PointInputType) => setWestUma(newValue)}
								tabIndex={7}
								short={safeMode}
								uma
							/>
						</td>
						<td>
							<PointInput
								value={westPenalty}
								onChange={(newValue: PointInputType) => setWestPenalty(newValue)}
								tabIndex={11}
								short={safeMode}
								unflippable
							/>
						</td>
						<td>{safeMode ? formatPoints({points: westFinal, sign: true}) : westFinal}</td>
						<td>{tournament.playerList[game.participants[2].playerId].substitute && "(Substitute)"}</td>
					</tr>
					<tr>
						<td>North</td>
						<td>{tournament.playerList[game.participants[3].playerId].name}</td>
						<td>
							<PointInput
								value={northRaw}
								onChange={(newValue: PointInputType) => setNorthRaw(newValue)}
								tabIndex={4}
								short={safeMode}
							/>
						</td>
						<td>
							<PointInput
								value={northUma}
								onChange={(newValue: PointInputType) => setNorthUma(newValue)}
								tabIndex={8}
								short={safeMode}
								uma
							/>
						</td>
						<td>
							<PointInput
								value={northPenalty}
								onChange={(newValue: PointInputType) => setNorthPenalty(newValue)}
								tabIndex={12}
								short={safeMode}
								unflippable
							/>
						</td>
						<td>{safeMode ? formatPoints({points: northFinal, sign: true}) : northFinal}</td>
						<td>{tournament.playerList[game.participants[3].playerId].substitute && "(Substitute)"}</td>
					</tr>
				</tbody>
			</table>
			{
				safeMode
				?
				<p>Enter points in short form, i.e. "12.3" instead of "12300".</p>
				:
				<p>Enter points in long form, i.e. "12300" instead of "12.3".</p>
			}
			<Button
				label={"Save and mark finished"}
				onClick={save}
				disabled={!totalsOk}
			/>
		</div>
	);
};

export default ResultEditor;