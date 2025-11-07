import { generateArray } from "../../../../utils/generateArray";

/**
 * findDuplicatePlayers finds all seats where a player is duplicated on the same round.
 */
export type DuplicatePlayerSeatings = {
	roundId: number,
	tableId: number,
	seatId: number,
};

export const findDuplicatePlayers = (template: number[][]): DuplicatePlayerSeatings[] => {
	const playerCount = template.length;

	return [];
};

/**
 * findMissingPlayers finds all players who are not seated in a round.
 */
export type MissingPlayers = {
	playerId: number,
	roundId: number,
};

export const findMissingPlayers = (template: number[][]): MissingPlayers[] => {
	const playerCount = template.length;

	return [];
};

/**
 * findPlayerIdsOutsideRange finds player IDs that are outside the expected range.
 */
export type playerIdsOutsideRange = {
	roundId: number,
	tableId: number,
	seatId: number,
}

export const findOverflowingPlayerIds = (template: number[][]): playerIdsOutsideRange[] => {
	const playerCount = template.length;

	return [];
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