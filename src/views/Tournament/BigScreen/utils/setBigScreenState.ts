export const STATE_MESSAGE_IDENTIFIER = "mahjong-tournament-engine-bigscreen-state-change";
export const PING_MESSAGE_IDENTIFIER = "mahjong-tournament-engine-bigscreen-ping";
export const PING_INTERVAL = 1000;

export enum BigScreenStates {
	Welcome = "Welcome",
	Timer = "Timer",
	Standings = "Standings",
	Final = "Final",
	Off = "Off"
};

export const setBigScreenState = (state: object) => {
	localStorage.setItem(STATE_MESSAGE_IDENTIFIER, JSON.stringify(state));
};