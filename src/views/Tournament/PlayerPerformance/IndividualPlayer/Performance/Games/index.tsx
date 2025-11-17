import GamesChart from "../../../../../../components/PlayerPerformanceCharts/GamesChart";
import {Card} from "antd";

type GamesProps = {
	playerId: number
};

const Games = (props: GamesProps) => {
	return (
		<Card>
			<GamesChart
				playerId={props.playerId}
				anonymize={false}
			/>
		</Card>
	);
};

export default Games;