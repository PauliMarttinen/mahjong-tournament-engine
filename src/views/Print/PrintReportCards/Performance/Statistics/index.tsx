import StatisticsChart from "../../../../../components/PlayerPerformanceCharts/StatisticsChart";

type StatisticsProps = {
	playerId: number
}

const Statistics = (props: StatisticsProps) => {
	return (
		<div>
			<h3>Statistics</h3>
			<StatisticsChart
				playerId={props.playerId}
			/>
		</div>
	);
};

export default Statistics;