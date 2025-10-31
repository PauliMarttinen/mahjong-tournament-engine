import Performance from "../../../components/Performance";
import { useSearchParams } from "react-router-dom";
import useTournament from "../../../utils/hooks/useTournament";
import alphabetizer from "../../../utils/alphabetizer";
import styles from "./PrintReportCards.module.css";
import { Player } from "../../../data-types/tournament-data-types";
import bodyNoMargin from "../utils/bodyNoMargin";
import { useEffect } from "react";

const PrintReportCards = () => {
	const tournament = useTournament();

	const [searchParams, setSearchParams] = useSearchParams();

	const playerIdsParam = searchParams.get("players");

	const players: number[] =
		playerIdsParam === null
		?
		[0]
		:
		playerIdsParam
			.split(",")
			.map((playerId: string) => tournament.playerList[+playerId].name)
			.sort(alphabetizer)
			.map((playerName: string) => tournament.playerList.findIndex((player: Player) => player.name === playerName));

	useEffect(() => {
		bodyNoMargin();
	}, []);

	return (
		<div>
			{
				players.map((playerId: number) => (
					<div
						key={`player-performance-${playerId}`}
						className={styles.card}>
						<h1 className={styles.title}>{tournament.info.title}</h1>
						<h2 className={styles.title}>Report card for player {tournament.playerList[playerId].name}</h2>
						<p className={styles.subtitle}>Created with mahjong-tournament-engine 0.1.1 by Pauli Marttinen</p>
						<Performance
							anonymize={true}
							playerId={playerId}
						/>
					</div>
				))
			}
		</div>
	);
};

export default PrintReportCards;