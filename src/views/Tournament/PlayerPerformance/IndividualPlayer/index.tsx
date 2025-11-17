import { useMemo, useState, useEffect } from "react";
import {Menu, Space} from "antd";
import type {MenuProps} from "antd";
import type {MenuInfo} from "rc-menu/lib/interface";
import useTournament from "../../../../utils/hooks/useTournament";
import alphabetizer from "../../../../utils/alphabetizer";
import Performance from "./Performance";
import styles from "./IndividualPlayer.module.css";
import type { Player } from "../../../../data-types/tournament-data-types";
import PrintableIframe from "../../../../components/PrintableIframe";
import { Routes } from "../../../../utils/routeUtils";

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

	useEffect(() => {
		if (!playerOptions) return;
		if (!playerOptions[0]) return;
		if (!playerOptions[0].key) return;

		setSelectedPlayer(+playerOptions[0].key);
	}, []);

	return (
		<Space
			className={styles.individualPlayer}
			size={25}>
			<Space direction={"vertical"}>
				<PrintableIframe
					className={styles.printExportPdf}
					label={"Print/Export PDF"}
					id={"reportCard"}
					src={`${Routes.PrintReportCards}?players=${selectedPlayer}`}
				/>
				<Menu
					items={playerOptions}
					selectedKeys={[""+selectedPlayer]}
					onClick={onClick}
				/>
			</Space>
			<Performance
				anonymize={false}
				playerId={selectedPlayer}
			/>
		</Space>
	);
};

export default IndividualPlayer;