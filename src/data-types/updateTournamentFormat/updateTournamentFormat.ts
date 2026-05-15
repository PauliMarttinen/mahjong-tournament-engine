import getFileVersion from "./utils/getFileVersion";
import convert0to1 from "./version1/convert0to1";
import convert1to2 from "./version2/convert1to2";
import convert2to3 from "./version3/convert2to3";

export const CURRENT_DATA_VERSION = 3;

type Data = {
	meta?: {
		dataFormatVersion?: number
	}
};

const updateTournamentFormat = (data: Data): object => {
	const fileVersion = getFileVersion(data as any);

	if (fileVersion > CURRENT_DATA_VERSION) {
		throw new Error("Unsupported data format version");
	}

	return [
		convert0to1, convert1to2, convert2to3
	].reduce((convertedData: any, convert: Function, index: number) => {
		if (index < fileVersion) return convertedData;
		return convert(convertedData);
	}, data);
};

export default updateTournamentFormat;