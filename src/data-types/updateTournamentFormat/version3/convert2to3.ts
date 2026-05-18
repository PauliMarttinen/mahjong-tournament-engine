import type { Version2 } from "../version2/Version2";
import type { Version3 } from "./Version3";
import { UmaTiebreak } from "../../tournament-data-types";

const convert2to3 = (oldData: Version2): Version3 => {
	const newData: Version3 = {
		info: {
			...oldData.info,
			uma: {
				automatic: false,
				amount: [15000, 5000, -5000, -15000],
				tiebreak: UmaTiebreak.Split
			}
		},
		games: oldData.games,
		playerList: oldData.playerList,
		meta: {
			dataFormatVersion: 3
		}
	};

	return newData as Version3;
};

export default convert2to3;