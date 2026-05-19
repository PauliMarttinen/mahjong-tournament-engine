export const curlArray: Function = <T>(array: T[], perGroup: number): T[][] => ( 
	array.reduce((carry: T[][], item: T): T[][] => ( 
		carry[carry.length - 1].length < perGroup 
		? 
		[...carry.slice(0, -1), [...carry[carry.length - 1], item]] 
		: 
		[...carry, [item]] 
	), [[]]) 
);