import type { PointInputType } from "../data-types/tournament-data-types";

export const getNumericValue = (value: PointInputType): number => {
	return value.value * (value.positive ? 1 : -1);
};