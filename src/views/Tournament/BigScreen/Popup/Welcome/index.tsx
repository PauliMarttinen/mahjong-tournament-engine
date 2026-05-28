import styles from "./Welcome.module.css";
import { useTournament } from "../../../../../utils/hooks/useTournament";
import { simplifyTime } from "../../../../../utils/simplifyTime";

const Welcome = () => {
	const tournament = useTournament();

	return (
		<div>
			<header className={styles.header}>Welcome to {tournament.info.title}</header>
			<main className={styles.note}>
				First hanchan starts at {simplifyTime(tournament.info.rounds[0].scheduledStart)}
			</main>
		</div>
	);
};

export default Welcome;
