export const STATE_MESSAGE_IDENTIFIER = "mahjong-tournament-engine-bigscreen-state-change";
export const NAVIGATE_MESSAGE_IDENTIFIER = "mahjong-tournament-engine-bigscreen-navigate";

export enum BigScreenStates {
	Off = "Off"
};

export enum BigScreenActions {
	StartRound = "StartRound",
};

export const setBigScreenState = (state: object) => {
	localStorage.setItem(STATE_MESSAGE_IDENTIFIER, JSON.stringify(state));
};

export const navigateBigScreen = (route: string) => {
	localStorage.setItem(NAVIGATE_MESSAGE_IDENTIFIER, route);
};