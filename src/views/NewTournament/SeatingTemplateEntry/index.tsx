import { useState, useEffect } from "react";
import type { Game, Score } from "../../../data-types/tournament-data-types";
import { generateArray } from "../../../utils/generateArray";
import useNewTournament from "../../../utils/hooks/useNewTournament";
import { bindActionCreators } from "redux";
import { tournamentActionCreators } from "../../../state";
import { newTournamentActionCreators } from "../../../state";
import { useDispatch } from "react-redux";
import { recommendedSeatingTemplates } from "./recommendedSeatingTemplates/recommendedSeatingTemplates";
import { useNavigate } from "react-router-dom";
import { Routes } from "../../../utils/routeUtils";
import SeatingTemplateTable from "./SeatingTemplateTable";
import { generateRandomizedSeating } from "./utils/generateRandomizedSeating";
import FileUpload from "../../../components/FileUpload";
import readXlsxFile from "read-excel-file";
import type { Row } from "read-excel-file/types";
import { convertTemplateFromCsv, convertTemplateFromExcel } from "../../../utils/convertTemplate";
import { findErrors } from "./utils/seatingTemplateEvaluation";
import SeatingTemplateEvaluations from "./SeatingTemplateEvaluation";
import type { SeatingTemplateHistoryItem } from "../../../data-types/new-tournament-data-types";
import {SeatingTemplateTypes} from "../../../data-types/new-tournament-data-types";
import styles from "./SeatingTemplateEntry.module.css";
import {Modal, Space, Card, Alert, Button} from "antd";
import FormatSelector, {Formats} from "./SeatingTemplateTable/FormatSelector/FormatSelector";
import NewTournamentSteps from "../../../components/NewTournamentSteps";

const defaultScore: Score = {
	raw: 0,
	uma: 0,
	penalty: 0
}

const SeatingTemplateEntry = () => {
	const newTournament = useNewTournament();
	const {seatingTemplateHistory, currentSeatingTemplateIndex, seatingTemplateErrors} = newTournament;
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const {editTournamentInfo, addPlayers, addGames} = bindActionCreators(tournamentActionCreators, dispatch);
	const {setSeatingTemplateHistory, setCurrentSeatingTemplateIndex, setSeatingTemplateErrors, clearNewTournament} = bindActionCreators(newTournamentActionCreators, dispatch);
	
	const recommendedExists = `r${newTournament.info.rounds}p${newTournament.playerList.length}` in recommendedSeatingTemplates;

	const getFirstTemplate = (): SeatingTemplateHistoryItem => {
		if (recommendedExists) {
			return {
				template: recommendedSeatingTemplates[`r${newTournament.info.rounds}p${newTournament.playerList.length}`],
				type: SeatingTemplateTypes.Recommended
			};
		}

		return {
			template: generateRandomizedSeating(newTournament.playerList.length, newTournament.info.rounds),
			type: SeatingTemplateTypes.Randomized
		};
	};
	
	useEffect(() => {
		if (seatingTemplateHistory.length === 0)
		{
			setSeatingTemplateHistory([getFirstTemplate()]);
		}
	}, []);

	const [showPreview, setShowPreview] = useState<boolean>(false);
	const [showUploadModal, setShowUploadModal] = useState<boolean>(false);
	const [format, setFormat] = useState<Formats>(Formats.TableRoundVertical);

	useEffect(() => {
		if (seatingTemplateHistory.length > 0)
		{
			setSeatingTemplateErrors(findErrors(seatingTemplateHistory[currentSeatingTemplateIndex].template));
		}
	}, [currentSeatingTemplateIndex, seatingTemplateHistory]);

	const addSeatingTemplateToHistory = (template: number[][], type: SeatingTemplateTypes): void => {
		const newHistory = [...seatingTemplateHistory, {template, type}];
		setSeatingTemplateHistory(newHistory);
		setCurrentSeatingTemplateIndex(newHistory.length - 1);
	};

	const createGamesData = (seatingTemplate: number[][]): Game[] => {
		return generateArray(newTournament.info.rounds).map((roundId: number): Game[] => (
			generateArray(newTournament.playerList.length / 4).map((tableId: number): Game => ({
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
		editTournamentInfo(newTournament.info);
		addPlayers(newTournament.playerList);
		addGames(createGamesData(seatingTemplateHistory[currentSeatingTemplateIndex].template));
		clearNewTournament();
		navigate(Routes.Overview);
	};

	const readTemplateFile = (files: FileList | null) => {
		if (files === null) return;

		readXlsxFile(files[0]).then((excelRows: Row[]) => {
			addSeatingTemplateToHistory(convertTemplateFromExcel(excelRows, newTournament.info.rounds, newTournament.playerList.length), SeatingTemplateTypes.Custom);
			setShowUploadModal(false);
		}).catch((e) => {
			const fileReader = new FileReader();
			fileReader.onload = () => {
				if (fileReader.result === null) return;
				addSeatingTemplateToHistory(convertTemplateFromCsv(fileReader.result as string, newTournament.info.rounds, newTournament.playerList.length), SeatingTemplateTypes.Custom);
			};
			fileReader.readAsText(files[0]);
		});
	};

	const randomizeSeating = (): void => {
		addSeatingTemplateToHistory(generateRandomizedSeating(newTournament.playerList.length, newTournament.info.rounds), SeatingTemplateTypes.Randomized);
	};

	const setRecommendedSeating = (): void => {
		if (!recommendedExists) return;
		setCurrentSeatingTemplateIndex(0);
	};

	const confirmDisabled = seatingTemplateErrors.missing.length > 0 || seatingTemplateErrors.duplicates.length > 0 || seatingTemplateErrors.outsideRange.length > 0;

	if (seatingTemplateHistory.length === 0) {
		return (
			<NewTournamentSteps key={"newTournamentSteps"} current={2}/>
		);
	};

	return (
		<>
			<NewTournamentSteps key={"newTournamentSteps"} current={2}/>
			<Modal
				centered={true}
				open={showUploadModal}
				title={"Open Seating Template File"}
				footer={[
					<Button type={"primary"} onClick={() => setShowUploadModal(false)}>Close</Button>
				]}>
				<p>You can open your own seating template as an Excel or CSV file.</p>
				<FileUpload
					label={"Open custom seating template file"}
					onUpload={(content) => readTemplateFile(content)}
				/>
			</Modal>
			<div className={styles.seatingTemplateEntry}>
				<Space direction={"vertical"}>
					<h1>Seating template</h1>
					<Space className={styles.workspace}>
						<Space
							className={styles.toolbar}
							direction={"vertical"}>
							{
								recommendedExists &&
								<Alert message={"A recommended template for this number of rounds and players is available."}/>
							}
							<Card title={"Template stack"}>
								<Space direction={"vertical"}>
									<p>Template {currentSeatingTemplateIndex + 1} of {seatingTemplateHistory.length}</p>
									<p>Kind: {SeatingTemplateTypes[seatingTemplateHistory[currentSeatingTemplateIndex].type]}</p>
									<Button
										type={"default"}
										onClick={() => setCurrentSeatingTemplateIndex(currentSeatingTemplateIndex - 1)}
										disabled={currentSeatingTemplateIndex === 0}>
										Previous Seating
									</Button>
									<Button
										type={"default"}
										onClick={() => setCurrentSeatingTemplateIndex(currentSeatingTemplateIndex + 1)}
										disabled={currentSeatingTemplateIndex === seatingTemplateHistory.length - 1}>
										Next Seating
									</Button>
									{
										recommendedExists &&
										<Button
											type={"default"}
											onClick={() => setRecommendedSeating()}>
											Recommended
										</Button>
									}
								</Space>
							</Card>
							<Card title={"Add template"}>
								<Space direction={"vertical"}>
									<Button
										type={"default"}
										onClick={() => randomizeSeating()}>
										Randomized
									</Button>
									<Button
										type={"default"}
										onClick={() => setShowUploadModal(true)}>
										Open from file
									</Button>	
								</Space>
							</Card>
							<Card title={"View options"}>
								<Button
									type={"default"}
									onClick={() => setShowPreview(true)}>
									Preview With Names
								</Button>
								<FormatSelector
									format={format}
									onFormatChange={setFormat}
								/>								
							</Card>
						</Space>
						<Space direction={"vertical"}>
							<Card>
								<SeatingTemplateTable
									format={format}
									preview={showPreview}
								/>
							</Card>
							<SeatingTemplateEvaluations/>
							{
								confirmDisabled &&
								<Alert
									type={"error"}
									message={"Cannot advance while there are errors in the seating template."}
								/>
							}
							<div className={styles.button}>
								<Button
									type={"primary"}
									onClick={() => confirmSeating()}
									disabled={confirmDisabled}>
										Finish creating the tournament
								</Button>
							</div>
						</Space>
					</Space>
				</Space>
			</div>
		</>
	);
};

export default SeatingTemplateEntry;