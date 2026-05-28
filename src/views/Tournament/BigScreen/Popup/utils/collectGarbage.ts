import { NAVIGATE_MESSAGE_IDENTIFIER, STATE_MESSAGE_IDENTIFIER } from "../../utils/setBigScreenState";

export const collectGarbage = () => {
	localStorage.removeItem(STATE_MESSAGE_IDENTIFIER);
	localStorage.removeItem(NAVIGATE_MESSAGE_IDENTIFIER);
};