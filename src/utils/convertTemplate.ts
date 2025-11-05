import { Row, Cell } from "read-excel-file/types";
import { determineTemplateFormat } from "../views/NewTournament/SeatingTemplateEntry/utils/determineTemplateFormat";
import { Formats } from "../views/NewTournament/SeatingTemplateEntry/FormatSelector/FormatSelector";
import { generateArray } from "./generateArray";

export const convertTemplate = (template: Row[], roundCount: number, playerCount: number): number[][] => {
	//Convert the excel rows into a number matrix, filtering out empty rows and non-integer cells
	const raw = template.reduce((finalRows: number[][], currentRow: Row): number[][] => {
		if (currentRow.some((cell: Cell) => Number.isInteger(cell)))
		{
			return [
				...finalRows,
				currentRow.reduce((finalRow: number[], cell: Cell): number[] => Number.isInteger(cell) ? [...finalRow, +cell] : finalRow, [])
			];
		}
		return finalRows;
	}, []);

	//See if we need to minus one every cell.
	const minValue = Math.min(...raw.flat());
	const seatingTemplate = minValue === 1
		?
		raw.map((row: number[]): number[] => row.map((cell: number): number => cell - 1))
		:
		raw;

	//Check the format of the template
	const format = determineTemplateFormat(seatingTemplate, roundCount, playerCount);
	if (format === undefined)
		throw new Error("Could not determine seating template format.");

	if (format === Formats.RoundTableHorizontal)
	{
		//Convert from Round Table Horizontal to Table Round Vertical
		return generateArray(playerCount)
			.map((TRVrow: number) => generateArray(roundCount).map((TRVcolumn: number) => {
				const RTHrow = TRVcolumn;
				const RTHcolumn = TRVrow;
				return seatingTemplate[RTHrow][RTHcolumn];
			}));
	}

	if (format === Formats.TableRoundHorizontal)
	{
		//Convert from Table Round Horizontal to Table Round Vertical
		return generateArray(playerCount)
			.map((TRVrow: number) => generateArray(roundCount).map((TRVcolumn: number) => {
				const TRHrow = Math.floor(TRVrow / 4);
				const TRHcolumn = TRVcolumn * 4 + (TRVrow % 4);
				return seatingTemplate[TRHrow][TRHcolumn];
			}));
	}

	if (format === Formats.RoundTableVertical)
	{
		//Convert from Round Table Vertical to Table Round Vertical
		return generateArray(playerCount)
			.map((TRVrow: number) => generateArray(roundCount).map((TRVcolumn: number) => {
				const RTVrow = TRVcolumn * 4 + (TRVrow % 4);
				const RTVcolumn = Math.floor(TRVrow / 4);
				return seatingTemplate[RTVrow][RTVcolumn];
			}));
	}

	return seatingTemplate;
};