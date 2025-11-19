import { generateArray } from "./generateArray";
import type {Tournament, Game} from "../data-types/tournament-data-types";

const saveSeatingFile = (tournament: Tournament) => {
	const filename = `seating-template-${tournament.info.rounds}r-${tournament.playerList.length}p.csv`;

	const emptySeating: number[][] = generateArray(tournament.playerList.length).map((_: number) => []);

	const seating: number[][] = tournament.games.reduce((seatingCarry: number[][], game: Game): number[][] => {
		const round = game.round;
		const firstRow = game.table*4;
		const newCarryValue = [...seatingCarry];
		
		newCarryValue[firstRow][round] = game.participants[0].playerId;
		newCarryValue[firstRow+1][round] = game.participants[1].playerId;
		newCarryValue[firstRow+2][round] = game.participants[2].playerId;
		newCarryValue[firstRow+3][round] = game.participants[3].playerId;

		return newCarryValue;
	}, emptySeating);

	const stringified = seating.map((row: number[]) => row.join(",")).join("\n");
	
	const blob = new Blob([stringified], {type: "text/csv"});
	const href = URL.createObjectURL(blob);
	const a = Object.assign(document.createElement("a"), {
		href,
		style: "display:none",
		download: filename
	});
	document.body.appendChild(a);
	a.click();
	URL.revokeObjectURL(href);
	a.remove();
};

export default saveSeatingFile;