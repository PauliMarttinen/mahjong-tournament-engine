import { AllVersions } from "../../tournament-data-types";

const getFileVersion = (data: AllVersions): number => {
	if (data && "meta" in data && data.meta && "dataFormatVersion" in data.meta) {
		const version = data.meta.dataFormatVersion;
		if (Number.isInteger(version) && version >= 0) {
			return version;
		}
	}
	return 0;
};

export default getFileVersion;