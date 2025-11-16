import {Button as AntButton} from "antd";
import styles from "./Button.module.css";
import { ReactNode } from "react";

type ButtonProps = {
	className?: string,
	children: ReactNode,
	disabled?: boolean,
	onClick: () => void
	disabledTooltip?: string,
	type?: "default"|"primary"|"dashed"|"link"|"text"
};

const Button = (props: ButtonProps) => {
	const className = `${styles.button} ${props.disabled ? styles.disabled : ""} ${props.className ? props.className : ""}`;
	const onClick = !props.disabled ? props.onClick : () => {};

	return (
		<AntButton
			className={className}
			disabled={props.disabled}
			onClick={onClick}
			title={props.disabledTooltip ? props.disabledTooltip : ""}
			type={props.type}>
			{props.children}
		</AntButton>
	);
};

export default Button;