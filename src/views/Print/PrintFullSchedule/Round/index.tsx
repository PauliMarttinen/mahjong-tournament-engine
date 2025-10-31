import { Game, Player } from "../../../../data-types/tournament-data-types";
import Games from "./Games";
import styles from "./Round.module.css";

type RoundProps = {
	roundId: number,
	games: Game[],
	playerList: Player[]
};

const Round = (props: RoundProps) => {
	return (
		<table className={styles.roundTable}>
			<thead>
				<tr>
					<th colSpan={5}>
						Round {props.roundId + 1}
					</th>
				</tr>
				<tr>
					<th className={styles.roundColumn} scope={"column"}></th>
					<th className={styles.roundColumn} scope={"column"}>East</th>
					<th className={styles.roundColumn} scope={"column"}>South</th>
					<th className={styles.roundColumn} scope={"column"}>West</th>
					<th className={styles.roundColumn} scope={"column"}>North</th>
				</tr>
			</thead>
			<Games
				games={props.games}
				playerList={props.playerList}
			/>
		</table>
	);
};

export default Round;