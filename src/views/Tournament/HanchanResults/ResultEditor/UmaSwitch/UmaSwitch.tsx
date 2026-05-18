import { Space, Switch } from "antd";
import styles from "./UmaSwitch.module.css";

type UmaSwitchProps = {
	automaticUma: boolean,
	tournamentAutomaticUma: boolean,
	tableId: number,
	onClick: (newState: boolean) => void
};

const UmaSwitch = (props: UmaSwitchProps) => {
	return (
		<Space className={styles.umaSwitch}>
			<label htmlFor={`autoUmaSwitch-${props.tableId}`}>Automatic uma</label>
			<Switch
				checked={!props.automaticUma}
				onChange={() => props.onClick(!props.automaticUma)}
				size={"small"}
				id={`autoUmaSwitch-${props.tableId}`}
				disabled={!props.tournamentAutomaticUma}
			/>
			<label htmlFor={`autoUmaSwitch-${props.tableId}`}>Manual uma</label>
		</Space>
	);
};

export default UmaSwitch;