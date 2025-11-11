import { DuplicatePlayerSeating, MissingPlayer, PlayerIdOutsideRange, SeatingTemplateErrors } from "../../../../data-types/new-tournament-data-types";
import { generateArray } from "../../../../utils/generateArray";

/**
 * findErrors finds duplicate players, missing players and player IDs that are outside of the expected range.
 */
export const findErrors = (template: number[][]): SeatingTemplateErrors => {
	const playerCount = template.length;
	const duplicates: DuplicatePlayerSeating[] = [];
	const missing: MissingPlayer[] = [];
	const outsideRange: PlayerIdOutsideRange[] = [];

	generateArray(template[0].length).forEach((roundId: number) => {
		const playersInRound: number[] = template.map((_: number[], rowIndex: number) => {
			if (template[rowIndex][roundId] < 0 || template[rowIndex][roundId] >= playerCount) {
				outsideRange.push({
					roundId,
					tableId: Math.floor(rowIndex / 4),
					playerId: template[rowIndex][roundId],
				});
			}
			return template[rowIndex][roundId];
		});

		generateArray(playerCount)
			.forEach((playerId: number, seatId: number) => {
			const thisPlayerInRound = playersInRound.filter((pid) => pid === playerId);
			if (thisPlayerInRound.length > 1) {
				// Find all seats where this player is seated in this round
				playersInRound.forEach((pid, seatIdx) => {
					if (pid === playerId && seatIdx !== seatId) {
						duplicates.push({
							roundId,
							playerId
						});
					}
				});
			}
			if (thisPlayerInRound.length === 0) {
				missing.push({
					playerId,
					roundId,
				});
			}
		});
	});

	return {
		duplicates,
		missing,
		outsideRange
	};
};

/**
 * evaluateSeatingBalance gives a score indicating how balanced the seating is on the scale of 0-100 where 100 is perfect.
 * 
 * Perfect balance means that each player has an equal distribution of seats (East, South, West, North) across all rounds.
 * 
 * Perfect balance may be impossible to achieve depending on the number of players and rounds.
 */
export const evaluateSeatingBalance = (template: number[][]): number => {
	const seatValues = [1000, 10, 100, 1];
	const playerCount = template.length;
	const roundCount = template[0].length;
	const perfectSeatingScore = (roundCount / 4) * seatValues.reduce((a, b) => a + b, 0);

	const seatSums: number[] = generateArray(playerCount).map(() => 0);
	template.forEach((row: number[], rowIndex: number) => {
		row.forEach((playerId: number) => {
			seatSums[playerId] += seatValues[rowIndex%4];
		});
	});
	
	const seatSumPerfection: number[] = seatSums.map((sum: number) => Math.abs(perfectSeatingScore - sum));
	const totalImbalance = seatSumPerfection.reduce((a, b) => a + b, 0);

	// Normalize the score to a range between 0 and 1
	const maxPossibleImbalance = playerCount * perfectSeatingScore;
	const normalizedScore = totalImbalance / maxPossibleImbalance;

	// Scale to 0-100
	return 100-(normalizedScore * 100);
}

/**
 * evaluateMeetingBalance gives a score indicating how balanced the player meetings are on the scale of 0-100 where 100 is perfect.
 * 
 * Perfect balance means that each player meets every other player an equal number of times across all rounds.
 * 
 * Perfect balance may be impossible to achieve depending on the number of players and rounds.
 */
export const evaluateMeetingBalance = (template: number[][]): number => {
	const playerCount = template.length;
	const roundCount = template[0].length;

	// Create a meeting matrix to count meetings between players
	const meetingMatrix: number[][] = generateArray(playerCount).map(() => generateArray(playerCount).map(() => 0));

	// Populate the meeting matrix
	template.forEach((row: number[], index: number) => {
		if (index % 4 !== 0) return; // Process only East seats to avoid double counting
		row.forEach((eastPlayerId: number, roundId: number) => {
			const southPlayerId = template[index + 1][roundId];
			const westPlayerId = template[index + 2][roundId];
			const northPlayerId = template[index + 3][roundId];
		
			//Skip invalid player IDs
			if (southPlayerId >= playerCount || westPlayerId >= playerCount || northPlayerId >= playerCount) {
				return;
			}
			if (southPlayerId < 0 || westPlayerId < 0 || northPlayerId < 0) {
				return;
			}

			// Increment meetings for all combinations at the table

			meetingMatrix[eastPlayerId][southPlayerId] += 1;
			meetingMatrix[eastPlayerId][westPlayerId] += 1;
			meetingMatrix[eastPlayerId][northPlayerId] += 1;

			meetingMatrix[southPlayerId][eastPlayerId] += 1;
			meetingMatrix[southPlayerId][westPlayerId] += 1;
			meetingMatrix[southPlayerId][northPlayerId] += 1;

			meetingMatrix[westPlayerId][eastPlayerId] += 1;
			meetingMatrix[westPlayerId][southPlayerId] += 1;
			meetingMatrix[westPlayerId][northPlayerId] += 1;

			meetingMatrix[northPlayerId][eastPlayerId] += 1;
			meetingMatrix[northPlayerId][southPlayerId] += 1;
			meetingMatrix[northPlayerId][westPlayerId] += 1;
		});
	});

	// Calculate the ideal number of meetings
	const idealMeetings = (roundCount * 4) / (playerCount - 1);

	// Calculate the total deviation from the ideal meetings
	const totalDeviation = meetingMatrix.reduce((total, row, y) => {
		return total + row.reduce((rowTotal, meetings, x) => {
			if (y !== x) {
				return rowTotal + Math.abs(meetings - idealMeetings);
			}
			return rowTotal;
		}, 0);
	}, 0);

	// Normalize the score to a range between 0 and 1
	const maxPossibleDeviation = playerCount * (playerCount - 1) * idealMeetings;
	const normalizedScore = totalDeviation / maxPossibleDeviation;

	// Scale to 0-100
	return 100 - (normalizedScore * 100);
}