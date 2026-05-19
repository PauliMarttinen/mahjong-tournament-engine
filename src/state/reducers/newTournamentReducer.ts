import type Action from "../actions/new-tournament-actions";
import ActionTypes from "../action-types/new-tournament-action-types";
import { type NewTournament, type SeatingTemplateStackItem } from "../../data-types/new-tournament-data-types";
import { type Round, UmaTiebreak } from "../../data-types/tournament-data-types";

export const emptyRound: Round = {
	scheduledStart: "",
	realStart: "",
};

export const initialState: NewTournament = {
	info: {
		title: "",
		roundLength: 75,
		rounds: Array(8).fill(emptyRound),
		uma: {
			automatic: false,
			amount: [15000, 5000, -5000, -15000],
			tiebreak: UmaTiebreak.Split
		}
	},
	playerList: [],
	seatingTemplateStack: [],
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
		case ActionTypes.SetSeatingTemplateStack:
		{
			const newState: NewTournament = {
				...state,
				seatingTemplateStack: action.payload
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
			const {tableId, roundId, seatId, playerId} = action.payload;
			const templateToUpdate = state.seatingTemplateStack[state.currentSeatingTemplateIndex];
			templateToUpdate.template[tableId*4+seatId][roundId] = playerId;

			const newSeatingTemplateStack = state.seatingTemplateStack.map((item: SeatingTemplateStackItem, index: number) => {
				if (index === state.currentSeatingTemplateIndex) return templateToUpdate;

				return item;
			});

			const newState: NewTournament = {
				...state,
				seatingTemplateStack: newSeatingTemplateStack
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