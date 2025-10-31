import { Version0 } from "../version0/Version0";
import { Version1 } from "./Version1";

const convert0to1 = (oldData: Version0): Version1 => {
	const newData: Version1 = {
		info: oldData.info,
		games: oldData.games,
		playerList: oldData.playerNames.map((name: string) => ({name: name, substitute: false})),
		meta: {
			dataFormatVersion: 1
		}
	};

	return newData as Version1;
};

export default convert0to1;