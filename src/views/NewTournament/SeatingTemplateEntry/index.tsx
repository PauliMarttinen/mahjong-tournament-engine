import { useState } from "react";
import { Game, Score } from "../../../data-types/tournament-data-types";
import { generateArray } from "../../../utils/generateArray";
import useTournament from "../../../utils/hooks/useTournament";
import { bindActionCreators } from "redux";
import { tournamentActionCreators } from "../../../state";
import { useDispatch } from "react-redux";
import { premadeSeatingTemplates } from "./premadeSeatingTemplates/premadeSeatingTemplates";
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
import { evaluateSeatingBalance, evaluateMeetingBalance } from "./utils/seatingTemplateEvaluation";

const defaultScore: Score = {
	raw: 0,
	uma: 0,
	penalty: 0
}

const SeatingTemplateEntry = () => {
	const tournament = useTournament();
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const {addGames} = bindActionCreators(tournamentActionCreators, dispatch);
	
	const premadeExists = `r${tournament.info.rounds}p${tournament.playerList.length}` in premadeSeatingTemplates;
	const [showPreview, setShowPreview] = useState<boolean>(false);
	const [showUploadPopup, setShowUploadPopup] = useState<boolean>(false);
	const [seatingTemplate, setSeatingTemplate] = useState<number[][]>(premadeExists ? premadeSeatingTemplates[`r${tournament.info.rounds}p${tournament.playerList.length}`] : generateRandomizedSeating(tournament.playerList.length, tournament.info.rounds));
	const [selectedFormat, setSelectedFormat] = useState<Formats>(Formats.TableRoundVertical);
	const [showSeatingBalanceInfo, setShowSeatingBalanceInfo] = useState<boolean>(false);
	const [showMeetingBalanceInfo, setShowMeetingBalanceInfo] = useState<boolean>(false);

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
		//TODO: Validate seating template before proceeding.

		if (seatingTemplate === null) return;
		addGames(createGamesData(seatingTemplate));
		navigate(Routes.Overview);
	};

	const readTemplateFile = (files: FileList | null) => {
		if (files === null) return;

		readXlsxFile(files[0]).then((excelRows: Row[]) => {
			setSeatingTemplate(convertTemplate(excelRows, tournament.info.rounds, tournament.playerList.length));
			setShowUploadPopup(false);
		});
	};

	const randomizeSeating = (): void => {
		setSeatingTemplate(generateRandomizedSeating(tournament.playerList.length, tournament.info.rounds));
	};

	const setPremadeSeating = (): void => {
		if (!premadeExists) return;
		setSeatingTemplate(premadeSeatingTemplates[`r${tournament.info.rounds}p${tournament.playerList.length}`]);
	};

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
			<FormatSelector
				format={selectedFormat}
				onFormatChange={(format: Formats) => setSelectedFormat(format)}
			/>
			<SeatingTemplateTable
				seatingTemplate={seatingTemplate}
				format={selectedFormat}
				preview={showPreview}
			/>
			{
				!premadeExists &&
				<p>Note: The Engine does not have a premade seating template for this number of round and players, so this seating is randomly generated.</p>
			}
			<table>
				<tbody>
					<tr>
						<td>Seating Balance Score</td>
						<td>{evaluateSeatingBalance(seatingTemplate).toFixed(2)}/100.00</td>
						<td>
							<Button
								label={"?"}
								onClick={() => setShowSeatingBalanceInfo(true)}
							/>
						</td>
					</tr>
					<tr>
						<td>Meeting Balance Score</td>
						<td>{evaluateMeetingBalance(seatingTemplate).toFixed(2)}/100.00</td>
						<td>
							<Button
								label={"?"}
								onClick={() => setShowMeetingBalanceInfo(true)}
							/>
						</td>
					</tr>
				</tbody>
			</table>
			<Button
				label={"Use premade seating template"}
				onClick={() => setPremadeSeating()}
				disabled={!premadeExists}
			/>
			<Button
				label={"Randomize Seating"}
				onClick={() => randomizeSeating()}
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
			/>
		</div>
	);
};

export default SeatingTemplateEntry;