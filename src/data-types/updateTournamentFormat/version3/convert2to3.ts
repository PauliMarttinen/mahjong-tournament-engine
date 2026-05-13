import type { Version2 } from "../version2/Version2";
import type { Version3 } from "./Version3";
import { UmaTiebreak } from "../../tournament-data-types";

const convert2to3 = (oldData: Version2): Version3 => {
	const newData: Version3 = {
		info: {
			...oldData.info,
			uma: {
				automatic: false,
				amount: [{
					positive: true,
					value: 15000
				},
				{
					positive: true,
					value: 5000
				},
				{
					positive: false,
					value: 5000
				},
				{
					positive: false,
					value: 15000
				}],
				tiebreak: UmaTiebreak.Split
			}
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