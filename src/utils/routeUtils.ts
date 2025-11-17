import type { Tournament } from "../data-types/tournament-data-types";

export enum Routes {
	TournamentInfoEntry = "/new/basic",
	PlayerEntry = "/new/players",
	SeatingTemplateEntry = "/new/seating-template",
	Overview = "/tournament/overview",
	HanchanResults = "/tournament/hanchan-results",
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
	//If the loaded tournament has games, take the app to overview.
	if (loaded.games.length > 0)
	{
		return Routes.Overview;
	}

	//If the loaded tournament has players but no games, take the app to seating template entry phase page.
	if (loaded.playerList.length > 0)
	{
		return Routes.SeatingTemplateEntry;
	}

	//If the loaded tournament has no players, take the app to player entry phase.
	if (loaded.playerList.length === 0)
	{
		return Routes.PlayerEntry;
	}

	//Otherwise take the app the tournament info entry view.
	return Routes.TournamentInfoEntry;
};