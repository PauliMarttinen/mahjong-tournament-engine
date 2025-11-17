import {Card} from "antd";
import RankingEvolutionChart from "../../../../../../components/PlayerPerformanceCharts/RankingEvolutionChart";

type RankingEvolutionProps = {
	playerId: number
};

const RankingEvolution = (props: RankingEvolutionProps) => {
	return (
		<Card title={"Ranking evolution"}>
			<RankingEvolutionChart
				playerId={props.playerId}
			/>
		</Card>
	);
};

export default RankingEvolution;