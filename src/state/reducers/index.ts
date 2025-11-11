import {combineReducers} from "redux";
import newTournamentReducer from "./newTournamentReducer";
import tournamentReducer from "./tournamentReducer";
import appReducer from "./appReducer";

const reducers = combineReducers({
	newTournament: newTournamentReducer,
	tournament: tournamentReducer,
	app: appReducer
});

export default reducers;

export type State = ReturnType<typeof reducers>;