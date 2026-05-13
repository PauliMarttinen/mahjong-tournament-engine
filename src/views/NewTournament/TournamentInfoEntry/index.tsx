import { useState, useEffect } from "react";
import { type GeneralInfo, type Round, Uma } from "../../../data-types/tournament-data-types";
import { useDispatch } from "react-redux";
import { bindActionCreators } from "redux";
import { newTournamentActionCreators } from "../../../state";
import NumberInput from "../../../components/NumberInput";
import { initialState } from "../../../state/reducers/tournamentReducer";
import { Routes } from "../../../utils/routeUtils";
import { useNavigate } from "react-router-dom";
import styles from "./TournamentInfoEntry.module.css";
import {Input, Space, Card, Button, Radio, type RadioChangeEvent} from "antd";
import MandatoryAsterisk from "../../../components/MandatoryAsterisk";
import NewTournamentSteps from "../../../components/NewTournamentSteps";
import { emptyRound } from "../../../state/reducers/newTournamentReducer";
import getSimpleDateISOString from "../../../utils/getSimpleDateISOString";

const TournamentInfoView = () => {
	const navigate = useNavigate();
	const [currentInfo, setCurrentInfo] = useState<GeneralInfo>(initialState.info);
	const dispatch = useDispatch();

	const {addGeneralInfo} = bindActionCreators(newTournamentActionCreators, dispatch);

	const onSave = (): void => {
		addGeneralInfo(currentInfo);
		navigate(Routes.ScheduleEntry);
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

	const setUma = (newUma: Uma) => {
		setCurrentInfo({
			...currentInfo,
			uma: newUma
		});
	};

	useEffect(() => {
		setRounds(initialState.info.rounds.length);
	}, []);

	const umaOptions = [
		{value: Uma.Manual, label: Uma.Manual},
		{value: Uma.EMA2025, label: Uma.EMA2025}
	];

	return (
		<>
			<NewTournamentSteps key={"newTournamentSteps"} current={0}/>
			<div className={styles.tournamentInfoEntry}>
				<Space direction={"vertical"}>
					<h1>Start new tournament</h1>
					<Card title={(
						<p>Tournament Title<MandatoryAsterisk/></p>
					)}>
						<Input
							value={currentInfo.title}
							onChange={(e): void => setCurrentInfo({...currentInfo, title: e.target.value})}
						/>
					</Card>
					<Card title={"Rounds"}>
						<label>Number of rounds</label>
						<NumberInput
							minimum={1}
							value={currentInfo.rounds.length}
							onChange={(newValue: number): void => setRounds(newValue)}
						/>
						<label>Round length (minutes)</label>
						<NumberInput
							minimum={1}
							value={currentInfo.roundLength}
							onChange={(newValue: number): void => setCurrentInfo({...currentInfo, roundLength: newValue})}
						/>
					</Card>
					<Card title={"Uma"}>
						<Radio.Group
							value={currentInfo.uma}
							options={umaOptions}
							onChange={(e: RadioChangeEvent) => setUma(e.target.value)}
						/>
					</Card>
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