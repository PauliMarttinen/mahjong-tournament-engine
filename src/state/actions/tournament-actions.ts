import ActionTypes from "../action-types/tournament-action-types";
import {GeneralInfo, Tournament} from "../../data-types/tournament-data-types";
import {Game, Player} from "../../data-types/tournament-data-types";

export type EditTournamentInfoAction = {
	type: ActionTypes.EditTournamentInfo,
	payload: GeneralInfo
};

export type AddPlayersAction = {
	type: ActionTypes.AddPlayers,
	payload: Player[]
};

export type AddGamesAction = {
	type: ActionTypes.AddGames,
	payload: Game[]
};

export type SetTournament = {
	type: ActionTypes.SetTournament,
	payload: Tournament
};

type Action =
	EditTournamentInfoAction |
	AddPlayersAction |
	AddGamesAction |
	SetTournament;

export default Action;