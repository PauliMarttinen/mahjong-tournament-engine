import { Tournament } from "../data-types/tournament-data-types";

export enum Routes {
	TournamentInfoEntry = "/new/basic",
	PlayerEntry = "/new/players",
	Overview = "/tournament/overview",
	Standings = "/tournament/standings",
	StandingsPopup = "/tournament/standings/popup",
	PrintOuts = "/tournament/print-outs",
	EditPlayers = "/tournament/edit-players",
	FinalResults = "/tournament/final-results",
	FinalResultsPopup = "/tournament/final-results/popup",
	PlayerPerformance = "/tournament/player-performance",
	FullSchedule = "/print/full-schedule",
	PrintPersonalSchedules = "/print/personal-schedules",
	PrintReportCards = "/print/report-cards",
	PrintScoreForms = "/print/score-forms",
};

export type Route = Routes;

export const findRoute = (loaded: Tournament): Route => {
	//If the loaded tournament has names, take the app to tournament page.
	if (loaded.playerList.length > 0)
	{
		return Routes.Overview;
	}

	//If the loaded tournament has no names, take the app to player entry phase.
	if (loaded.playerList.length === 0)
	{
		return Routes.PlayerEntry;
	}

	//Otherwise take the app the tournament info entry view.
	return Routes.TournamentInfoEntry;
};