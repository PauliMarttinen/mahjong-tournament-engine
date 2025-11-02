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