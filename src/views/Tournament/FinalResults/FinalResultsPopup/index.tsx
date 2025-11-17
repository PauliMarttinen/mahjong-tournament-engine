import { useEffect, useState } from "react";
import type { Standing } from "../../../../data-types/tournament-data-types";
import Confetti from "react-confetti";
import styles from "./FinalResultsPopup.module.css";
import Name from "./Name";
import { generateArray } from "../../../../utils/generateArray";
import useTournament from "../../../../utils/hooks/useTournament";
import useStandings from "../../../../utils/hooks/useStandings";

const FinalResultsPopup = () => {
	const tournament = useTournament();
	const standings = useStandings()[tournament.info.rounds - 1];

	const [windowSize, setWindowSize] = useState<{width: number, height: number}>({
		width: window.innerWidth,
		height: window.innerHeight
	});
	const [shouldRevealNext, setShouldRevealNext] = useState<boolean>(false);
	const [revealed, setRevealed] = useState<boolean[]>(Array(tournament.playerList.length).fill(false));

	const revealNext = () => {
		const nextToReveal = revealed.lastIndexOf(false);
		const newList = [...revealed];
		newList[nextToReveal] = true;
		setRevealed(newList);
		if (nextToReveal <= 6 && shouldRevealNext)
		{
			setShouldRevealNext(false);
		}
	};

	useEffect(() => {
		if (shouldRevealNext)
		{
			if (revealed.filter((item: boolean): boolean => !item).length > 5)
			{
				setTimeout(revealNext, 50);
				return;
			}
			revealNext();
		}
	}, [shouldRevealNext, revealed]);

	useEffect(() => {
		window.addEventListener("keyup", (e: KeyboardEvent) => {
			if (e.code === "Space")
			{
				setShouldRevealNext(true);
			}
		});
	}, []);

	useEffect(() => {
		setWindowSize({
			width: window.innerWidth,
			height: window.innerHeight
		});
	}, [window.innerWidth, window.innerHeight]);

	const topName = (id: number) => (
		<table>
			<tbody>
				<Name
					key={`standing-${id}`}
					position={id + 1}
					name={tournament.playerList[standings[id].playerId].name}
					points={standings[id].points}
					revealed={revealed[id]}
				/>
			</tbody>
		</table>
	);

	const playerCount = tournament.playerList.length;
	const columnSplitLimit = 16;
	const playersPerColumn = 16;
	const columns = playerCount-5 > columnSplitLimit ? Math.ceil((playerCount - 5)/playersPerColumn) : 1;

	return (
		<div className={styles.backdrop}>
			{
				!revealed.some((item: boolean): boolean => !item) &&
				<Confetti
					width={windowSize.width}
					height={windowSize.height}
					gravity={0.05}
				/>
			}
			<div className={styles.topPlayers}>
				<div className={`${styles.columns} ${styles.gold}`}>
					{topName(0)}
				</div>
				<div className={`${styles.columns} ${styles.silverBronze}`}>
					<div className={styles.silver}>
						{topName(1)}
					</div>
					<div className={styles.bronze}>
						{topName(2)}
					</div>
				</div>
				<div className={`${styles.columns} ${styles.fourthFifth}`}>
					<div className={styles.fourth}>
						{topName(3)}
					</div>
					<div className={styles.fifth}>
						{topName(4)}
					</div>
				</div>
			</div>
			<div className={`${styles.columns} ${styles.bottomPlayers}`}>
				{
					generateArray(columns).map((columnId: number) => (
						<table
							key={`final-results-column-${columnId}`}>
							<tbody>
								{
									standings
										.filter((_: Standing, rank: number ) => columnId*playersPerColumn+5 <= rank && rank < columnId*playersPerColumn+playersPerColumn+5)
										.map((standing: Standing, rank: number) => (
											<Name
												key={`standing-${standing.playerId}`}
												position={columnId*playersPerColumn + rank + 6}
												name={tournament.playerList[standing.playerId].name}
												points={standing.points}
												revealed={revealed[columnId*playersPerColumn + rank + 5]}
											/>
										))
								}
							</tbody>
						</table>
					))
				}
			</div>
		</div>
	);
};

export default FinalResultsPopup;