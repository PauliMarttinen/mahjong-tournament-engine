import { Card, Space, Switch } from "antd";

type NamedSwitchProps = {
	named: boolean,
	onChange: (newValue: boolean) => void
};

const NamedSwitch = (props: NamedSwitchProps) => {
	return (
		<Card>
			<Space>
				<Switch
					checked={props.named}
					id={"named"}
					onChange={() => props.onChange(!props.named)}
					size={"small"}
				/>
				<label htmlFor={"named"}>Named players</label>
			</Space>
		</Card>
	);
};

export default NamedSwitch;