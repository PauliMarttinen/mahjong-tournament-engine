import GamesChart from "../../../../../components/PlayerPerformanceCharts/GamesChart";

type GamesProps = {
	playerId: number,
};

const Games = (props: GamesProps) => {
	return (
		<div>
			<GamesChart
				playerId={props.playerId}
				anonymize={true}
			/>
		</div>
	);
};

export default Games;