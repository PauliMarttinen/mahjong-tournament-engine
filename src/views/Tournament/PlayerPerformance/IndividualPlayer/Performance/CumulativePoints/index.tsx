import CumulativePointsChart from "../../../../../../components/PlayerPerformanceCharts/CumulativePointsChart";
import {Card} from "antd";

type CumulativePointsProps = {
	playerId: number
};

const CumulativePoints = (props: CumulativePointsProps) => {
	return (
		<Card title={"Cumulative points"}>
			<CumulativePointsChart
				playerId={props.playerId}
			/>
		</Card>
	);
};

export default CumulativePoints;