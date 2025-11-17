import { isTournamentDataValid } from "../../../data-types/tournament-data-types";
import type { Tournament } from "../../../data-types/tournament-data-types";

const shouldOfferStoredGame = () => {
	if (localStorage.getItem("mahjong-tournament") !== null)
	{
		const readFromLocalStorage: string = localStorage.getItem("mahjong-tournament") as string;

		try
		{
			const possibleTournamentState: Tournament = JSON.parse(readFromLocalStorage);

			return isTournamentDataValid(possibleTournamentState);
		}
		catch (e)
		{
			console.log("error", e);
			return false;
		}
	}

	return false;
};

export default shouldOfferStoredGame;