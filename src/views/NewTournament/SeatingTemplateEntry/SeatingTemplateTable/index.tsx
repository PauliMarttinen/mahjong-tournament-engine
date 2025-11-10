import { useState } from "react";
import FormatSelector, { Formats } from "./FormatSelector/FormatSelector"
import TableRoundVerticalTable from "./TableRoundVerticalTable";
import TableRoundHorizontalTable from "./TableRoundHorizontalTable";
import RoundTableVerticalTable from "./RoundTableVerticalTable";
import RoundTableHorizontalTable from "./RoundTableHorizontalTable";
import { SeatingTemplateErrors } from "../utils/seatingTemplateEvaluation";

type SeatingTemplateTableProps = {
	seatingTemplate: number[][],
	/* format: Formats, */
	preview: boolean,
	errors: SeatingTemplateErrors,
}

const SeatingTemplateTable = (props: SeatingTemplateTableProps) => {
	const [selectedFormat, setSelectedFormat] = useState<Formats>(Formats.TableRoundVertical);

	return (
		<div>
			{
				selectedFormat === Formats.TableRoundVertical &&
				<TableRoundVerticalTable
					seatingTemplate={props.seatingTemplate}
					errors={props.errors}
					preview={props.preview}
				/>
			}
			{
				selectedFormat === Formats.TableRoundHorizontal &&
				<TableRoundHorizontalTable
					seatingTemplate={props.seatingTemplate}
					errors={props.errors}
					preview={props.preview}
				/>
			}
			{
				selectedFormat === Formats.RoundTableVertical &&
				<RoundTableVerticalTable
					seatingTemplate={props.seatingTemplate}
					errors={props.errors}
					preview={props.preview}
				/>
			}
			{
				selectedFormat === Formats.RoundTableHorizontal &&
				<RoundTableHorizontalTable
					seatingTemplate={props.seatingTemplate}
					errors={props.errors}
					preview={props.preview}
				/>
			}
			<FormatSelector
				format={selectedFormat}
				onFormatChange={(format: Formats) => setSelectedFormat(format)}
			/>
		</div>
	);
};

export default SeatingTemplateTable;