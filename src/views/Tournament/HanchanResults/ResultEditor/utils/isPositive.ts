const isPositive = (value: number): boolean => {
	if (value === 0) return Object.is(0, value);
	return value > 0;
};

export default isPositive;