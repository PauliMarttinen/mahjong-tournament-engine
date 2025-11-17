import {Card} from "antd";
import StatisticsChart from "../../../../../../components/PlayerPerformanceCharts/StatisticsChart";

type StatisticsProps = {
	playerId: number
}

const Statistics = (props: StatisticsProps) => {
	return (
		<Card title={"Statistics"}>
			<StatisticsChart
				playerId={props.playerId}
			/>
		</Card>
	);
};

export default Statistics;