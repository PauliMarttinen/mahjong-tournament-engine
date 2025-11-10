import { Formats } from "../SeatingTemplateTable/FormatSelector/FormatSelector"

export const determineTemplateFormat = (template: number[][], roundCount: number, playerCount: number): Formats|undefined => {
	//First try to determine template format by the dimensions of the template
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

	//TODO: If dimensions are ambiguous, try to deduce format from player appearances in rounds
	//For now, pick random
	if (playerCount === roundCount)
	{
		//Format is either RTH or TRV
		return Math.random() > 0.5 ? Formats.RoundTableHorizontal : Formats.TableRoundVertical;
	}

	if (playerCount === roundCount * 16)
	{
		//Format is either TRH or RTV
		return Math.random() > 0.5 ? Formats.TableRoundHorizontal : Formats.RoundTableVertical;
	}
	return undefined;
};