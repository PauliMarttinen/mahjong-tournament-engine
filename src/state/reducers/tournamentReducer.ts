import { type Round, type Tournament, UmaTiebreak } from "../../data-types/tournament-data-types";
import type Action from "../actions/tournament-actions";
import ActionTypes from "../action-types/tournament-action-types";
import updateTournamentFormat, { CURRENT_DATA_VERSION } from "../../data-types/updateTournamentFormat/updateTournamentFormat";
import { emptyRound } from "./newTournamentReducer";

export const initialState: Tournament = {
	info: {
		title: "",
		roundLength: 75,
		rounds: Array(8).fill(emptyRound) as Round[],
		uma: {
			automatic: false,
			amount: [15000, 5000, -5000, -15000],
			tiebreak: UmaTiebreak.Split
		}
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