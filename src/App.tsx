import {useEffect, useState} from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import useTournament from "./utils/hooks/useTournament";
import useAppState from "./utils/hooks/useAppState";
import TournametInfoEntry from "./views/NewTournament/TournamentInfoEntry";
import PlayerEntry from "./views/NewTournament/PlayerEntry";
import SeatingTemplateEntry from "./views/NewTournament/SeatingTemplateEntry";
import Overview from "./views/Tournament/Overview";
import HanchanResults from "./views/Tournament/HanchanResults";
import Standings from "./views/Tournament/Standings";
import BigScreen from "./views/Tournament/BigScreen";
import BigScreenPopup from "./views/Tournament/BigScreen/BigScreenPopup";
import PrintOuts from "./views/Tournament/PrintOuts";
import Entrance from "./views/Entrance";
import EditPlayers from "./views/Tournament/EditPlayers";
import PrintPersonalSchedules from "./views/Print/PrintPersonalSchedules";
import PrintReportCards from "./views/Print/PrintReportCards";
import PrintScoreForms from "./views/Print/PrintScoreForms";
import PrintFullSchedule from "./views/Print/PrintFullSchedule";
import FinalResults from "./views/Tournament/FinalResults";
import PlayerPerformance from "./views/Tournament/PlayerPerformance";
import Navigation from "./views/Tournament/Navigation";
import { Layout, ConfigProvider, theme, Button } from "antd";
import bodyNoMargin from "./utils/bodyNoMargin";
import styles from "./App.module.css";
import Affix from "./components/Affix";

const App = () => {
	const appState = useAppState();
	const tournament = useTournament();
	const [darkmode, setDarkmode] = useState<boolean>(false);

	useEffect(() => {
		bodyNoMargin();
	}, []);

	if (!appState.tournamentLoaded)
	{
		return (
			<div className={"mahjongTournamentEngine"}>
				<BrowserRouter>
					<Routes>
						<Route path={"/print"}>
							<Route path={"personal-schedules"} element={<PrintPersonalSchedules/>}/>
							<Route path={"report-cards"} element={<PrintReportCards/>}/>
							<Route path={"score-forms"} element={<PrintScoreForms/>}/>
							<Route path={"full-schedule"} element={<PrintFullSchedule/>}/>
						</Route>
						<Route path={"/tournament/big-screen/popup"} element={<BigScreenPopup/>}/>
						<Route path={"*"} element={
							<Layout className={styles.layout}>
								<Entrance/>
							</Layout>
						}/>
					</Routes>
				</BrowserRouter>
			</div>
		);
	}

	if (tournament.games.length === 0)
	{
		return (
			<div className={"mahjongTournamentEngine"}>
				<BrowserRouter>
					<Layout className={styles.layout}>
						<Routes>
							<Route index element={<TournametInfoEntry/>}/>
							<Route path={"/new"}>
								<Route index element={<TournametInfoEntry/>}/>
								<Route path={"basic"} element={<TournametInfoEntry/>}/>
								<Route path={"players"} element={<PlayerEntry/>}/>
								<Route path={"seating-template"} element={<SeatingTemplateEntry/>}/>
							</Route>
						</Routes>
					</Layout>
				</BrowserRouter>
			</div>
		);
	}

	return (
		<div className={"mahjongTournamentEngine"}>
			<BrowserRouter>
				<ConfigProvider
					theme={{algorithm: darkmode ? theme.darkAlgorithm : theme.defaultAlgorithm}}>
					<Affix>
						<Button
							type={"default"}
							onClick={() => setDarkmode(!darkmode)}>
							Dark mode {darkmode ? "on" : "off"}
						</Button>
					</Affix>
					<Layout hasSider className={styles.layout}>
						<Layout.Sider collapsible>
							<Navigation/>
						</Layout.Sider>
						<Layout>
							<Routes>
								<Route path={"/tournament"}>
									<Route index element={<Overview/>}/>
									<Route path={"overview"} element={<Overview/>}/>
									<Route path={"hanchan-results"} element={<HanchanResults/>}/>
									<Route path={"standings"} element={<Standings/>}/>
									<Route path={"big-screen"} element={<BigScreen/>}/>
									<Route path={"print-outs"} element={<PrintOuts/>}/>
									<Route path={"edit-players"} element={<EditPlayers/>}/>
									<Route path={"final-results"} element={<FinalResults/>}/>
									<Route path={"player-performance"} element={<PlayerPerformance/>}/>
								</Route>
							</Routes>
						</Layout>
					</Layout>
				</ConfigProvider>
			</BrowserRouter>
		</div>
	);
};

export default App;