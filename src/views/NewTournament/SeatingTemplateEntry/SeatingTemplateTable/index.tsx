import { Card } from "antd";
import { Formats } from "../ViewOptions/FormatSelector"
import TableRoundVerticalTable from "./TableRoundVerticalTable";
import RoundTableVerticalTable from "./RoundTableVerticalTable";

type SeatingTemplateTableProps = {
	format: Formats,
	preview: boolean,
}

const SeatingTemplateTable = (props: SeatingTemplateTableProps) => {
	return (
		<Card>
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
		</Card>
	);
};

export default SeatingTemplateTable;