import { Button, InputNumber } from "antd";
import styles from "./NumberInput.module.css";

type NumberInputProps = {
	className?: string
	minimum?: number,
	maximum?: number,
	value: number,
	onChange: (newValue: number) => void
};

const NumberInput = (props: NumberInputProps) => {
	const className = `${styles.NumberInput} ${props.className ? props.className : ""}`;

	return (
		<div className={className}>
			<Button
				type={"default"}
				disabled={props.minimum ? props.value === props.minimum : false}
				onClick={() => props.onChange(props.value - 1)}>
				-1
			</Button>
			<InputNumber
				className={styles.input}
				value={props.value}
				disabled={true}
			/>
			<Button
				type={"default"}
				disabled={props.maximum ? props.value === props.maximum : false}
				onClick={() => props.onChange(props.value + 1)}>
				+1
			</Button>
		</div>
	);
};

export default NumberInput;