import ActionTypes from "../action-types/tournament-action-types";
import {GeneralInfo} from "../../data-types/tournament-data-types";
import {PlayerName} from "../../data-types/tournament-data-types";
import {Table} from "../../data-types/tournament-data-types";
import {Game} from "../../data-types/tournament-data-types";

export type EditTournamentInfoAction = {
  type: ActionTypes.EditTournamentInfo,
  payload: GeneralInfo
};

export type AddPlayersAction = {
  type: ActionTypes.AddPlayers,
  payload: PlayerName[]
};

export type AddTablesAction = {
  type: ActionTypes.AddTables,
  payload: Table[]
};

export type AddGamesAction = {
  type: ActionTypes.AddGames,
  payload: Game[]
};

type Action =
 EditTournamentInfoAction |
 AddPlayersAction | 
 AddTablesAction | 
 AddGamesAction;

export default Action;