import PositionsChart from "../../../../../components/PlayerPerformanceCharts/PositionsChart";

type PositionsProps = {
	playerId: number
};

const Positions = (props: PositionsProps) => {
	return (
		<div>
			<h3>Positions</h3>
			<PositionsChart
				playerId={props.playerId}
			/>
		</div>
	);
};

export default Positions;