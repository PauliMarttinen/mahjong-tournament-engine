import { useSelector } from "react-redux";
import type { App } from "../../data-types/app-data-types";
import type { State } from "../../state";

const useAppState = (): App => {
	return useSelector((state: State) => state.app);
};

export default useAppState;