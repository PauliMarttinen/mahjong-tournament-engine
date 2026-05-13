import type { Dispatch } from "redux";
import type { BigScreen } from "../../data-types/app-data-types";
import ActionTypes from "../action-types/app-action-types";
import type {
	MarkTournamentLoaded,
	SetBigScreen
} from "../actions/app-actions";

export const markTournamentLoaded = (newValue: boolean) => {
	return (dispatch: Dispatch<MarkTournamentLoaded>) => {
		dispatch({
			type: ActionTypes.MarkTournamentLoaded,
			payload: newValue
		});
	}
};

export const setBigScreen = (newValue: BigScreen) => {
	return (dispatch: Dispatch<SetBigScreen>) => {
		dispatch({
			type: ActionTypes.SetBigScreen,
			payload: newValue
		});
	};
};