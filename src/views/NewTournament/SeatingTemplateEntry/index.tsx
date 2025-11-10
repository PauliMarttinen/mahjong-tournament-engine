import { useState, useMemo } from "react";
import { Game, Score } from "../../../data-types/tournament-data-types";
import { generateArray } from "../../../utils/generateArray";
import useTournament from "../../../utils/hooks/useTournament";
import { bindActionCreators } from "redux";
import { tournamentActionCreators } from "../../../state";
import { useDispatch } from "react-redux";
import { recommendedSeatingTemplates } from "./recommendedSeatingTemplates/recommendedSeatingTemplates";
import Button from "../../../components/Button";
import Popup from "../../../components/Popup";
import { useNavigate } from "react-router-dom";
import { Routes } from "../../../utils/routeUtils";
import FormatSelector, {Formats} from "./FormatSelector/FormatSelector";
import SeatingTemplateTable from "./SeatingTemplateTable";
import { generateRandomizedSeating } from "./utils/generateRandomizedSeating";
import FileUpload from "../../../components/FileUpload";
import readXlsxFile from "read-excel-file";
import { Row } from "read-excel-file/types";
import { convertTemplate } from "../../../utils/convertTemplate";
import { evaluateSeatingBalance, evaluateMeetingBalance, findErrors } from "./utils/seatingTemplateEvaluation";

const defaultScore: Score = {
	raw: 0,
	uma: 0,
	penalty: 0
}

enum SeatingTemplateTypes {
	Recommended,
	Custom,
	Randomized
}

type SeatingTemplateHistoryItem = {
	template: number[][],
	type: SeatingTemplateTypes
}

const SeatingTemplateEntry = () => {
	const tournament = useTournament();
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const {addGames} = bindActionCreators(tournamentActionCreators, dispatch);
	
	const recommendedExists = `r${tournament.info.rounds}p${tournament.playerList.length}` in recommendedSeatingTemplates;

	const getFirstTemplate = (): SeatingTemplateHistoryItem => {
		if (recommendedExists) {
			return {
				template: recommendedSeatingTemplates[`r${tournament.info.rounds}p${tournament.playerList.length}`],
				type: SeatingTemplateTypes.Recommended
			};
		}

		return {
			template: generateRandomizedSeating(tournament.playerList.length, tournament.info.rounds),
			type: SeatingTemplateTypes.Randomized
		};
	};

	const [showPreview, setShowPreview] = useState<boolean>(false);
	const [showUploadPopup, setShowUploadPopup] = useState<boolean>(false);
	const [seatingTemplateHistory, setSeatingTemplateHistory] = useState<SeatingTemplateHistoryItem[]>([getFirstTemplate()]);
	const [currentSeatingTemplateIndex, setCurrentSeatingTemplateIndex] = useState<number>(0);
	const [selectedFormat, setSelectedFormat] = useState<Formats>(Formats.TableRoundVertical);
	const [showSeatingBalanceInfo, setShowSeatingBalanceInfo] = useState<boolean>(false);
	const [showMeetingBalanceInfo, setShowMeetingBalanceInfo] = useState<boolean>(false);

	const seatingTemplateErrors = useMemo(() => findErrors(seatingTemplateHistory[currentSeatingTemplateIndex].template), [currentSeatingTemplateIndex, seatingTemplateHistory]);

	const addSeatingTemplateToHistory = (template: number[][], type: SeatingTemplateTypes): void => {
		const newHistory = [...seatingTemplateHistory, {template, type}];
		setSeatingTemplateHistory(newHistory);
		setCurrentSeatingTemplateIndex(newHistory.length - 1);
	};

	const createGamesData = (seatingTemplate: number[][]): Game[] => {
		return generateArray(tournament.info.rounds).map((roundId: number): Game[] => (
			generateArray(tournament.playerList.length / 4).map((tableId: number): Game => ({
				round: roundId,
				table: tableId,
				finished: false,
				participants: [
					{
						playerId: seatingTemplate[tableId*4+0][roundId],
						score: defaultScore
					},
					{
						playerId: seatingTemplate[tableId*4+1][roundId],
						score: defaultScore
					},
					{
						playerId: seatingTemplate[tableId*4+2][roundId],
						score: defaultScore
					},
					{
						playerId: seatingTemplate[tableId*4+3][roundId],
						score: defaultScore
					}
				]
			}))
		)).reduce((combined: Game[], round: Game[]): Game[] => [...combined, ...round], []);
	};

	const confirmSeating = (): void => {
		if (seatingTemplateHistory === null) return;
		addGames(createGamesData(seatingTemplateHistory[currentSeatingTemplateIndex].template));
		navigate(Routes.Overview);
	};

	const readTemplateFile = (files: FileList | null) => {
		if (files === null) return;

		readXlsxFile(files[0]).then((excelRows: Row[]) => {
			addSeatingTemplateToHistory(convertTemplate(excelRows, tournament.info.rounds, tournament.playerList.length), SeatingTemplateTypes.Custom);
			setShowUploadPopup(false);
		});
	};

	const randomizeSeating = (): void => {
		addSeatingTemplateToHistory(generateRandomizedSeating(tournament.playerList.length, tournament.info.rounds), SeatingTemplateTypes.Randomized);
	};

	const setRecommendedSeating = (): void => {
		if (!recommendedExists) return;
		setCurrentSeatingTemplateIndex(0);
	};

	const confirmDisabled = seatingTemplateErrors.missing.length > 0 || seatingTemplateErrors.duplicates.length > 0 || seatingTemplateErrors.outsideRange.length > 0;

	return (
		<div>
			{
				showUploadPopup &&
				<Popup
					title={"Upload Seating Template"}
					cancelText={"Cancel"}
					onCancel={() => setShowUploadPopup(false)}
					confirmText={""}
					onConfirm={() => {}}
					confirmHidden={true}
				>
					<p>You can open your own seating template as an Excel file.</p>
					<FileUpload
						label={"Open custom seating template file"}
						onUpload={(content) => readTemplateFile(content)}
					/>
				</Popup>
			}
			{
				showSeatingBalanceInfo &&
				<Popup
					title={"Seating Balance Score"}
					cancelText={"Close"}
					onCancel={() => setShowSeatingBalanceInfo(false)}
					confirmText={""}
					onConfirm={() => {}}
					confirmHidden={true}
				>
					<p>Seating Balance Score measures how perfectly players are seated into the four seat winds over the course of the tournament. The score is on the scale of 0-100 where 100 is perfect balance.</p>
					<p>Perfect balance can be impossible with certain combinations of number of players and number of rounds.</p>
				</Popup>
			}
			{
				showMeetingBalanceInfo &&
				<Popup
					title={"Meeting Balance Score"}
					cancelText={"Close"}
					onCancel={() => setShowMeetingBalanceInfo(false)}
					confirmText={""}
					onConfirm={() => {}}
					confirmHidden={true}
				>
					<p>Meeting Balance Score measures how evenly players meet each other over the course of the tournament. The score is on the scale of 0-100 where 100 is perfect balance.</p>
					<p>Perfect balance can be impossible with certain combinations of number of players and number of rounds.</p>
				</Popup>
			}
			<h1>Seating</h1>
			<h2>Seating Template</h2>
			<Button
				label={"Previous Seating"}
				onClick={() => setCurrentSeatingTemplateIndex(currentSeatingTemplateIndex - 1)}
				disabled={currentSeatingTemplateIndex === 0}
			/>
			<Button
				label={"Next Seating"}
				onClick={() => setCurrentSeatingTemplateIndex(currentSeatingTemplateIndex + 1)}
				disabled={currentSeatingTemplateIndex === seatingTemplateHistory.length - 1}
			/>
			<Button
				label={"Try New Random Seating"}
				onClick={() => randomizeSeating()}
			/>
			<p>Showing seating template {currentSeatingTemplateIndex + 1} of {seatingTemplateHistory.length} (Type: {SeatingTemplateTypes[seatingTemplateHistory[currentSeatingTemplateIndex].type]})</p>
			<SeatingTemplateTable
				seatingTemplate={seatingTemplateHistory[currentSeatingTemplateIndex].template}
				errors={seatingTemplateErrors}
				format={selectedFormat}
				preview={showPreview}
			/>
			<FormatSelector
				format={selectedFormat}
				onFormatChange={(format: Formats) => setSelectedFormat(format)}
			/>
			{
				!recommendedExists &&
				<p>Note: The Engine does not have a recommended seating template for this number of round and players, so this seating is randomly generated.</p>
			}
			<h2>Seating evaluations</h2>
			<table>
				<tbody>
					<tr>
						<td>Seating Balance Score</td>
						<td>{evaluateSeatingBalance(seatingTemplateHistory[currentSeatingTemplateIndex].template).toFixed(2)}/100.00</td>
						<td>
							<Button
								label={"?"}
								onClick={() => setShowSeatingBalanceInfo(true)}
							/>
						</td>
					</tr>
					<tr>
						<td>Meeting Balance Score</td>
						<td>{evaluateMeetingBalance(seatingTemplateHistory[currentSeatingTemplateIndex].template).toFixed(2)}/100.00</td>
						<td>
							<Button
								label={"?"}
								onClick={() => setShowMeetingBalanceInfo(true)}
							/>
						</td>
					</tr>
				</tbody>
			</table>
			{
				seatingTemplateErrors.missing.length > 0 &&
				<>
					<h3>Missing players in rounds:</h3>
					<ul>
						{seatingTemplateErrors.missing.map((missingPlayer) => (
							<li key={`missing-player-${missingPlayer.playerId}-round-${missingPlayer.roundId}`}>
								Player {missingPlayer.playerId} is missing from Round {missingPlayer.roundId + 1}
							</li>
						))}
					</ul>
				</>
			}
			{
				seatingTemplateErrors.outsideRange.length > 0 &&
				<>
					<h3>Player IDs outside valid range (0-{tournament.playerList.length-1}):</h3>
					<ul>
						{seatingTemplateErrors.outsideRange.map((outsideRangeEntry, index) => (
							<li key={`outside-range-${index}`}>
								Player ID {outsideRangeEntry.playerId} at Table {outsideRangeEntry.tableId + 1}, Round {outsideRangeEntry.roundId + 1} is outside the valid range
							</li>
						))}
					</ul>
				</>
			}
			<Button
				label={"Use recommended seating template"}
				onClick={() => setRecommendedSeating()}
				disabled={!recommendedExists}
			/>
			<Button
				label={"Open Seating Template File"}
				onClick={() => setShowUploadPopup(true)}
			/>
			<Button
				label={"Preview With Names"}
				onClick={() => setShowPreview(true)}
			/>
			<Button
				label={"Confirm Seating"}
				onClick={() => confirmSeating()}
				disabled={confirmDisabled}
			/>
			{
				confirmDisabled &&
				<p>Cannot confirm seating while there are errors in the seating template.</p>
			}
		</div>
	);
};

export default SeatingTemplateEntry;