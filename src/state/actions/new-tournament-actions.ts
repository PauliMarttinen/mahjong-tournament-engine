import ActionTypes from "../action-types/new-tournament-action-types";
import { GeneralInfo, Player } from "../../data-types/tournament-data-types";
import { SeatingTemplateErrors, SeatingTemplateHistoryItem } from "../../data-types/new-tournament-data-types";

export type AddGeneralInfoAction = {
	type: ActionTypes.AddGeneralInfo,
	payload: GeneralInfo
};

export type AddPlayersAction = {
	type: ActionTypes.AddPlayers,
	payload: Player[]
};

export type SetSeatingTemplateHistoryAction = {
	type: ActionTypes.SetSeatingTemplateHistory,
	payload: SeatingTemplateHistoryItem[]
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
		templateId: number,
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
	SetSeatingTemplateHistoryAction |
	SetCurrentSeatingTemplateIndexAction |
	SetSeatingTemplateErrorsAction |
	EditTemplateFieldAction |
	ClearNewTournamentAction;

export default Action;