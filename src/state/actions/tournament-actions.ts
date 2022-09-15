import ActionTypes from "../action-types/tournament-action-types";
import {GeneralInfo, Tournament} from "../../data-types/tournament-data-types";
import {Table} from "../../data-types/tournament-data-types";
import {Game} from "../../data-types/tournament-data-types";

export type EditTournamentInfoAction = {
  type: ActionTypes.EditTournamentInfo,
  payload: GeneralInfo
};

export type AddPlayersAction = {
  type: ActionTypes.AddPlayers,
  payload: string[]
};

export type AddSeatingTemplateAction = {
  type: ActionTypes.AddSeatingTemplate,
  payload: number[][]
};

export type AddTablesAction = {
  type: ActionTypes.AddTables,
  payload: Table[]
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
 AddSeatingTemplateAction | 
 AddTablesAction | 
 AddGamesAction |
 SetTournament;

export default Action;