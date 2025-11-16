import { Formats } from "./FormatSelector/FormatSelector"
import TableRoundVerticalTable from "./TableRoundVerticalTable";
import RoundTableVerticalTable from "./RoundTableVerticalTable";

type SeatingTemplateTableProps = {
	format: Formats,
	preview: boolean,
}

const SeatingTemplateTable = (props: SeatingTemplateTableProps) => {
	return (
		<div>
			{
				props.format === Formats.TableRoundVertical &&
				<TableRoundVerticalTable
					preview={props.preview}
				/>
			}
			{
				props.format === Formats.RoundTableVertical &&
				<RoundTableVerticalTable
					preview={props.preview}
				/>
			}
		</div>
	);
};

export default SeatingTemplateTable;