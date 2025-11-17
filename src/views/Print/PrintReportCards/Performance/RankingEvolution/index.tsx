import RankingEvolutionChart from "../../../../../components/PlayerPerformanceCharts/RankingEvolutionChart";

type RankingEvolutionProps = {
	playerId: number
};

const RankingEvolution = (props: RankingEvolutionProps) => {
	return (
		<div>
			<h3>Ranking evolution</h3>
			<RankingEvolutionChart
				playerId={props.playerId}
			/>
		</div>
	);
};

export default RankingEvolution;