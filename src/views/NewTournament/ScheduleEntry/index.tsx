import { useState } from "react";
import NewTournamentSteps from "../../../components/NewTournamentSteps";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { bindActionCreators } from "redux";
import { newTournamentActionCreators } from "../../../state";
import { Routes } from "../../../utils/routeUtils";
import { useNewTournament } from "../../../utils/hooks/useNewTournament";
import styles from "./ScheduleEntry.module.css";
import { Space, Card, Button } from "antd";
import { type Round } from "../../../data-types/tournament-data-types";
import DateTimePicker from "../../../components/DateTimePicker";

const ScheduleEntry = () => {
	const newTournament = useNewTournament();
	const [currentRounds, setCurrentRounds] = useState<Round[]>(newTournament.info.rounds);

	const dispatch = useDispatch();
	const {addGeneralInfo} = bindActionCreators(newTournamentActionCreators, dispatch);
	const navigate = useNavigate();

	const onSave = (): void => {
		const sortedRounds = [...currentRounds].sort((a, b) => 
			new Date(a.scheduledStart).getTime() - new Date(b.scheduledStart).getTime()
		);

		addGeneralInfo({
			...newTournament.info,
			rounds: sortedRounds
		});
		navigate(Routes.PlayerEntry);
	};

	const setRounds = (newDateTime: string, roundId: number) => {
		setCurrentRounds(currentRounds.map((round: Round, index: number): Round => {
			if (index === roundId) return {
				...round,
				scheduledStart: newDateTime
			};

			return round;
		}));
	};

	return (
		<>
			<NewTournamentSteps key={"newTournamentSteps"} current={1}/>
			<div className={styles.scheduleEntry}>
				<Space direction={"vertical"}>
					<Card title={"Schedule"}>
						<table>
							<tbody>
								{
									currentRounds.map((round: Round, roundId: number) => (
										<tr key={`round-${roundId}`}>
											<th scope={"row"}>Round {roundId+1}</th>
											<td>
												<DateTimePicker
													key={roundId}
													onChange={(newValue: string) => setRounds(newValue, roundId)}
													value={round.scheduledStart}
												/>
											</td>
										</tr>
									))
								}
							</tbody>
						</table>
					</Card>
					<div className={styles.button}>
						<Button
							type={"primary"}
							onClick={() => onSave()}>
							Next
						</Button>
					</div>
				</Space>
			</div>
		</>
	);
};

export default ScheduleEntry;