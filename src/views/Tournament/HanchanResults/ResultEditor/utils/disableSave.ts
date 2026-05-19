export const disableSave = (safeMode: boolean, totalsWrong: boolean, modified: boolean): boolean => {
	if (!safeMode) return false;
	return totalsWrong || !modified;
};