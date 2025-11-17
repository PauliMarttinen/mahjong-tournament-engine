import type { ChangeEvent } from "react";
import styles from "./TextInput.module.css";

type TextInputProps = {
	className?: string,
	label?: string,
	placeholder?: string,
	value: string,
	onChange: (newValue: string) => void,
	disabled?: boolean
};

const TextInput = (props: TextInputProps) => {
	const className = `${props.className ? props.className : ""} ${props.disabled ? styles.disabled : ""}`;
	const placeholder = props.placeholder ? props.placeholder : "";
	
	return (
		<div className={className}>
			{
				props.label &&
				<label className={styles.label}>{props.label}</label>
			}
			<input
				placeholder={placeholder}
				className={styles.input}
				disabled={props.disabled}
				type={"text"}
				value={props.value}
				onChange={(e: ChangeEvent<HTMLInputElement>) => props.onChange(e.target.value)}
			/>
		</div>
	);
};

export default TextInput;