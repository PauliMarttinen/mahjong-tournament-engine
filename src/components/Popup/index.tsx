import Button from "../Button";
import styles from "./Popup.module.css";

type PopupProps = {
	title: string,
	children: React.ReactNode,
	cancelText: string,
	confirmText: string,
	onCancel: () => void,
	onConfirm: () => void
	cancelHidden?: boolean,
	confirmHidden?: boolean,
	confirmDisabled?: boolean,
	className?: string
}

const Popup = (props: PopupProps) => {
	const showCancel = !props.cancelHidden;
	const showConfirm = !props.confirmHidden;

	return (
		<div className={styles.backdrop}>
			<div className={`${styles.popup} ${props.className ? props.className : ""}`}>
				<div className={styles.title}>
					{props.title}
				</div>
				<div className={styles.content}>
					{props.children}
				</div>
				<div className={styles.buttons}>
					{
						showCancel &&
						<Button
							onClick={() => props.onCancel()}>
							{props.cancelText}
						</Button>
					}
					{
						showConfirm &&
						<Button
							onClick={() => props.onConfirm()}
							disabled={props.confirmDisabled}>
							{props.confirmText}
						</Button>
					}
				</div>
			</div>
		</div>
	);
}

export default Popup;