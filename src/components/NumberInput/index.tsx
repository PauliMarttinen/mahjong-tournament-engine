import { Button, InputNumber } from "antd";
import styles from "./NumberInput.module.css";

type NumberInputProps = {
	className?: string
	minimum?: number,
	maximum?: number,
	value: number,
	onChange: (newValue: number) => void,
	disabled?: boolean,
	increment?: number
};

const NumberInput = (props: NumberInputProps) => {
	const className = `${styles.NumberInput} ${props.className ? props.className : ""}`;
	const increment = props.increment ? Math.abs(props.increment) : 1;

	const directChange = (newValue: number|null) => {
		if (newValue === null) return;

		props.onChange(newValue);
	};

	const nextDownWouldBeTooLittle = props.minimum ? props.value-increment < props.minimum : false
	const minusDisabled = props.disabled || nextDownWouldBeTooLittle;

	const nextUpWouldBeTooHigh = props.maximum ? props.value+increment > props.maximum : false;
	const plusDisabled = props.disabled || nextUpWouldBeTooHigh;

	return (
		<div className={className}>
			<Button
				type={"default"}
				disabled={minusDisabled}
				onClick={() => props.onChange(props.value - increment)}>
				-{increment}
			</Button>
			<InputNumber
				className={styles.input}
				value={props.value}
				controls={false}
				onChange={directChange}
			/>
			<Button
				type={"default"}
				disabled={plusDisabled}
				onClick={() => props.onChange(props.value + increment)}>
				+{increment}
			</Button>
		</div>
	);
};

export default NumberInput;