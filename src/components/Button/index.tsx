import styles from "./Button.module.css";

type ButtonProps = {
	className?: string,
	label: string,
	subLabel?: string,
	disabled?: boolean,
	onClick: () => void
	disabledTooltip?: string,
};

const Button = (props: ButtonProps) => {
	const className = `${styles.button} ${props.disabled ? styles.disabled : ""} ${props.className ? props.className : ""}`;
	const onClick = !props.disabled ? props.onClick : () => {};
	const showSubLabel = props.subLabel && props.subLabel.trim() !== "";

	return (
		<button
			className={className}
			onClick={onClick}
			title={props.disabled && props.disabledTooltip ? props.disabledTooltip : ""}>
			<strong className={styles.mainLabel}>
				{props.label}
			</strong>
			{
				showSubLabel &&
				<small className={styles.subLabel}>
					{props.subLabel}
				</small>
			}
		</button>
	);
}

export default Button;