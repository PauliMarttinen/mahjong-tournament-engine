import { useState } from "react";
import Dropdown, {DropdownItem} from "../../../components/Dropdown";
import StandingsDisplay from "../../../components/Standings";
import { generateArray } from "../../../utils/generateArray";
import { Game, Tournament } from "../../../data-types/tournament-data-types";
import Toggle from "../../../components/Toggle";
import Button from "../../../components/Button";
import useTournament from "../../../utils/hooks/useTournament";
import { Routes } from "../../../utils/routeUtils";
import { Layout } from "antd";
import LayoutHeader from "../../../components/LayoutHeader";

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

	const roundOptions = generateArray(tournament.info.rounds).map((roundId: number): DropdownItem => ({
		value: roundId,
		text: `Round ${roundId + 1}`
	}));

	return (
		<>
			<LayoutHeader>Standings</LayoutHeader>
			<Layout.Content>
				<Toggle
					true={"Plain text"}
					false={"Formatted table"}
					value={plainText}
					onSwitch={() => setPlainText(!plainText)}
				/>
				<Dropdown
					id={"roundSelection"}
					label={"Show standings after round"}
					items={roundOptions}
					value={afterRound}
					onChange={(newValue) => setAfterRound(newValue)}
				/>
				<Button
					label={"Open in popup"}
					onClick={() => openWindow()}
				/>
				<StandingsDisplay
					afterRound={afterRound}
					plainText={plainText}
				/>
			</Layout.Content>
		</>
	);
};

export default Standings;