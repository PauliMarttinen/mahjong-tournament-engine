import type { Version0 } from "./version0/Version0";
import type { Version1 } from "./version1/Version1";
import getFileVersion from "./utils/getFileVersion";
import convert0to1 from "./version1/convert0to1";
import convert1to2 from "./version2/convert1to2";

export const CURRENT_DATA_VERSION = 2;

type Data = {
	meta?: {
		dataFormatVersion?: number
	}
};

const updateTournamentFormat = (data: Data): object => {
	const fileVersion = getFileVersion(data as any);

	switch (fileVersion)
	{
		case 0:
			return convert1to2(convert0to1(data as Version0));
		case 1:
			return convert1to2(data as Version1);
		case CURRENT_DATA_VERSION:
			return data;
		default:
			break;
	}
	throw new Error("Unsupported data format version");
};

export default updateTournamentFormat;