import ActionTypes from "../action-types/new-tournament-action-types";
import { type GeneralInfo, type Player } from "../../data-types/tournament-data-types";
import { type SeatingTemplateErrors, type SeatingTemplateStackItem } from "../../data-types/new-tournament-data-types";

export type AddGeneralInfoAction = {
	type: ActionTypes.AddGeneralInfo,
	payload: GeneralInfo
};

export type AddPlayersAction = {
	type: ActionTypes.AddPlayers,
	payload: Player[]
};

export type SetSeatingTemplateStackAction = {
	type: ActionTypes.SetSeatingTemplateStack,
	payload: SeatingTemplateStackItem[]
};

export type SetCurrentSeatingTemplateIndexAction = {
	type: ActionTypes.SetCurrentSeatingTemplateIndex,
	payload: number
};

export type SetSeatingTemplateErrorsAction = {
	type: ActionTypes.SetSeatingTemplateErrors,
	payload: SeatingTemplateErrors
}

export type EditTemplateFieldAction = {
	type: ActionTypes.EditTemplateField,
	payload: {
		tableId: number,
		roundId: number,
		seatId: number,
		playerId: number
	}
};

export type ClearNewTournamentAction = {
	type: ActionTypes.ClearNewTournament
};

type Action =
	AddGeneralInfoAction |
	AddPlayersAction |
	SetSeatingTemplateStackAction |
	SetCurrentSeatingTemplateIndexAction |
	SetSeatingTemplateErrorsAction |
	EditTemplateFieldAction |
	ClearNewTournamentAction;

export default Action;