import { formatPoints } from "../../utils/formatPoints";
import { type KeyboardEvent } from "react";
import { onKeyDown } from "./utils/onKeyDown";
import { getNumericValue } from "../../utils/getNumericValue";
import { Input } from "antd";
import { isPositive } from "../../views/Tournament/HanchanResults/ResultEditor/utils/isPositive";

export type PointInputType = {
	positive: boolean,
	value: number
};

export type ForceSigned = "positive"|"negative";

type PointInputProps = {
	value: PointInputType|number,
	onChange: Function,
	forceSigned?: ForceSigned,
	tabIndex?: number
	short: boolean,
	uma?: boolean,
	disabled?: boolean,
	className?: string
};

const PointInput = (props: PointInputProps) => {
	const value: PointInputType =
		typeof props.value === "number"
		?
		{
			positive: isPositive(props.value, props.forceSigned),
			value: Math.abs(props.value)
		}
		:
		props.value;

	const sign = value.positive ? "+" : "-";
	const displayValue =
		props.short
		?
		`${sign}${formatPoints({points: Math.abs(getNumericValue(value)), sign: false})}`
		:
		`${sign}${Math.abs(getNumericValue(value))}`;

	return (
		<div>
			<Input
				className={props.className}
				type={"text"}
				value={displayValue}
				onKeyDown={(e: KeyboardEvent<HTMLInputElement>) => props.onChange(onKeyDown({
					e: e,
					forceSigned: props.forceSigned,
					short: props.short,
					value: value,
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