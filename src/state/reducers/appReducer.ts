import type { App } from "../../data-types/app-data-types";
import type Action from "../actions/app-actions";
import ActionTypes from "../action-types/app-action-types";

const initialState: App = {
	tournamentLoaded: false,
	bigScreenOn: false
};

const reducer = (state: App = initialState, action: Action): App => {
	switch (action.type)
	{
		case ActionTypes.MarkTournamentLoaded:
			return {
				...state,
				tournamentLoaded: action.payload
			};
		case ActionTypes.SetBigScreenOn:
			return {
				...state,
				bigScreenOn: action.payload
			}
		default:
			return state;
	}
};

export default reducer;