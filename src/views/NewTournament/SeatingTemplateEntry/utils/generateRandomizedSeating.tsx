import { generateArray } from "../../../../utils/generateArray";

export const generateRandomizedSeating = (playerCount: number, rounds: number): number[][] => {
	const seatingTemplate: number[][] = generateArray(playerCount).map(() => generateArray(rounds));
	const playerList = generateArray(playerCount);

	generateArray(rounds).forEach((roundId: number) => {
		const randomizedPlayers = playerList.sort(() => Math.random() - 0.5);
		randomizedPlayers.forEach((playerId: number, index: number) => {
			seatingTemplate[index][roundId] = playerId;
		});
	});
	return seatingTemplate;
};