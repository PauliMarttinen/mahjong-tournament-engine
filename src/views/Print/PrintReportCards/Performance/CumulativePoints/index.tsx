import CumulativePointsChart from "../../../../../components/PlayerPerformanceCharts/CumulativePointsChart";

type CumulativePointsProps = {
	playerId: number
};

const CumulativePoints = (props: CumulativePointsProps) => {
	return (
		<div>
			<h3>Cumulative points</h3>
			<CumulativePointsChart
				playerId={props.playerId}
			/>
		</div>
	);
};

export default CumulativePoints;