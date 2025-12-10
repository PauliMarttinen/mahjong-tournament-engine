import ActionTypes from "../action-types/app-action-types";

export type MarkTournamentLoaded = {
	type: ActionTypes.MarkTournamentLoaded,
	payload: boolean
};

export type SetBigScreenOn = {
	type: ActionTypes.SetBigScreenOn,
	payload: boolean
};

type Action = MarkTournamentLoaded | SetBigScreenOn;

export default Action;