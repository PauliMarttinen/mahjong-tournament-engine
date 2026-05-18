import { useState, useEffect } from "react";
import createGamesData from "./utils/generateGamesData";
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
import { findErrors } from "./utils/seatingTemplateEvaluation";
import SeatingTemplateEvaluations from "./SeatingTemplateEvaluation";
import type { SeatingTemplateStackItem } from "../../../data-types/new-tournament-data-types";
import {SeatingTemplateTypes} from "../../../data-types/new-tournament-data-types";
import styles from "./SeatingTemplateEntry.module.css";
import {Space, Alert, Button} from "antd";
import {Formats} from "./ViewOptions/FormatSelector";
import ViewOptions from "./ViewOptions";
import NewTournamentSteps from "../../../components/NewTournamentSteps";
import TemplateStack from "./TemplateStack";
import AddTemplate from "./AddTemplate";

const SeatingTemplateEntry = () => {
	const newTournament = useNewTournament();
	const {seatingTemplateStack, currentSeatingTemplateIndex, seatingTemplateErrors} = newTournament;
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const {editTournamentInfo, addPlayers, addGames} = bindActionCreators(tournamentActionCreators, dispatch);
	const {setSeatingTemplateStack: setSeatingTemplateStack, setCurrentSeatingTemplateIndex, setSeatingTemplateErrors, clearNewTournament} = bindActionCreators(newTournamentActionCreators, dispatch);
	
	const recommendedIdentifier = `r${newTournament.info.rounds.length}p${newTournament.playerList.length}`;
	const recommendedExists = recommendedIdentifier in recommendedSeatingTemplates;

	const getFirstTemplate = (): SeatingTemplateStackItem => {
		if (recommendedExists) {
			return {
				template: recommendedSeatingTemplates[recommendedIdentifier],
				type: SeatingTemplateTypes.Recommended
			};
		}

		return {
			template: generateRandomizedSeating(newTournament.playerList.length, newTournament.info.rounds.length),
			type: SeatingTemplateTypes.Randomized
		};
	};
	
	useEffect(() => {
		if (seatingTemplateStack.length === 0)
		{
			setSeatingTemplateStack([getFirstTemplate()]);
		}
	}, []);

	const [showPreview, setShowPreview] = useState<boolean>(false);
	const [format, setFormat] = useState<Formats>(Formats.TableRoundVertical);

	useEffect(() => {
		if (seatingTemplateStack.length > 0)
		{
			setSeatingTemplateErrors(findErrors(seatingTemplateStack[currentSeatingTemplateIndex].template));
		}
	}, [currentSeatingTemplateIndex, seatingTemplateStack]);

	const addSeatingTemplateToStack = (template: number[][], type: SeatingTemplateTypes): void => {
		const newStack = [...seatingTemplateStack, {template, type}];
		setSeatingTemplateStack(newStack);
		setCurrentSeatingTemplateIndex(newStack.length - 1);
	};

	const confirmSeating = (): void => {
		editTournamentInfo(newTournament.info);
		addPlayers(newTournament.playerList);
		addGames(createGamesData({
			seatingTemplate: seatingTemplateStack[currentSeatingTemplateIndex].template,
			roundCount: newTournament.info.rounds.length,
			playerCount: newTournament.playerList.length
		}));
		clearNewTournament();
		navigate(Routes.Overview);
	};

	const confirmDisabled = seatingTemplateErrors.missing.length > 0 || seatingTemplateErrors.duplicates.length > 0 || seatingTemplateErrors.outsideRange.length > 0;

	if (seatingTemplateStack.length === 0) {
		return (
			<NewTournamentSteps key={"newTournamentSteps"} current={3}/>
		);
	};

	return (
		<>
			<NewTournamentSteps key={"newTournamentSteps"} current={3}/>
			<div className={styles.seatingTemplateEntry}>
				<Space direction={"vertical"}>
					<h1>Seating template</h1>
					<Space className={styles.workspace}>
						<Space
							className={styles.toolbar}
							direction={"vertical"}>
							<TemplateStack
								recommendedExists={recommendedExists}
								index={currentSeatingTemplateIndex}
								stack={seatingTemplateStack}
								onChange={setCurrentSeatingTemplateIndex}
							/>
							<AddTemplate
								newTournament={newTournament}
								onNewTemplate={addSeatingTemplateToStack}
							/>
							<ViewOptions
								onPreview={setShowPreview}
								format={format}
								onFormat={setFormat}
							/>
						</Space>
						<Space direction={"vertical"}>
							<SeatingTemplateTable
								format={format}
								preview={showPreview}
							/>
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