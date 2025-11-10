/**
 * These are formats for represenging three-dimensional data in a two-dimensional array.
 * 
 * The first word for a format name shows which dimension is represented as rows:
 * - "RoundTable" means rounds are rows and tables are columns.
 * - "TableRound" means tables are rows and rounds are columns.
 * 
 * The second word for a format name shows how seats are oriented:
 * - "Horizontal" means seats are represented horizontally (e.g. seat 0,1,2,3 are in the same row).
 * - "Vertical" means seats are represented vertically (e.g. seat 0,1,2,3 are in the same column).
 * 
 * Thus, RoundTableHorizontal:
 * 
 * | Rounds\Tables | Table 1       | 
 * |---------------|---------------|
 * | Round 1.      | 0, 1, 2, 3    |
 * 
 * TableRoundHorizontal:
 * 
 * | Tables\Rounds | Round 1       |
 * |---------------|---------------|
 * | Table 1.      | 0, 1, 2, 3    |
 * 
 * RoundTableVertical:
 * 
 * | Rounds\Tables | Table 1       |
 * |---------------|---------------| 
 * | Round 1.      | 0             |
 * |               | 1             |
 * |               | 2             |
 * |               | 3             |
 * 
 * TableRoundVertical:
 * 
 * | Tables\Rounds | Round 1       |
 * |---------------|---------------|
 * | Table 1.      | 0             |
 * |               | 1             |
 * |               | 2             |
 * |               | 3             |
 */

export enum Formats {
	RoundTableHorizontal,
	TableRoundHorizontal,
	RoundTableVertical,
	TableRoundVertical
};

type FormatSelectorProps = {
	format: Formats,
	onFormatChange: (format: Formats) => void
};

const FormatSelector = (props: FormatSelectorProps) => {
	const toggleRoundTable = () => {
		switch (props.format) {
			case Formats.RoundTableHorizontal:
				props.onFormatChange(Formats.TableRoundHorizontal);
				break;
			case Formats.TableRoundHorizontal:
				props.onFormatChange(Formats.RoundTableHorizontal);
				break;
			case Formats.RoundTableVertical:
				props.onFormatChange(Formats.TableRoundVertical);
				break;
			case Formats.TableRoundVertical:
				props.onFormatChange(Formats.RoundTableVertical);
				break;
		};
	};

	const toggleSeatOrientation = () => {
		switch (props.format) {
			case Formats.RoundTableHorizontal:
				props.onFormatChange(Formats.RoundTableVertical);
				break;
			case Formats.TableRoundHorizontal:
				props.onFormatChange(Formats.TableRoundVertical);
				break;
			case Formats.RoundTableVertical:
				props.onFormatChange(Formats.RoundTableHorizontal);
				break;
			case Formats.TableRoundVertical:
				props.onFormatChange(Formats.TableRoundHorizontal);
				break;
		};
	};

	return (
		<div>
			<input
				type={"radio"}
				id={"roundTable"}
				name={"roundTableFormat"}
				value={"roundTable"}
				checked={props.format === Formats.RoundTableHorizontal || props.format === Formats.RoundTableVertical}
				onChange={toggleRoundTable}
			/>
			<label htmlFor={"roundTable"}>Rounds as rows, tables as columns</label>
			<input
				type={"radio"}
				id={"tableRound"}
				name={"roundTableFormat"}
				value={"tableRound"}
				checked={props.format === Formats.TableRoundHorizontal || props.format === Formats.TableRoundVertical}
				onChange={toggleRoundTable}
			/>
			<label htmlFor={"tableRound"}>Rounds as columns, tables as rows</label>
			<input
				type={"radio"}
				id={"horizontal"}
				name={"seatFormat"}
				value={"horizontal"}
				checked={props.format === Formats.RoundTableHorizontal || props.format === Formats.TableRoundHorizontal}
				onChange={toggleSeatOrientation}
			/>
			<label htmlFor={"horizontal"}>Seats horizontally</label> 
			<input
				type={"radio"}
				id={"vertical"}
				name={"seatFormat"}
				value={"vertical"}
				checked={props.format === Formats.RoundTableVertical || props.format === Formats.TableRoundVertical}
				onChange={toggleSeatOrientation}
			/>
			<label htmlFor={"vertical"}>Seats vertically</label> 
		</div>
	);	
};

export default FormatSelector;