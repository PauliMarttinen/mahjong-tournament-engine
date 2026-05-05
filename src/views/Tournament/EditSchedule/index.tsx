import { useState } from "react";
import LayoutHeader from "../../../components/LayoutHeader";
import LayoutContent from "../../../components/LayoutContent";
import useTournament from "../../../utils/hooks/useTournament";
import { Round } from "../../../data-types/tournament-data-types";
import DateTimePicker from "../../../components/DateTimePicker";
import styles from "./EditSchedule.module.css";
import { Button } from "antd";
import { useDispatch } from "react-redux";
import { bindActionCreators } from "redux";
import { tournamentActionCreators } from "../../../state";

const EditSchedule = () => {
	const tournament = useTournament();
	const [currentRounds, setCurrentRounds] = useState<Round[]>(tournament.info.rounds);

	const dispatch = useDispatch();
	const {editTournamentInfo} = bindActionCreators(tournamentActionCreators, dispatch);

	const setRounds = (newDateTime: string, roundId: number) => {
		setCurrentRounds(currentRounds.map((round: Round, index: number): Round => {
			if (index === roundId) return {
				...round,
				scheduledStart: newDateTime
			};

			return round;
		}))
	};

	const clearRealStart = (roundId: number) => {
		const updatedRounds = currentRounds.map((round: Round, index: number) => {
			if (index === roundId) return {
				...round,
				realStart: ""
			};

			return round;
		});

		editTournamentInfo({
			...tournament.info,
			rounds: updatedRounds
		});
	};

	const saveChanges = (): void => {
		const sortedRounds = [...currentRounds].sort((a, b) => 
			new Date(a.scheduledStart).getTime() - new Date(b.scheduledStart).getTime()
		);

		editTournamentInfo({
			...tournament.info,
			rounds: sortedRounds
		});

		setCurrentRounds(sortedRounds);
	};

	return (
		<>
			<LayoutHeader>Edit schedule</LayoutHeader>
			<LayoutContent className={styles.editSchedule}>
				<table>
					<tbody>
						<th scope={"row"}></th>
						<th scope={"row"}>Scheduled start time</th>
						<th scope={"row"}></th>
						<th scope={"row"}>Actual start time</th>
						<th scope={"row"}></th>
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
									<td>
										{
											round.scheduledStart !== tournament.info.rounds[roundId].scheduledStart
											&&
											"*"
										}
									</td>
									<td>
										{
											round.realStart.replace("T", " ")
										}
									</td>
									<td>
										<Button
											onClick={() => clearRealStart(roundId)}>
											Clear actual
										</Button>
									</td>
								</tr>
							))
						}
					</tbody>
				</table>
				<Button
					type={"primary"}
					onClick={() => saveChanges()}>
					Save changes
				</Button>
			</LayoutContent>
		</>
	);
};

export default EditSchedule;