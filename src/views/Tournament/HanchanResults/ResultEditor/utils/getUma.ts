/* import { UmaTiebreak, type PointInputType, type Uma } from "../../../../../data-types/tournament-data-types";
import { getNumericValue } from "../../../../../utils/getNumericValue";

type Player = {
	seat: number,
	raw: number,
	uma: PointInputType
};

export const getUma = (rule: Uma, raw: [PointInputType, PointInputType, PointInputType, PointInputType]): [PointInputType, PointInputType, PointInputType, PointInputType] => {
	//Step 1: mark players in their original seat order
	const players: [Player, Player, Player, Player] = [
		{
			seat: 0,
			raw: getNumericValue(raw[0]),
			uma: {positive: true, value: 0}
		},
		{
			seat: 1,
			raw: getNumericValue(raw[1]),
			uma: {positive: true, value: 0}
		},
		{
			seat: 2,
			raw: getNumericValue(raw[2]),
			uma: {positive: true, value: 0}
		},
		{
			seat: 3,
			raw: getNumericValue(raw[3]),
			uma: {positive: true, value: 0}
		},
	];

	//Step 2: sort players by score
	const sortedPlayers = players.sort((a: Player, b: Player) => {
		if (a.raw < b.raw) return 1;
		if (a.raw > b.raw) return -1;

		if (a.seat > b.seat) return 1;
		if (a.seat < b.seat) return -1;
		return 0;
	});

	const addedUma: [Player, Player, Player, Player] = [...sortedPlayers];

	if (rule.tiebreak === UmaTiebreak.Headbump)
	{
		//Step 3: add uma
		addedUma[0].uma = rule.amount[0];
		addedUma[1].uma = rule.amount[1];
		addedUma[2].uma = rule.amount[2];
		addedUma[3].uma = rule.amount[3];

		//Step 4: sort players back by seat order
		const resortedPlayers = addedUma.sort((a: Player, b: Player) => {
			if (a.seat > b.seat) return 1;
			if (a.seat < b.seat) return -1;
			return 0;
		});

		return [
			resortedPlayers[0].uma,
			resortedPlayers[1].uma,
			resortedPlayers[2].uma,
			resortedPlayers[3].uma
		];
	}
	
	//All the various ways players can be tied:
	// nobody is tied
	if (sortedPlayers[0].raw !== sortedPlayers[1].raw && sortedPlayers[1].raw !== sortedPlayers[2].raw && sortedPlayers[2].raw !== sortedPlayers[3].raw)
	{
		addedUma[0].uma = rule.amount[0];
		addedUma[1].uma = rule.amount[1];
		addedUma[2].uma = rule.amount[2];
		addedUma[3].uma = rule.amount[3];
	}

	// 1st and 2nd are tied but 3rd and 4th are not tied
	else if (sortedPlayers[0].raw === sortedPlayers[1].raw && sortedPlayers[1].raw !== sortedPlayers[2].raw && sortedPlayers[2].raw !== sortedPlayers[3].raw)
	{
		const firstUmaValue = getNumericValue(rule.amount[0]);
		const secondUmaValue = getNumericValue(rule.amount[1]);
		const splitUmaValue = (firstUmaValue + secondUmaValue)/2;
		const splitUma = {
			positive: splitUmaValue >= 0,
			value: Math.abs(splitUmaValue)
		};
		addedUma[0].uma = splitUma;
		addedUma[1].uma = splitUma;
		addedUma[2].uma = rule.amount[2];
		addedUma[3].uma = rule.amount[3];
	}

	// 2nd and 3rd are tied
	else if (sortedPlayers[0].raw !== sortedPlayers[1].raw && sortedPlayers[1].raw === sortedPlayers[2].raw && sortedPlayers[2].raw !== sortedPlayers[3].raw)
	{
		const secondUmaValue = getNumericValue(rule.amount[1]);
		const thirdUmaValue = getNumericValue(rule.amount[2]);
		const splitUmaValue = (secondUmaValue + thirdUmaValue)/2;
		const splitUma = {
			positive: splitUmaValue >= 0,
			value: Math.abs(splitUmaValue)
		};
		addedUma[0].uma = rule.amount[0];
		addedUma[1].uma = splitUma;
		addedUma[2].uma = splitUma;
		addedUma[3].uma = rule.amount[3];
	}
	
	// 3rd and 4th are tied but 1st and 4th are not tied
	else if (sortedPlayers[0].raw !== sortedPlayers[1].raw && sortedPlayers[1].raw !== sortedPlayers[2].raw && sortedPlayers[2].raw === sortedPlayers[3].raw)
	{
		const thirdUmaValue = getNumericValue(rule.amount[2]);
		const fourthUmaValue = getNumericValue(rule.amount[3]);
		const splitUmaValue = (thirdUmaValue + fourthUmaValue)/2;
		const splitUma = {
			positive: splitUmaValue >= 0,
			value: Math.abs(splitUmaValue)
		};
		addedUma[0].uma = rule.amount[0];
		addedUma[1].uma = rule.amount[1];
		addedUma[2].uma = splitUma;
		addedUma[3].uma = splitUma;
	}
	
	// 1st and 2nd are tied with each other, and 3rd and 4th are tied with each other
	else if (sortedPlayers[0].raw === sortedPlayers[1].raw && sortedPlayers[1].raw !== sortedPlayers[2].raw && sortedPlayers[2].raw === sortedPlayers[3].raw)
	{
		const firstUmaValue = getNumericValue(rule.amount[0]);
		const secondUmaValue = getNumericValue(rule.amount[1]);
		const thirdUmaValue = getNumericValue(rule.amount[2]);
		const fourthUmaValue = getNumericValue(rule.amount[3]);
		const upperSplitUmaValue = (firstUmaValue + secondUmaValue)/2;
		const lowerSplitUmaValue = (thirdUmaValue + fourthUmaValue)/2;
		const upperSplitUma = {
			positive: upperSplitUmaValue >= 0,
			value: Math.abs(upperSplitUmaValue)
		};
		const lowerSplitUma = {
			positive: lowerSplitUmaValue >= 0,
			value: Math.abs(lowerSplitUmaValue)
		}
		addedUma[0].uma = upperSplitUma;
		addedUma[1].uma = upperSplitUma;
		addedUma[2].uma = lowerSplitUma;
		addedUma[3].uma = lowerSplitUma;
	}
	
	// 1st, 2nd and 3rd are tied
	else if (sortedPlayers[0].raw === sortedPlayers[1].raw && sortedPlayers[1].raw === sortedPlayers[2].raw && sortedPlayers[2].raw !== sortedPlayers[3].raw)
	{
		const firstUmaValue = getNumericValue(rule.amount[0]);
		const secondUmaValue = getNumericValue(rule.amount[1]);
		const thirdUmaValue = getNumericValue(rule.amount[2]);
		const splitUmaValue = (firstUmaValue + secondUmaValue + thirdUmaValue)/3;
		const splitUma = {
			positive: splitUmaValue >= 0,
			value: Math.abs(splitUmaValue)
		}
		addedUma[0].uma = splitUma;
		addedUma[1].uma = splitUma;
		addedUma[2].uma = splitUma;
		addedUma[3].uma = rule.amount[3];
	}
	
	// 2nd, 3rd and 4th are tied
	else if (sortedPlayers[0].raw !== sortedPlayers[1].raw && sortedPlayers[1].raw === sortedPlayers[2].raw && sortedPlayers[2].raw === sortedPlayers[3].raw)
	{
		const secondUmaValue = getNumericValue(rule.amount[1]);
		const thirdUmaValue = getNumericValue(rule.amount[2]);
		const fourthUmaValue = getNumericValue(rule.amount[3]);
		const splitUmaValue = (secondUmaValue + thirdUmaValue + fourthUmaValue)/3;
		const splitUma = {
			positive: splitUmaValue >= 0,
			value: Math.abs(splitUmaValue)
		}
		addedUma[0].uma = rule.amount[0];
		addedUma[1].uma = splitUma;
		addedUma[2].uma = splitUma;
		addedUma[3].uma = splitUma;
	}
	
	// everyone is tied
	else if (sortedPlayers[0].raw === sortedPlayers[1].raw && sortedPlayers[1].raw === sortedPlayers[2].raw && sortedPlayers[2].raw === sortedPlayers[3].raw)
	{
		const splitUma = {positive: true, value: 0};
		addedUma[0].uma = splitUma;
		addedUma[1].uma = splitUma;
		addedUma[2].uma = splitUma;
		addedUma[3].uma = splitUma;
	}

	//Step 4: sort players back by seat order
	const resortedPlayers = addedUma.sort((a: Player, b: Player) => {
		if (a.seat > b.seat) return 1;
		if (a.seat < b.seat) return -1;
		return 0;
	});

	return [
		resortedPlayers[0].uma,
		resortedPlayers[1].uma,
		resortedPlayers[2].uma,
		resortedPlayers[3].uma
	];
};*/

export const getUma = () => {};