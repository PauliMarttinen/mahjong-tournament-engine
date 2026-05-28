import StandingsDisplay from "../../../../../components/Standings";
import styles from "./Standings.module.css";
import { useParams } from "react-router-dom";
import { simplifyTime } from "../../../../../utils/simplifyTime";
import { useTournament } from "../../../../../utils/hooks/useTournament";
import { Routes } from "../../../../../utils/routeUtils";

const Standings = () => {
	const {roundId} = useParams();
	const tournament = useTournament();

	if (!roundId)
	{
		throw new Error(`Missing parameter 'roundId' from URL: ${Routes.BigScreenStandings}`);
	}

	if (isNaN(parseInt(roundId)))
	{
		throw new Error(`Parameter 'roundId' must be an integer in URL: ${Routes.BigScreenStandings}`);
	}

	const roundIdNumber = Number(roundId);

	return (
		<div>
			<header className={styles.header}>Standings after round {roundIdNumber+1}</header>
			<div className={styles.standingsPopup}>
				<StandingsDisplay
					afterRound={roundIdNumber}
					plainText={false}
				/>
			</div>
			{
				roundIdNumber < tournament.info.rounds.length - 1 &&
				<footer className={styles.note}>
					Next hanchan starts at {simplifyTime(tournament.info.rounds[roundIdNumber+1].scheduledStart)}
				</footer>
			}
		</div>
	);
};

export default Standings;