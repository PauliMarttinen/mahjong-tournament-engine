import { type PointInputType } from "../components/PointInput";

export const getNumericValue = (value: PointInputType): number => {
	return value.value * (value.positive ? 1 : -1);
};