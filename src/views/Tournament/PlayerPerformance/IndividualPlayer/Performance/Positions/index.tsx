import {Card} from "antd";
import PositionsChart from "../../../../../../components/PlayerPerformanceCharts/PositionsChart";

type PositionsProps = {
	playerId: number
};

const Positions = (props: PositionsProps) => {
	return (
		<Card title={"Positions"}>
			<PositionsChart
				playerId={props.playerId}
			/>
		</Card>
	);
};

export default Positions;