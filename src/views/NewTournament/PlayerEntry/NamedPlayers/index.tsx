import { Card, Input, Space, Switch } from "antd";

type NamedPlayersProps = {
	playersCount: number,
	textareaValue: string,
	onChange: (newTextAreValue: string) => void,
	randomize: boolean,
	onSwitch: (mewValue: boolean) => void
};

const NamedPlayers = (props: NamedPlayersProps) => {
	return (
		<>
			<Card>
				<p>Enter players, one per line. Currently {props.playersCount} players.</p>
				<Input.TextArea
					value={props.textareaValue}
					onChange={(e) => props.onChange(e.target.value)}
				/>
			</Card>
			<Card>
				<Space>
					<Switch
						checked={props.randomize}
						id={"randomize"}
						onChange={() => props.onSwitch(!props.randomize)}
						size={"small"}
					/>
					<label htmlFor={"randomize"}>Randomize the order of names.</label>
				</Space>
			</Card>
		</>
	)
};

export default NamedPlayers;