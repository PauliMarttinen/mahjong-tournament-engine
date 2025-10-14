import { formatPoints } from "../../utils/formatPoints";
import { KeyboardEvent } from "react";
import styles from "./PointInput.module.css";
import onKeyDown from "./utils/onKeyDown";
import { PointInputType } from "../../data-types/tournament-data-types";
import { getNumericValue } from "../../utils/getNumericValue";

type PointInputProps = {
	value: PointInputType,
	onChange: Function,
	unflippable?: boolean,
	tabIndex?: number
	short: boolean,
	uma?: boolean
};

const PointInput = (props: PointInputProps) => {
	const sign = props.value.positive ? "+" : "-";
	const displayValue =
		props.short
		?
		`${sign}${formatPoints({points: Math.abs(getNumericValue(props.value)), sign: false})}`
		:
		`${sign}${Math.abs(getNumericValue(props.value))}`;

	return (
		<div>
			<input
				className={styles.pointInput}
				type={"text"}
				value={displayValue}
				onKeyDown={(e: KeyboardEvent<HTMLInputElement>) => props.onChange(onKeyDown({
					e: e,
					unflippable: props.unflippable,
					short: props.short,
					value: props.value,
					uma: props.uma
				}))}
				onChange={() => {}}
				tabIndex={props.tabIndex}
			/>
		</div>
	);
};

export default PointInput;