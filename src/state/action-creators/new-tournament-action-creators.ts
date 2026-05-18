import { type Dispatch } from "redux";
import { type GeneralInfo, type Player } from "../../data-types/tournament-data-types";
import { type SeatingTemplateErrors, type SeatingTemplateStackItem } from "../../data-types/new-tournament-data-types";
import ActionTypes from "../action-types/new-tournament-action-types";
import {
	type AddGeneralInfoAction,
	type AddPlayersAction,
	type SetSeatingTemplateStackAction,
	type SetCurrentSeatingTemplateIndexAction,
	type SetSeatingTemplateErrorsAction,
	type EditTemplateFieldAction,
	type ClearNewTournamentAction
 } from "../actions/new-tournament-actions";

 export const addGeneralInfo = (newInfo: GeneralInfo) => {
	return (dispatch: Dispatch<AddGeneralInfoAction>) => {
		dispatch({
			type: ActionTypes.AddGeneralInfo,
			payload: newInfo
		});
	};
};

export const addPlayers = (players: Player[]) => {
	return (dispatch: Dispatch<AddPlayersAction>) => {
		dispatch({
			type: ActionTypes.AddPlayers,
			payload: players
		});
	};
};

export const setSeatingTemplateStack = (templateStack: SeatingTemplateStackItem[]) => {
	return (dispatch: Dispatch<SetSeatingTemplateStackAction>) => {
		dispatch({
			type: ActionTypes.SetSeatingTemplateStack,
			payload: templateStack
		});
	};
};

export const setCurrentSeatingTemplateIndex = (index: number) => {
	return (dispatch: Dispatch<SetCurrentSeatingTemplateIndexAction>) => {
		dispatch({
			type: ActionTypes.SetCurrentSeatingTemplateIndex,
			payload: index
		});
	};
};

export const setSeatingTemplateErrors = (errors: SeatingTemplateErrors) => {
	return (dispatch: Dispatch<SetSeatingTemplateErrorsAction>) => {
		dispatch({
			type: ActionTypes.SetSeatingTemplateErrors,
			payload: errors
		});
	};
};

export const editTemplateField = (tableId: number, roundId: number, seatId: number, playerId: number) => {
	return (dispatch: Dispatch<EditTemplateFieldAction>) => {
		dispatch({
			type: ActionTypes.EditTemplateField,
			payload: {
				tableId,
				roundId,
				seatId,
				playerId
			}
		});
	};
};

export const clearNewTournament = () => {
	return (dispatch: Dispatch<ClearNewTournamentAction>) => {
		dispatch({
			type: ActionTypes.ClearNewTournament
		});
	};;
}