import type { Dispatch } from "redux";
import ActionTypes from "../action-types/app-action-types";
import type {
	MarkTournamentLoaded,
	SetBigScreenOn
} from "../actions/app-actions";

export const markTournamentLoaded = (newValue: boolean) => {
	return (dispatch: Dispatch<MarkTournamentLoaded>) => {
		dispatch({
			type: ActionTypes.MarkTournamentLoaded,
			payload: newValue
		});
	}
};

export const setBigScreenOn = (newValue: boolean) => {
	return (dispatch: Dispatch<SetBigScreenOn>) => {
		dispatch({
			type: ActionTypes.SetBigScreenOn,
			payload: newValue
		});
	};
};