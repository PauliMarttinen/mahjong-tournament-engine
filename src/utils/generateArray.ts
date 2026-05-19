export const generateArray = (itemCount: number, startFrom?: number): number[] => {
	return Array(itemCount).fill(0).map((_: number, i: number): number => {
		if (startFrom) return i + startFrom;
		return i;
	});
};