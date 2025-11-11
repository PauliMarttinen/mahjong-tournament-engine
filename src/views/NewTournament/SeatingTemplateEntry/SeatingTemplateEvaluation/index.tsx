import { useState } from "react";
import { evaluateMeetingBalance, evaluateSeatingBalance, findErrors } from "../utils/seatingTemplateEvaluation";
import Button from "../../../../components/Button";
import Popup from "../../../../components/Popup";
import useNewTournament from "../../../../utils/hooks/useNewTournament";
import { SeatingTemplateErrors } from "../../../../data-types/new-tournament-data-types";

type SeatingTemplateEvaluationsProps = {
	/* template: number[][],
	errors: SeatingTemplateErrors, */
};

const SeatingTemplateEvaluations = (props: SeatingTemplateEvaluationsProps) => {
	const newTournament = useNewTournament();
	const template = newTournament.seatingTemplateHistory[newTournament.currentSeatingTemplateIndex].template;
	const errors = newTournament.seatingTemplateErrors;

	const [showSeatingBalanceInfo, setShowSeatingBalanceInfo] = useState(false);
	const [showMeetingBalanceInfo, setShowMeetingBalanceInfo] = useState(false);

	return (
		<>
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
			<h2>Seating evaluations</h2>
			<table>
				<tbody>
					<tr>
						<td>Seating Balance Score</td>
						<td>{evaluateSeatingBalance(template).toFixed(2)}/100.00</td>
						<td>
							<Button
								label={"?"}
								onClick={() => setShowSeatingBalanceInfo(true)}
							/>
						</td>
					</tr>
					<tr>
						<td>Meeting Balance Score</td>
						<td>{evaluateMeetingBalance(template).toFixed(2)}/100.00</td>
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
		</>
	);
};

export default SeatingTemplateEvaluations;