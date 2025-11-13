import {Button} from "antd";
import styles from "./RoundSelector.module.css";

type RoundSelectorProps = {
	round: number,
	previousDisabled: boolean,
	onPrevious: () => void,
	nextDisabled: boolean,
	onNext: () => void
};

const RoundSelector = (props: RoundSelectorProps) => {
	return (
		<div className={styles.roundSelector}>
			<Button
				type={"text"}
				onClick={props.onPrevious}
				disabled={props.previousDisabled}
				className={styles.roundButton}>
				←
			</Button>
			<div>Round {props.round}</div>
			<Button
				type={"text"}
				onClick={props.onNext}
				disabled={props.nextDisabled}
				className={styles.roundButton}>
				→
			</Button>
		</div>
	);
};

export default RoundSelector;