import { type Version1 } from "../version1/Version1";
import { type Version2 } from "./Version2";
import { emptyRound } from "../../../state/reducers/newTournamentReducer";

const convert1to2 = (oldData: Version1): Version2 => {
	const newData: Version2 = {
		info: {
			title: oldData.info.title,
			roundLength: 75,
			rounds: Array(oldData.info.rounds).fill(emptyRound)
		},
		games: oldData.games,
		playerList: oldData.playerList,
		meta: {
			dataFormatVersion: 2
		}
	};

	return newData as Version2;
};

export default convert1to2;