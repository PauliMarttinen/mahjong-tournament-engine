import type { Tournament } from "../data-types/tournament-data-types";

const saveTournamentFile = (tournament: Tournament) => {  
	const tournamentTitle = tournament.info.title;

	const blob = new Blob([JSON.stringify(tournament)], {type: "application/json"});
	const href = URL.createObjectURL(blob);
	const a = Object.assign(document.createElement("a"), {
		href,
		style: "display:none",
		download: `${tournamentTitle}.json`
	});
	document.body.appendChild(a);
	a.click();
	URL.revokeObjectURL(href);
	a.remove();
}

export default saveTournamentFile;