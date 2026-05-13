import type { Version2 } from "../version2/Version2";
import type { Version3 } from "./Version3";
import { Uma } from "../../tournament-data-types";

const convert2to3 = (oldData: Version2): Version3 => {
	const newData: Version3 = {
		info: {
			...oldData.info,
			uma: Uma.Manual
		},
		games: oldData.games,
		playerList: oldData.playerList,
		meta: {
			dataFormatVersion: 2
		}
	};

	return newData as Version3;
};

export default convert2to3;