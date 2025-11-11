import Action from "../actions/new-tournament-actions";
import ActionTypes from "../action-types/new-tournament-action-types";
import { NewTournament } from "../../data-types/new-tournament-data-types";

export const initialState: NewTournament = {
	info: {
		title: "",
		rounds: 8
	},
	playerList: [],
	seatingTemplateHistory: [],
	seatingTemplateErrors: {
		duplicates: [],
		missing: [],
		outsideRange: []
	},
	currentSeatingTemplateIndex: 0
};

const reducer = (state: NewTournament = initialState, action: Action): NewTournament => {
	switch (action.type)
	{
		case ActionTypes.AddGeneralInfo:
		{
			const newState: NewTournament = {
				...state,
				info: action.payload
			};
			return newState;
		}
		case ActionTypes.AddPlayers:
		{	
			const newState: NewTournament = {
				...state,
				playerList: action.payload
			};
			return newState;
		}
		case ActionTypes.SetSeatingTemplateHistory:
		{
			const newState: NewTournament = {
				...state,
				seatingTemplateHistory: action.payload
			};
			return newState;
		}
		case ActionTypes.SetCurrentSeatingTemplateIndex:
		{
			const newState: NewTournament = {
				...state,
				currentSeatingTemplateIndex: action.payload
			};
			return newState;
		}
		case ActionTypes.SetSeatingTemplateErrors:
		{
			const newState: NewTournament = {
				...state,
				seatingTemplateErrors: action.payload
			};
			return newState;
		}
		case ActionTypes.EditTemplateField:
		{
			const { tableId, roundId, seatId, playerId } = action.payload;
			const updatedTemplate = state.seatingTemplateHistory[state.seatingTemplateHistory.length - 1].template.map((table, tIndex) => {
				if (tIndex !== tableId) return table;
				return table.map((seat, sIndex) => {
					if (sIndex !== seatId) return seat;
					return playerId;
				});
			});
			const newSeatingTemplateHistory = state.seatingTemplateHistory.slice(0, -1).concat([{
				template: updatedTemplate,
				type: state.seatingTemplateHistory[state.seatingTemplateHistory.length - 1].type
			}]);
			const newState: NewTournament = {
				...state,
				seatingTemplateHistory: newSeatingTemplateHistory
			};
			return newState;
		}
		case ActionTypes.ClearNewTournament:
		{
			return initialState;
		}
		default:
			return state;
	}
};

export default reducer;