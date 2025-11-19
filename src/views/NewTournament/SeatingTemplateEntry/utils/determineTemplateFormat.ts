import { Formats } from "../SeatingTemplateTable/FormatSelector/FormatSelector"
import { generateArray } from "../../../../utils/generateArray";
import {RTHtoTRV, TRHtoTRV, RTVtoTRV} from "../../../../utils/convertTemplate";

const countDuplicates = (template: number[][]): number => {
	const playerCount = template.length;
	const roundCount = template.length;

	const duplicateCount = generateArray(roundCount).reduce((duplicatesCarry: number, roundId: number): number => {
		const playersInRound: number[] = template.map((_: number[], row: number) => template[row][roundId]);

		const duplicateCountThisRound = generateArray(playerCount).reduce((duplicatesThisRoundCarry: number, playerId: number): number => {
			const thisPlayerInRound = playersInRound.filter((currentPlayerId) => currentPlayerId === playerId);
            if (thisPlayerInRound.length <= 1) return duplicatesThisRoundCarry;
			return duplicatesThisRoundCarry + thisPlayerInRound.length;
		}, 0);

		return duplicatesCarry + duplicateCountThisRound;
	}, 0);

	return duplicateCount;
};

export const determineTemplateFormat = (template: number[][], roundCount: number, playerCount: number): Formats|undefined => {
	//First we deal with ambiguous dimensions.
	//Ambiguous dimensions are resolved through player appearances in rounds. The format that
	//has fewer errors in terms of player appearances in rounds is picked.
	if (playerCount === roundCount)
	{
		//Format is either RTH or TRV.
		const duplicateCountTRV = countDuplicates(template);
		const duplicateCountRTH = countDuplicates(RTHtoTRV(template, roundCount, playerCount));

		if (duplicateCountRTH > duplicateCountTRV)
			return Formats.TableRoundVertical;
			
		if (duplicateCountRTH < duplicateCountTRV)
			return Formats.RoundTableHorizontal;

		return Math.random() > 0.5 ? Formats.RoundTableHorizontal : Formats.TableRoundVertical;
	}

	if (playerCount === roundCount * 16)
	{
		//Format is either TRH or RTV
		const duplicateCountTRH = countDuplicates(TRHtoTRV(template, roundCount, playerCount));
		const duplicateCountRTV = countDuplicates(RTVtoTRV(template, roundCount, playerCount));

		if (duplicateCountRTV > duplicateCountTRH)
			return Formats.TableRoundHorizontal;

		if (duplicateCountRTV < duplicateCountTRH)
				return Formats.RoundTableVertical;

		return Math.random() > 0.5 ? Formats.TableRoundHorizontal : Formats.RoundTableVertical;
	}

	//Then try to determine template format by the dimensions of the template
	const tableCount = playerCount / 4;

	//Recognize Round Table Horizontal
	if (template.length === roundCount && template[0].length === playerCount)
		return Formats.RoundTableHorizontal;

	//Recognize Table Round Horizontal
	if (template.length === tableCount && template[0].length === roundCount*4)
		return Formats.TableRoundHorizontal;

	//Recognize Round Table Vertical
	if (template.length === roundCount*4 && template[0].length === tableCount)
		return Formats.RoundTableVertical;

	//Recognize Table Round Vertical
	if (template.length === playerCount && template[0].length === roundCount)
		return Formats.TableRoundVertical;

	return undefined;
};