import { useState } from "react";
import { evaluateMeetingBalance, evaluateWindBalance } from "../utils/seatingTemplateEvaluation";
import useNewTournament from "../../../../utils/hooks/useNewTournament";
import {Modal, Alert, Card, Button} from "antd";
import {QuestionCircleOutlined} from "@ant-design/icons";
import styles from "./SeatingTemplateEvaluation.module.css";

const SeatingTemplateEvaluations = () => {
	const newTournament = useNewTournament();
	const template = newTournament.seatingTemplateHistory[newTournament.currentSeatingTemplateIndex].template;
	const errors = newTournament.seatingTemplateErrors;

	const [showWindBalanceInfo, setShowWindBalanceInfo] = useState(false);
	const [showMeetingBalanceInfo, setShowMeetingBalanceInfo] = useState(false);

	return (
		<>
			<Modal
				centered={true}
				open={showWindBalanceInfo}
				title={"Wind Balance Score"}
				footer={[
					<Button type={"primary"} onClick={() => setShowWindBalanceInfo(false)}>Close</Button>
				]}>
				<p>Wind Balance Score measures how perfectly players are seated into the four seat winds over the course of the tournament. The score is on the scale of 0-100 where 100 is perfect balance.</p>
				<p>Perfect balance can be impossible with certain combinations of number of players and number of rounds.</p>
				<Alert
					type={"warning"}
					message={"Note: the algorithm that evaluates the template is experimental and may produce silly numbers."}
				/>
			</Modal>
			<Modal
				centered={true}
				open={showMeetingBalanceInfo}
				title={"Meeting Balance Score"}
				footer={[
					<Button type={"primary"} onClick={() => setShowMeetingBalanceInfo(false)}>Close</Button>
				]}>
				<p>Meeting Balance Score measures how evenly players meet each other over the course of the tournament. The score is on the scale of 0-100 where 100 is perfect balance.</p>
				<p>Perfect balance can be impossible with certain combinations of number of players and number of rounds.</p>
				<Alert
					type={"warning"}
					message={"Note: the algorithm that evaluates the template is experimental and may produce silly numbers."}
				/>
			</Modal>
			<Card title={"Seating evaluations"}>
				<table className={styles.evaluationTable}>
					<tbody>
						<tr>
							<td>Wind Balance Score</td>
							<td>{evaluateWindBalance(template).toFixed(2)}/100.00</td>
							<td>
								<Button
									type={"default"}
									onClick={() => setShowWindBalanceInfo(true)}>
									<QuestionCircleOutlined/>
								</Button>
							</td>
						</tr>
						<tr>
							<td>Meeting Balance Score</td>
							<td>{evaluateMeetingBalance(template).toFixed(2)}/100.00</td>
							<td>
								<Button
									type={"default"}
									onClick={() => setShowMeetingBalanceInfo(true)}>
									<QuestionCircleOutlined/>
								</Button>
							</td>
						</tr>
					</tbody>
				</table>
				{
					errors.missing.length > 0 &&
					<>
						<h3>Missing players in rounds:</h3>
						<ul>
							{errors.missing.map((missingPlayer) => (
								<li key={`missing-player-${missingPlayer.playerId}-round-${missingPlayer.roundId}`}>
									Player {missingPlayer.playerId} is missing from Round {missingPlayer.roundId + 1}
								</li>
							))}
						</ul>
					</>
				}
				{
					errors.outsideRange.length > 0 &&
					<>
						<h3>Player IDs outside valid range (0-{newTournament.playerList.length-1}):</h3>
						<ul>
							{errors.outsideRange.map((outsideRangeEntry, index) => (
								<li key={`outside-range-${index}`}>
									Player ID {outsideRangeEntry.playerId} at Table {outsideRangeEntry.tableId + 1}, Round {outsideRangeEntry.roundId + 1} is outside the valid range
								</li>
							))}
						</ul>
					</>
				}
			</Card>
		</>
	);
};

export default SeatingTemplateEvaluations;