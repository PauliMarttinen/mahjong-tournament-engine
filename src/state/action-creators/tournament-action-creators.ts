import type {Dispatch} from "redux";
import type { GeneralInfo, Game, Tournament, Player } from "../../data-types/tournament-data-types";
import ActionTypes from "../action-types/tournament-action-types";
import type {
	EditTournamentInfoAction,
	AddPlayersAction,
	AddGamesAction,
	SetTournament
} from "../actions/tournament-actions";

export const editTournamentInfo = (newInfo: GeneralInfo) => {
	return (dispatch: Dispatch<EditTournamentInfoAction>) => {
		dispatch({
			type: ActionTypes.EditTournamentInfo,
			payload: newInfo
		});
	};
};

export const addPlayers = (players: Player[]) => {
	return (dispatch: Dispatch<AddPlayersAction>) => {
		dispatch({
			type: ActionTypes.AddPlayers,
			payload: players
		});
	};
};

export const addGames = (games: Game[]) => {
	return (dispatch: Dispatch<AddGamesAction>) => {
		dispatch({
			type: ActionTypes.AddGames,
			payload: games
		});
	};
};

export const setTournament = (tournament: Tournament) => {
	return (dispatch: Dispatch<SetTournament>) => {
		dispatch({
			type: ActionTypes.SetTournament,
			payload: tournament
		});
	};
};