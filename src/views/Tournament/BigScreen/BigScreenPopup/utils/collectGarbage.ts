import { STATE_MESSAGE_IDENTIFIER } from "../../utils/setBigScreenState";

export const collectGarbage = () => {
	localStorage.removeItem(STATE_MESSAGE_IDENTIFIER);
};