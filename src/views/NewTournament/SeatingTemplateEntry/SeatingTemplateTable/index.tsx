import { Formats } from "../FormatSelector/FormatSelector"
import TableRoundVerticalTable from "./TableRoundVerticalTable";
import TableRoundHorizontalTable from "./TableRoundHorizontalTable";
import RoundTableVerticalTable from "./RoundTableVerticalTable";
import RoundTableHorizontalTable from "./RoundTableHorizontalTable";
import { SeatingTemplateErrors } from "../utils/seatingTemplateEvaluation";

type SeatingTemplateTableProps = {
	seatingTemplate: number[][],
	format: Formats,
	preview: boolean,
	errors: SeatingTemplateErrors,
}

const SeatingTemplateTable = (props: SeatingTemplateTableProps) => {
	return (
		<div>
			{
				props.format === Formats.TableRoundVertical &&
				<TableRoundVerticalTable
					seatingTemplate={props.seatingTemplate}
					errors={props.errors}
					preview={props.preview}
				/>
			}
			{
				props.format === Formats.TableRoundHorizontal &&
				<TableRoundHorizontalTable
					seatingTemplate={props.seatingTemplate}
					errors={props.errors}
					preview={props.preview}
				/>
			}
			{
				props.format === Formats.RoundTableVertical &&
				<RoundTableVerticalTable
					seatingTemplate={props.seatingTemplate}
					errors={props.errors}
					preview={props.preview}
				/>
			}
			{
				props.format === Formats.RoundTableHorizontal &&
				<RoundTableHorizontalTable
					seatingTemplate={props.seatingTemplate}
					errors={props.errors}
					preview={props.preview}
				/>
			}
		</div>
	);
};

export default SeatingTemplateTable;