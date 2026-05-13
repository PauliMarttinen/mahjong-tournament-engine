import type { BigScreen } from "../../data-types/app-data-types";
import ActionTypes from "../action-types/app-action-types";

export type MarkTournamentLoaded = {
	type: ActionTypes.MarkTournamentLoaded,
	payload: boolean
};

export type SetBigScreen = {
	type: ActionTypes.SetBigScreen,
	payload: BigScreen
};

type Action = MarkTournamentLoaded | SetBigScreen;

export default Action;