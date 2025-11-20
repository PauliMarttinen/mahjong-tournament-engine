export const STATE_MESSAGE_ID = "mahjong-tournament-engine-bigscreen-state-change";

export enum BigScreenStates {
	Welcome = "Welcome",
	Timer = "Timer",
	Standings = "Standings",
	Final = "Final"
};

export const setBigScreenState = (state: object) => {
	localStorage.setItem(STATE_MESSAGE_ID, JSON.stringify(state));
};