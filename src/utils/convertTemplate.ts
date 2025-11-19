import type { Row, Cell } from "read-excel-file/types";
import { determineTemplateFormat } from "../views/NewTournament/SeatingTemplateEntry/utils/determineTemplateFormat";
import { Formats } from "../views/NewTournament/SeatingTemplateEntry/SeatingTemplateTable/FormatSelector/FormatSelector";
import { generateArray } from "./generateArray";

export const convertTemplateFromExcel = (fileContent: Row[], roundCount: number, playerCount: number): number[][] => {
	const template = fileContent.reduce((finalRows: number[][], currentRow: Row): number[][] => {
		if (currentRow.some((cell: Cell) => Number.isInteger(cell)))
		{
			return [
				...finalRows,
				currentRow.reduce((finalRow: number[], cell: Cell): number[] => Number.isInteger(cell) ? [...finalRow, +cell] : finalRow, [])
			]
		}
		return finalRows;
	}, []);

	return convertTemplate(template, roundCount, playerCount);
};

export const convertTemplateFromCsv = (fileContent: string, roundCount: number, playerCount: number): number[][] => {
	const rows = fileContent.split(/(\n|\n\r|\r|\r\n)/).filter((row: string) => {
		if (row === "") return false;
		if (row === "\n") return false;
		if (row === "\r") return false;
		if (row === "\n\r") return false;
		if (row === "\r\n") return false;

		return true;
	});
	const template = rows.map((row: string) => row.split(",").map((cell: string) => parseInt(cell)));
	return convertTemplate(template, roundCount, playerCount);
};

export const RTHtoTRV = (template: number[][], roundCount: number, playerCount: number) => {
	return generateArray(playerCount)
		.map((TRVrow: number) => generateArray(roundCount).map((TRVcolumn: number) => {
			const RTHrow = TRVcolumn;
			const RTHcolumn = TRVrow;
			return template[RTHrow][RTHcolumn];
		}));
};

export const TRHtoTRV = (template: number[][], roundCount: number, playerCount: number) => {
	return generateArray(playerCount)
		.map((TRVrow: number) => generateArray(roundCount).map((TRVcolumn: number) => {
			const TRHrow = Math.floor(TRVrow / 4);
			const TRHcolumn = TRVcolumn * 4 + (TRVrow % 4);
			return template[TRHrow][TRHcolumn];
		}));
};

export const RTVtoTRV = (template: number[][], roundCount: number, playerCount: number) => {
	return generateArray(playerCount)
		.map((TRVrow: number) => generateArray(roundCount).map((TRVcolumn: number) => {
			const RTVrow = TRVcolumn * 4 + (TRVrow % 4);
			const RTVcolumn = Math.floor(TRVrow / 4);
			return template[RTVrow][RTVcolumn];
		}));
};

export const convertTemplate = (template: number[][], roundCount: number, playerCount: number): number[][] => {
	//See if we need to minus one every cell.
	const minValue = Math.min(...template.flat());
	const seatingTemplate = minValue === 1
		?
		template.map((row: number[]): number[] => row.map((cell: number): number => cell - 1))
		:
		template;

	//Check the format of the template
	const format = determineTemplateFormat(seatingTemplate, roundCount, playerCount);
	if (format === undefined)
		throw new Error("Could not determine seating template format.");

	if (format === Formats.RoundTableHorizontal)
	{
		//Convert from Round Table Horizontal to Table Round Vertical
		return RTHtoTRV(seatingTemplate, roundCount, playerCount);
	}

	if (format === Formats.TableRoundHorizontal)
	{
		//Convert from Table Round Horizontal to Table Round Vertical
		return TRHtoTRV(seatingTemplate, roundCount, playerCount);
	}

	if (format === Formats.RoundTableVertical)
	{
		//Convert from Round Table Vertical to Table Round Vertical
		return RTVtoTRV(seatingTemplate, roundCount, playerCount);
	}

	return seatingTemplate;
};