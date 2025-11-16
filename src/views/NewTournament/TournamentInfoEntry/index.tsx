import { useState } from "react";
import { GeneralInfo } from "../../../data-types/tournament-data-types";
import { useDispatch } from "react-redux";
import { bindActionCreators } from "redux";
import { newTournamentActionCreators } from "../../../state";
import NumberInput from "../../../components/NumberInput";
import { initialState } from "../../../state/reducers/tournamentReducer";
import { Routes } from "../../../utils/routeUtils";
import { useNavigate } from "react-router-dom";
import Button from "../../../components/Button";
import styles from "./TournamentInfoEntry.module.css";
import {Input, Space, Card} from "antd";
import MandatoryAsterisk from "../../../components/MandatoryAsterisk";
import NewTournamentSteps from "../../../components/NewTournamentSteps";

const TournamentInfoView = () => {
	const navigate = useNavigate();
	const [currentInfo, setCurrentInfo] = useState<GeneralInfo>(initialState.info);
	const dispatch = useDispatch();

	const {addGeneralInfo} = bindActionCreators(newTournamentActionCreators, dispatch);

	const onSave = (): void => {
		addGeneralInfo(currentInfo);
		navigate(Routes.PlayerEntry);
	};

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
					<Card title={"Number of rounds"}>
						<NumberInput
							minimum={1}
							value={currentInfo.rounds}
							onChange={(newValue: number): void => setCurrentInfo({...currentInfo, rounds: newValue})}
						/>
					</Card>
					<div className={styles.button}>
						<Button
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