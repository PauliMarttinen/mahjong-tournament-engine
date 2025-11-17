import { useSelector } from "react-redux";
import type { NewTournament } from "../../data-types/new-tournament-data-types";
import type { State } from "../../state";
import useAppState from "./useAppState";
import { initialState } from "../../state/reducers/newTournamentReducer";

const useNewTournament = (): NewTournament => {
	const appState = useAppState();
	const newTournamentFromState = useSelector((state: State) => state.newTournament);
	if (appState.tournamentLoaded) return newTournamentFromState;

	return initialState;
};

export default useNewTournament;