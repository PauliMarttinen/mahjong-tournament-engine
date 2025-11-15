import {useEffect} from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import useTournament from "./utils/hooks/useTournament";
import useAppState from "./utils/hooks/useAppState";
import TournametInfoEntry from "./views/NewTournament/TournamentInfoEntry";
import PlayerEntry from "./views/NewTournament/PlayerEntry";
import SeatingTemplateEntry from "./views/NewTournament/SeatingTemplateEntry";
import Overview from "./views/Tournament/Overview";
import HanchanResults from "./views/Tournament/HanchanResults";
import Standings from "./views/Tournament/Standings";
import StandingsPopup from "./views/Tournament/Standings/StandingsPopup";
import PrintOuts from "./views/Tournament/PrintOuts";
import Entrance from "./views/Entrance";
import EditPlayers from "./views/Tournament/EditPlayers";
import PrintPersonalSchedules from "./views/Print/PrintPersonalSchedules";
import PrintReportCards from "./views/Print/PrintReportCards";
import PrintScoreForms from "./views/Print/PrintScoreForms";
import PrintFullSchedule from "./views/Print/PrintFullSchedule";
import FinalResults from "./views/Tournament/FinalResults";
import FinalResultsPopup from "./views/Tournament/FinalResults/FinalResultsPopup";
import PlayerPerformance from "./views/Tournament/PlayerPerformance";
import Navigation from "./views/Tournament/Navigation";
import { Layout } from "antd";
import bodyNoMargin from "./utils/bodyNoMargin";
import styles from "./App.module.css";

const App = () => {
	const appState = useAppState();
	const tournament = useTournament();

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
						<Route path={"/tournament/standings/popup"} element={<StandingsPopup/>}/>
						<Route path={"/tournament/final-results/popup"} element={<FinalResultsPopup/>}/>
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
					<Routes>
						<Route index element={<TournametInfoEntry/>}/>
						<Route path={"/new"}>
							<Route index element={<TournametInfoEntry/>}/>
							<Route path={"basic"} element={<TournametInfoEntry/>}/>
							<Route path={"players"} element={<PlayerEntry/>}/>
							<Route path={"seating-template"} element={<SeatingTemplateEntry/>}/>
						</Route>
					</Routes>
				</BrowserRouter>
			</div>
		);
	}

	return (
		<div className={"mahjongTournamentEngine"}>
			<BrowserRouter>
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
									<Route path={"print-outs"} element={<PrintOuts/>}/>
									<Route path={"edit-players"} element={<EditPlayers/>}/>
									<Route path={"final-results"} element={<FinalResults/>}/>
									<Route path={"player-performance"} element={<PlayerPerformance/>}/>
								</Route>
							</Routes>
						<Layout.Footer>Mahjong Tournament Engine</Layout.Footer>
					</Layout>
				</Layout>
			</BrowserRouter>
		</div>
	);
};

export default App;