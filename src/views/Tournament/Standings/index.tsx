import { useState } from "react";
import StandingsDisplay from "../../../components/Standings";
import {Button, Switch, Space} from "antd";
import {ExportOutlined} from "@ant-design/icons";
import useTournament from "../../../utils/hooks/useTournament";
import { Routes } from "../../../utils/routeUtils";
import LayoutHeader from "../../../components/LayoutHeader";
import LayoutContent from "../../../components/LayoutContent";
import RoundSelector from "../../../components/RoundSelector";
import styles from "./Standings.module.css";
import { getLastFinishedRound } from "../../../utils/getLastFinishedRound";

const Standings = () => {
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