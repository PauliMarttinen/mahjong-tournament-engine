import { Space, Switch } from "antd";

type SafeSwitchProps = {
	safeMode: boolean,
	tableId: number,
	onClick: (newState: boolean) => void
};

const SafeSwitch = (props: SafeSwitchProps) => {
	return (
		<Space>
			<label htmlFor={`safeSwitch-${props.tableId}`}>Safe mode</label>
			<Switch
				checked={!props.safeMode}
				onChange={() => props.onClick(!props.safeMode)}
				size={"small"}
				id={`safeSwitch-${props.tableId}`}
			/>
			<label htmlFor={`safeSwitch-${props.tableId}`}>Danger mode</label>
		</Space>
	);
};

export default SafeSwitch;