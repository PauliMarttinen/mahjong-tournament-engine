export const generateArray = (itemCount: number, startFrom: number = 0): number[] => {
	return Array(itemCount).fill(0).map((_: number, i: number): number => i + startFrom);
};