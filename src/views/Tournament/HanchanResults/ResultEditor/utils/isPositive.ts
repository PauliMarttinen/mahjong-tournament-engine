import { type ForceSigned } from "../../../../../components/PointInput";

export const isPositive = (value: number, forceSigned?: ForceSigned): boolean => {
	if (forceSigned) return forceSigned === "positive";
	if (value === 0) return Object.is(0, value);
	return value > 0;
};