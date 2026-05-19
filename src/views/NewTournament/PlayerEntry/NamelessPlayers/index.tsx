import NumberInput from "../../../../components/NumberInput";
import { Card, Space } from "antd";

type NamelessPlayersProps = {
	value: number,
	onChange: (newValue: number) => void
};

const NamelessPlayers = (props: NamelessPlayersProps) => {
	return (
		<Card>
			<Space direction={"vertical"}>
				<p>In some tournaments, players must be randomized publicly. This option will create the tournament without players having names yet.</p>
				<NumberInput
					value={props.value}
					minimum={4}
					onChange={props.onChange}
					increment={4}
				/>
				<p>Once players have been assigned a number in the draw, you can input their actual names in the "Edit Players" view of the tournament.</p>
			</Space>
		</Card>
	);
};

export default NamelessPlayers;