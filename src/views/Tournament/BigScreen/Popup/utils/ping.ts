export const PING_MESSAGE_IDENTIFIER = "mahjong-tournament-engine-bigscreen-ping";
export const PING_INTERVAL = 1000;

export const ping = () => {
	localStorage.setItem(PING_MESSAGE_IDENTIFIER, Date.now().toString());
};