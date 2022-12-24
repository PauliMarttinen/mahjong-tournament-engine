import { Tournament } from "../data-types/tournament-data-types";

const download = (state: Tournament) => {  
	const tournamentTitle = state.info.title;

	const blob = new Blob([JSON.stringify(state)], {type: "application/json"});
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

export default download;