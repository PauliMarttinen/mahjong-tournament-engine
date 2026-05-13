import { Button, InputNumber } from "antd";
import styles from "./NumberInput.module.css";

type NumberInputProps = {
	className?: string
	minimum?: number,
	maximum?: number,
	value: number,
	onChange: (newValue: number) => void,
	disabled?: boolean
};

const NumberInput = (props: NumberInputProps) => {
	const className = `${styles.NumberInput} ${props.className ? props.className : ""}`;

	const directChange = (newValue: number|null) => {
		if (newValue === null) return;

		props.onChange(newValue);
	};

	return (
		<div className={className}>
			<Button
				type={"default"}
				disabled={props.disabled || (props.minimum ? props.value === props.minimum : false)}
				onClick={() => props.onChange(props.value - 1)}>
				-1
			</Button>
			<InputNumber
				className={styles.input}
				value={props.value}
				controls={false}
				onChange={directChange}
			/>
			<Button
				type={"default"}
				disabled={props.disabled || (props.maximum ? props.value === props.maximum : false)}
				onClick={() => props.onChange(props.value + 1)}>
				+1
			</Button>
		</div>
	);
};

export default NumberInput;