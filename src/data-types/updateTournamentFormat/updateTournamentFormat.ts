import type { Version0 } from "./version0/Version0";
import getFileVersion from "./utils/getFileVersion";
import convert0to1 from "./version1/convert0to1";

export const CURRENT_DATA_VERSION = 1;

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
			return convert0to1(data as Version0);
		case CURRENT_DATA_VERSION:
			return data;
		default:
			break;
	}
	throw new Error("Unsupported data format version");
};

export default updateTournamentFormat;