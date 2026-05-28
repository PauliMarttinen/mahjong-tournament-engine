/* import StandingsDisplay from "../../../../../components/Standings";
import styles from "./Standings.module.css";
import { simplifyTime } from "../../../../../utils/simplifyTime";
import { useTournament } from "../../../../../utils/hooks/useTournament";

type StandingsProps = {
	roundId: number
};

const Standings = (props: StandingsProps) => {
	const tournament = useTournament();

	return (
		<div>
			<header className={styles.header}>Standings after round {props.roundId + 1}</header>
			<div className={styles.standingsPopup}>
				<StandingsDisplay
					afterRound={props.roundId}
					plainText={false}
				/>
			</div>
			{
				props.roundId < tournament.info.rounds.length-1 &&
				<footer className={styles.note}>
					Next hanchan starts at {simplifyTime(tournament.info.rounds[props.roundId+1].scheduledStart)}
				</footer>
			}
		</div>
	);
};

export default Standings; */


export const pollo = () => {};