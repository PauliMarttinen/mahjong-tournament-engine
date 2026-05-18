import { useState, useEffect } from "react";
import { type GeneralInfo, type Round, type Uma as UmaType } from "../../../data-types/tournament-data-types";
import { useDispatch } from "react-redux";
import { bindActionCreators } from "redux";
import { newTournamentActionCreators } from "../../../state";
import { initialState } from "../../../state/reducers/tournamentReducer";
import { Routes } from "../../../utils/routeUtils";
import { useNavigate } from "react-router-dom";
import styles from "./TournamentInfoEntry.module.css";
import {Space, Button} from "antd";
import NewTournamentSteps from "../../../components/NewTournamentSteps";
import { emptyRound } from "../../../state/reducers/newTournamentReducer";
import getSimpleDateISOString from "../../../utils/getSimpleDateISOString";
import Title from "./Title/Title";
import Rounds from "./Rounds/Rounds";
import Uma from "../../../components/Uma";

const TournamentInfoView = () => {
	const navigate = useNavigate();
	const [currentInfo, setCurrentInfo] = useState<GeneralInfo>(initialState.info);
	const dispatch = useDispatch();

	const {addGeneralInfo} = bindActionCreators(newTournamentActionCreators, dispatch);

	const onSave = (): void => {
		addGeneralInfo(currentInfo);
		navigate(Routes.ScheduleEntry);
	};

	const setTitle = (newTitle: string) => {
		setCurrentInfo({
			...currentInfo,
			title: newTitle
		});
	};

	const setRounds = (count: number): void => {
		const newRoundsArray = Array(count).fill(emptyRound);
		const dateTime = getSimpleDateISOString();

		setCurrentInfo({
			...currentInfo,
			rounds: newRoundsArray.map((_: Round) => ({
				scheduledStart: dateTime,
				realStart: ""
			}))
		});
	};

	const setRoundLength = (length: number) => {
		setCurrentInfo({
			...currentInfo,
			roundLength: length
		});
	};

	const setUma = (uma: UmaType) => {
		setCurrentInfo({
			...currentInfo,
			uma: uma
		});
	};

	useEffect(() => {
		setRounds(initialState.info.rounds.length);
	}, []);

	return (
		<>
			<NewTournamentSteps key={"newTournamentSteps"} current={0}/>
			<div className={styles.tournamentInfoEntry}>
				<h1>Start new tournament</h1>
				<Space direction={"vertical"}>
					<Space direction={"horizontal"}>
						<Space direction={"vertical"} className={styles.titleRounds}>
							<Title
								title={currentInfo.title}
								onChange={setTitle}
							/>
							<Rounds
								rounds={currentInfo.rounds}
								roundLength={currentInfo.roundLength}
								onChangeRoundCount={setRounds}
								onChangeRoundLength={setRoundLength}
							/>
						</Space>
						<Space direction={"vertical"}>
							<Uma
								uma={currentInfo.uma}
								onChange={setUma}
							/>
						</Space>
					</Space>
					<div className={styles.button}>
						<Button
							type={"primary"}
							disabled={currentInfo.title.trim() === ""}
							onClick={() => onSave()}>
							Next
						</Button>
					</div>
				</Space>
			</div>
		</>
	);
};

export default TournamentInfoView;