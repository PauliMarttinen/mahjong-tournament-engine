import styles from "./Welcome.module.css";
import useTournament from "../../../../../utils/hooks/useTournament";

const Welcome = () => {
	const tournament = useTournament();

	return (
		<div>
			<header className={styles.header}>Welcome to {tournament.info.title}</header>
		</div>
	);
};

export default Welcome;