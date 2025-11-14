import CumulativePoints from "./CumulativePoints";
import Games from "./Games";
import Positions from "./Positions";
import RankingEvolution from "./RankingEvolution";
import Statistics from "./Statistics";
import styles from "./Performance.module.css";
import {Space} from "antd";

type PerformanceProps = {
	playerId: number,
	anonymize: boolean
};

const Performance = (props: PerformanceProps) => {
	return (
		<Space className={styles.columns}>
			<Space direction={"vertical"}>
				<RankingEvolution
					playerId={props.playerId}
				/>
				<Positions
					playerId={props.playerId}
				/>
				<CumulativePoints
					playerId={props.playerId}
				/>
				<Statistics
					playerId={props.playerId}
				/>
			</Space>
			<Games
				playerId={props.playerId}
			/>
		</Space>
	);
};

export default Performance;