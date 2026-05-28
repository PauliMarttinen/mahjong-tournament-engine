import { BigScreenStates, setBigScreenState } from "../../utils/setBigScreenState";

export const onClose = () => {
	setBigScreenState({type: BigScreenStates.Off});
};