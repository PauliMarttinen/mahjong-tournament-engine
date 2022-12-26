import Button from "../Button";
import TextInput from "../TextInput";
import styles from "./NumberInput.module.css";

type NumberInputProps = {
	className?: string,
	label: string,
	value: number,
	onChange: (newValue: number) => void
};

const NumberInput = (props: NumberInputProps) => {
	const className = `${props.className ? props.className : ""}`;

	return (
		<div className={className}>
			<label className={styles.label}>
				{props.label}
			</label>
			<div className={styles.numberInput}>
				<Button
					key={`numberinput-${props.label}-minus}`}
					label={"-1"}
					onClick={() => props.onChange(props.value - 1)}
				/>
				<TextInput
					className={styles.input}
					value={props.value.toString()}
					onChange={(_) => {}}
					disabled={true}
				/>
				<Button
					key={`numberinput-${props.label}-plus`}
					label={"+1"}
					onClick={() => props.onChange(props.value + 1)}
				/>
			</div>
		</div>
	);
};

export default NumberInput;