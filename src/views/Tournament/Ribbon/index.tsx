import { Routes } from "../../../utils/routeUtils";
import { Link } from "react-router-dom";
import styles from "./Ribbon.module.css";
import download from "../../../utils/download";
import useTournament from "../../../utils/hooks/useTournament";

const Ribbon = () => {
	const tournament = useTournament();

	return (
		<div className={styles.ribbon}>
			<div className={styles.ribbonItem}>
				<Link className={styles.link} to={Routes.Overview}>Overview</Link>
			</div>
			<div className={styles.ribbonItem}>
				<Link className={styles.link} to={Routes.HanchanResults}>Hanchan results</Link>
			</div>
			<div className={styles.ribbonItem}>
				<Link className={styles.link} to={Routes.Standings}>Standings</Link>
			</div>
			<div className={styles.ribbonItem}>
				<Link className={styles.link} to={Routes.EditPlayers}>Edit players</Link>
			</div>
			<div className={styles.ribbonItem}>
				<Link className={styles.link} to={Routes.PrintOuts}>Print-outs</Link>
			</div>
			<div className={styles.ribbonItem}>
				<Link className={styles.link} to={Routes.FinalResults}>Final results</Link>
			</div>
			<div className={styles.ribbonItem}>
				<Link className={styles.link} to={Routes.PlayerPerformance}>Player performance</Link>
			</div>
			<div className={styles.ribbonItem}>
				<span className={styles.link} onClick={() => download(tournament)}>Download file</span>
			</div>
		</div>
	);
};

export default Ribbon;