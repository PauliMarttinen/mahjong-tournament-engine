import { formatPoints } from "../../utils/formatPoints";
import type { KeyboardEvent } from "react";
import onKeyDown from "./utils/onKeyDown";
import type { PointInputType } from "../../data-types/tournament-data-types";
import { getNumericValue } from "../../utils/getNumericValue";
import { Input } from "antd";

type PointInputProps = {
	value: PointInputType,
	onChange: Function,
	unflippable?: boolean,
	tabIndex?: number
	short: boolean,
	uma?: boolean,
	disabled?: boolean,
	className?: string
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
			<Input
				className={props.className}
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
				disabled={props.disabled}
			/>
		</div>
	);
};

export default PointInput;