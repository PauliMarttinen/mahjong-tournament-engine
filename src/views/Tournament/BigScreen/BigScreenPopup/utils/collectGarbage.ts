import { STATE_MESSAGE_IDENTIFIER } from "../../utils/setBigScreenState";

const collectGarbage = () => {
	localStorage.removeItem(STATE_MESSAGE_IDENTIFIER);
};

export default collectGarbage;