import { useState } from "react";
import StandingsDisplay from "../../../components/Standings";
import { generateArray } from "../../../utils/generateArray";
import { Game, Tournament } from "../../../data-types/tournament-data-types";
import {Button, Switch, Space} from "antd";
import {ExportOutlined} from "@ant-design/icons";
import useTournament from "../../../utils/hooks/useTournament";
import { Routes } from "../../../utils/routeUtils";
import LayoutHeader from "../../../components/LayoutHeader";
import LayoutContent from "../../../components/LayoutContent";
import RoundSelector from "../../../components/RoundSelector";
import styles from "./Standings.module.css";

const Standings = () => {
	const getLastFinishedRound = (tournament: Tournament): number => {
		const getGamesOfRound = (roundId: number) => tournament.games.filter((game: Game) => game.round === roundId);
		const isRoundUnfinished = (roundId: number) => getGamesOfRound(roundId).some((game: Game): boolean => !game.finished);

		const rounds = generateArray(tournament.info.rounds);
		const firstUnfinishedRound = rounds.findIndex((roundId: number): boolean => isRoundUnfinished(roundId));

		if (firstUnfinishedRound === 0)
		{
			return 0;
		}

		return (firstUnfinishedRound === -1 ? tournament.info.rounds : firstUnfinishedRound) - 1;    
	};

	const [standingsWindow, setStandingsWindow] = useState<WindowProxy | null>(null);
	const tournament = useTournament();

	const [afterRound, setAfterRound] = useState<number>(getLastFinishedRound(tournament));
	const [plainText, setPlainText] = useState<boolean>(false);

	const openWindow = () => {
		setStandingsWindow(window.open(
			`${Routes.StandingsPopup}?afterRound=${afterRound}&plainText=${plainText.toString()}`,
			"standingsWindow",
			"width=500,height=500"
		));
	};

	return (
		<>
			<LayoutHeader>Standings</LayoutHeader>
			<LayoutContent className={styles.standingsLayout}>
				<RoundSelector
					round={afterRound+1}
					previousDisabled={afterRound === 0}
					onPrevious={() => setAfterRound(afterRound-1)}
					nextDisabled={afterRound === tournament.info.rounds - 1}
					onNext={() => setAfterRound(afterRound+1)}
				/>
				<Space size={30} direction={"vertical"}>
					<Space size={50}>
						<Space>
							<label htmlFor={"plainTextSwitch"}>Table</label>
							<Switch
								id={"plainTextSwitch"}
								checked={plainText}
								onChange={() => setPlainText(!plainText)}
								size={"small"}
							/>
							<label htmlFor={"plainTextSwitch"}>Plain Text</label>
						</Space>
						<Button
							type={"default"}
							icon={<ExportOutlined/>}
							onClick={() => openWindow()}>
							Open in popup
						</Button>
					</Space>
					<StandingsDisplay
						singleColumn={true}
						afterRound={afterRound}
						plainText={plainText}
					/>
				</Space>
			</LayoutContent>
		</>
	);
};

export default Standings;