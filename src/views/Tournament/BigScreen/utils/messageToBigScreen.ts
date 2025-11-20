export const MESSAGE_IDENTIFIER = "mahjong-tournament-engine-bigscreen-message";
export const PARAMETER_IDENTIFIER = "mahjong-tournament-engine-bigscreen-parameter";

export enum Messages {
	JumpToStep = "JumpToStep"
};

export const messageToBigScreen = (message: string, parameter?: string) => {
	localStorage.setItem(MESSAGE_IDENTIFIER, message);
	if (parameter) {
		localStorage.setItem(PARAMETER_IDENTIFIER, parameter);
	}
};