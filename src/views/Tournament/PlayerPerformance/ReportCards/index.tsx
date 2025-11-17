import { useMemo, useState } from "react";
import PrintableIframe from "../../../../components/PrintableIframe";
import { generateArray } from "../../../../utils/generateArray";
import useTournament from "../../../../utils/hooks/useTournament";
import { Routes } from "../../../../utils/routeUtils";
import alphabetizer from "../../../../utils/alphabetizer";
import { Player } from "../../../../data-types/tournament-data-types";
import {Button, Space, Checkbox} from "antd";

type PlayerOption = {
	playerName: string,
	playerId: number
};

const ReportCards = () => {
	const tournament = useTournament();

	const [playerIds, setPlayerIds] = useState<number[]>([]);

	const playerOptions: PlayerOption[] = useMemo(() => tournament.playerList
		.map((player: Player) => player.name)
		.sort(alphabetizer)
		.map((playerName: string, _: number) => ({
			playerName: playerName,
			playerId: tournament.playerList.findIndex((player: Player) => player.name === playerName)
		})), []);
		
	const togglePlayer = (toggledPlayerId: number) => {
		if (playerIds.some((playerId: number) => playerId === toggledPlayerId))
		{
			setPlayerIds(playerIds.filter((playerId: number) => playerId !== toggledPlayerId));
			return;
		}
		setPlayerIds([...playerIds, toggledPlayerId].sort((a: number, b: number) => a-b));
	};

	return (
		<>
			<Space>
				<Button
					type={"default"}
					onClick={() => setPlayerIds(generateArray(tournament.playerList.length))}>
					Select all
				</Button>
				<Button
					type={"default"}
					onClick={() => setPlayerIds([])}>
					Deselect all
				</Button>
			</Space>
			{
				playerOptions.map((player: PlayerOption) => (
					<div key={`player-${player.playerId}`}>
						<Checkbox
							type={"checkbox"}
							name={"players"}
							id={player.playerId.toString()}
							checked={playerIds.some((playerId: number) => playerId === player.playerId)}
							onChange={(e) => togglePlayer(player.playerId)}>
							{player.playerName}
						</Checkbox>
					</div>
				))
			}
			<PrintableIframe
				label={"Print"}
				id={"reportcards"}
				src={`${Routes.PrintReportCards}?players=${playerIds.join(",")}`}
			/>
		</>
	);
};

export default ReportCards;