import { useState } from "react";
import FormatSelector, { Formats } from "./FormatSelector/FormatSelector"
import TableRoundVerticalTable from "./TableRoundVerticalTable";
import TableRoundHorizontalTable from "./TableRoundHorizontalTable";
import RoundTableVerticalTable from "./RoundTableVerticalTable";
import RoundTableHorizontalTable from "./RoundTableHorizontalTable";

type SeatingTemplateTableProps = {
	preview: boolean,
}

const SeatingTemplateTable = (props: SeatingTemplateTableProps) => {
	const [selectedFormat, setSelectedFormat] = useState<Formats>(Formats.TableRoundVertical);

	return (
		<div>
			{
				selectedFormat === Formats.TableRoundVertical &&
				<TableRoundVerticalTable
					preview={props.preview}
				/>
			}
			{
				selectedFormat === Formats.TableRoundHorizontal &&
				<TableRoundHorizontalTable
					preview={props.preview}
				/>
			}
			{
				selectedFormat === Formats.RoundTableVertical &&
				<RoundTableVerticalTable
					preview={props.preview}
				/>
			}
			{
				selectedFormat === Formats.RoundTableHorizontal &&
				<RoundTableHorizontalTable
					preview={props.preview}
				/>
			}
			{/* <FormatSelector
				format={selectedFormat}
				onFormatChange={(format: Formats) => setSelectedFormat(format)}
			/> */}
		</div>
	);
};

export default SeatingTemplateTable;