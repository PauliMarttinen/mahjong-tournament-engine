import { Formats } from "../FormatSelector/FormatSelector"
import TableRoundVerticalTable from "./TableRoundVerticalTable";
import TableRoundHorizontalTable from "./TableRoundHorizontalTable";
import RoundTableVerticalTable from "./RoundTableVerticalTable";
import RoundTableHorizontalTable from "./RoundTableHorizontalTable";

type SeatingTemplateTableProps = {
	seatingTemplate: number[][],
	format: Formats,
	preview: boolean
}

const SeatingTemplateTable = (props: SeatingTemplateTableProps) => {
	return (
		<div>
			{
				props.format === Formats.TableRoundVertical &&
				<TableRoundVerticalTable
					seatingTemplate={props.seatingTemplate}
					preview={props.preview}
				/>
			}
			{
				props.format === Formats.TableRoundHorizontal &&
				<TableRoundHorizontalTable
					seatingTemplate={props.seatingTemplate}
					preview={props.preview}
				/>
			}
			{
				props.format === Formats.RoundTableVertical &&
				<RoundTableVerticalTable
					seatingTemplate={props.seatingTemplate}
					preview={props.preview}
				/>
			}
			{
				props.format === Formats.RoundTableHorizontal &&
				<RoundTableHorizontalTable
					seatingTemplate={props.seatingTemplate}
					preview={props.preview}
				/>
			}
		</div>
	);
};

export default SeatingTemplateTable;