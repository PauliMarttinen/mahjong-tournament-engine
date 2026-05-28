import { useState } from "react";
import StandingsDisplay from "../../../components/Standings";
import { Button, Switch, Space } from "antd";
import { ExportOutlined } from "@ant-design/icons";
import { useTournament } from "../../../utils/hooks/useTournament";
import { Routes } from "../../../utils/routeUtils";
import LayoutHeader from "../../../components/LayoutHeader";
import LayoutContent from "../../../components/LayoutContent";
import RoundSelector from "../../../components/RoundSelector";
import styles from "./Standings.module.css";
import { getLastFinishedRound } from "../../../utils/getLastFinishedRound";
import { useAppState} from "../../../utils/hooks/useAppState";
import { navigateBigScreen } from "../BigScreen/utils/setBigScreenState";
import { useDispatch } from "react-redux";
import { bindActionCreators } from "redux";
import { appActionCreators } from "../../../state";

const Standings = () => {
	const tournament = useTournament();
	const appState = useAppState();

	const [afterRound, setAfterRound] = useState<number>(Math.max(getLastFinishedRound(tournament), 0));
	const [plainText, setPlainText] = useState<boolean>(false);

	const dispatch = useDispatch();
	const { setBigScreen } = bindActionCreators(appActionCreators, dispatch);

	const openWindow = () => {
		const route = Routes.BigScreenStandings.replace(":roundId", afterRound.toString());

		if (!appState.bigScreen || appState.bigScreen.closed)
		{
			setBigScreen(window.open(
				route,
				"standingsWindow",
				"width=500,height=500"
			));
			return;
		}

		navigateBigScreen(route);
	};

	return (
		<>
			<LayoutHeader>Standings</LayoutHeader>
			<LayoutContent className={styles.standingsLayout}>
				<RoundSelector
					round={afterRound+1}
					previousDisabled={afterRound === 0}
					onPrevious={() => setAfterRound(afterRound-1)}
					nextDisabled={afterRound === tournament.info.rounds.length - 1}
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