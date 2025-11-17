import { Radio } from "antd";
import styles from "./FormatSelector.module.css";

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
 * 
 * Only the Vertical formats are used in the seating template UI, but the Horizonal formats are
 * also used for custom template format recognition and conversion.
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
	const options = [
		{
			label: "Tables on rows",
			value: Formats.TableRoundVertical
		},
		{
			label: "Rounds on rows",
			value: Formats.RoundTableVertical
		}
	];

	const toggleFormat = () => {
		switch (props.format) {
			case Formats.RoundTableVertical:
				props.onFormatChange(Formats.TableRoundVertical);
				break;
			case Formats.TableRoundVertical:
				props.onFormatChange(Formats.RoundTableVertical);
				break;
		};
	};

	return (
		<Radio.Group
			className={styles.formatSelector}
			options={options}
			onChange={toggleFormat}
			value={props.format}
		/>
	);
};

export default FormatSelector;