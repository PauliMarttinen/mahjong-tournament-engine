import NumberInput from "../../../../components/NumberInput";
import { Card } from "antd";
import { type Round } from "../../../../data-types/tournament-data-types"

type RoundProps = {
	rounds: Round[],
	roundLength: number,
	onChangeRoundCount: (newValue: number) => void,
	onChangeRoundLength: (newValue: number) => void
};

const Rounds = (props: RoundProps) => {
	return (
		<Card title={"Rounds"}>
			<label>Number of rounds</label>
			<NumberInput
				minimum={1}
				value={props.rounds.length}
				onChange={(newValue: number): void => props.onChangeRoundCount(newValue)}
			/>
			<label>Round length (minutes)</label>
			<NumberInput
				minimum={1}
				value={props.roundLength}
				onChange={(newValue: number): void => props.onChangeRoundLength(newValue)}
			/>
		</Card>
	);
};

export default Rounds;