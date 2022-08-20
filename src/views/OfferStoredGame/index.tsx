import Popup from "../../components/Popup";

import { useDispatch } from "react-redux";
import { bindActionCreators } from "redux";
import { tournamentActionCreators, appActionCreators } from "../../state";
import { loadTournament } from "../../utils/loadTournament";
import { Tournament } from "../../data-types/tournament-data-types";

const OfferStoredGame = () => {
  const dispatch = useDispatch();

  const { changeView, markTournamentLoaded } = bindActionCreators(appActionCreators, dispatch);
  const { setTournament } = bindActionCreators(tournamentActionCreators, dispatch);

  const cancel = () => {
    localStorage.removeItem("mahjong-tournament");
    markTournamentLoaded(true);
  };

  const load = () => {
    const tournament: Tournament = JSON.parse(localStorage.getItem("mahjong-tournament") as string);
    const view = loadTournament(tournament);
    markTournamentLoaded(true);
    setTournament(tournament);
    changeView(view);
  };

  return (
    <Popup
      title={"Reopen tournament from memory?"}
      cancelText={"No, start new tournament"}
      confirmText={"Yes, load tournament"}
      onCancel={(): void => cancel()}
      onConfirm={(): void => load()}>
      <p>There appears to be a tournament saved in your browser memory.</p>

      <p>Would you like to restore that tournament or start a new one?</p>

      <p><strong>If you start a new tournament, the stored tournament will be cleared and cannot be restored.</strong></p>
    </Popup>
  );
};

export default OfferStoredGame;