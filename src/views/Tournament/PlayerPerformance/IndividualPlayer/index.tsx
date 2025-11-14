import { useMemo, useState } from "react";
import {Menu, Space} from "antd";
import type {MenuProps} from "antd";
import {MenuInfo} from "rc-menu/lib/interface";
import useTournament from "../../../../utils/hooks/useTournament";
import alphabetizer from "../../../../utils/alphabetizer";
import Performance from "./Performance";
import styles from "./IndividualPlayer.module.css";
import { Player } from "../../../../data-types/tournament-data-types";

type MenuItem = Required<MenuProps>["items"][number];

const IndividualPlayer = () => {
	const tournament = useTournament();
	const [selectedPlayer, setSelectedPlayer] = useState<number>(0);

	const playerOptions: MenuItem[] = useMemo(() => tournament.playerList
		.map((player: Player) => player.name)
		.sort(alphabetizer)
		.map((playerName: string) => ({
			label: playerName,
			key: tournament.playerList.findIndex((player: Player) => player.name === playerName)
		})), []);

	const onClick = (e: MenuInfo) => {
		setSelectedPlayer(parseInt(e.key));
	};

	return (
		<Space
			className={styles.individualPlayer}
			size={25}>
			<Menu
				items={playerOptions}
				onClick={onClick}
			/>
			<Performance
				anonymize={false}
				playerId={selectedPlayer}
			/>
		</Space>
	);
};

export default IndividualPlayer;