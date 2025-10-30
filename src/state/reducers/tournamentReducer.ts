import { Tournament } from "../../data-types/tournament-data-types";
import Action from "../actions/tournament-actions";
import ActionTypes from "../action-types/tournament-action-types";
import updateTournamentFormat, { CURRENT_DATA_VERSION } from "../../data-types/updateTournamentFormat/updateTournamentFormat";

export const initialState: Tournament = {
	info: {
		title: "",
		rounds: 8
	},
	playerList: [],
	games: [],
	meta: {
		dataFormatVersion: CURRENT_DATA_VERSION
	}
};

const reducer = (state: Tournament = initialState, action: Action): Tournament => {
	switch (action.type)
	{
		case ActionTypes.EditTournamentInfo:
		{
			const newState: Tournament = {
				...state,
				info: action.payload
			};
			localStorage.setItem("mahjong-tournament", JSON.stringify(newState));
			return newState;
		}
		case ActionTypes.AddPlayers:
		{  
			const newState: Tournament = {
				...state,
				playerList: action.payload
			};
			localStorage.setItem("mahjong-tournament", JSON.stringify(newState));
			return newState;
		}
		/* case ActionTypes.AddSeatingTemplate:
		{  
			const newState: Tournament = {
				...state,
				seatingTemplate: action.payload
			};
			localStorage.setItem("mahjong-tournament", JSON.stringify(newState));
			return newState;
		} */
		case ActionTypes.AddGames:
		{
			const newState: Tournament = {
				...state,
				games: action.payload
			};
			localStorage.setItem("mahjong-tournament", JSON.stringify(newState));
			return newState;
		}
		case ActionTypes.SetTournament:
			const newState = updateTournamentFormat(action.payload) as Tournament;
			localStorage.setItem("mahjong-tournament", JSON.stringify(newState));
			return newState;
		default:
			return state;
	}
};

export default reducer;