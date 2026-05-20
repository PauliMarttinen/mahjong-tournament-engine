import { type Score, UmaTiebreak, type Uma } from "../../../../../data-types/tournament-data-types";
import { Seats } from "../../../../../data-types/app-data-types";
import { Positions } from "../../../../../data-types/app-data-types";

type Player = {
	seat: number,
	raw: number,
	uma: number
};

export const getUma = (rule: Uma, participants: [Score, Score, Score, Score]): [number, number, number, number] => {
	//Step 1: mark players in their original seat order
	const players: [Player, Player, Player, Player] = [
		{
			seat: Seats.East,
			raw: participants[Seats.East].raw,
			uma: 0
		},
		{
			seat: Seats.South,
			raw: participants[Seats.South].raw,
			uma: 0
		},
		{
			seat: Seats.West,
			raw: participants[Seats.West].raw,
			uma: 0
		},
		{
			seat: Seats.North,
			raw: participants[Seats.North].raw,
			uma: 0
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
		addedUma[Positions.First].uma = rule.amount[Positions.First];
		addedUma[Positions.Second].uma = rule.amount[Positions.Second];
		addedUma[Positions.Third].uma = rule.amount[Positions.Third];
		addedUma[Positions.Fourth].uma = rule.amount[Positions.Fourth];

		//Step 4: sort players back by seat order
		const resortedPlayers = addedUma.sort((a: Player, b: Player) => {
			if (a.seat > b.seat) return 1;
			if (a.seat < b.seat) return -1;
			return 0;
		});

		return [
			resortedPlayers[Seats.East].uma,
			resortedPlayers[Seats.South].uma,
			resortedPlayers[Seats.West].uma,
			resortedPlayers[Seats.North].uma
		];
	}
	
	//All the various ways players can be tied:
	// nobody is tied
	if (
		sortedPlayers[Positions.First].raw !== sortedPlayers[Positions.Second].raw &&
		sortedPlayers[Positions.Second].raw !== sortedPlayers[Positions.Third].raw &&
		sortedPlayers[Positions.Third].raw !== sortedPlayers[Positions.Fourth].raw
	)	{
		addedUma[Positions.First].uma = rule.amount[Positions.First];
		addedUma[Positions.Second].uma = rule.amount[Positions.Second];
		addedUma[Positions.Third].uma = rule.amount[Positions.Third];
		addedUma[Positions.Fourth].uma = rule.amount[Positions.Fourth];
	}

	// 1st and 2nd are tied but 3rd and 4th are not tied
	else if (
		sortedPlayers[Positions.First].raw === sortedPlayers[Positions.Second].raw &&
		sortedPlayers[Positions.Second].raw !== sortedPlayers[Positions.Third].raw &&
		sortedPlayers[Positions.Third].raw !== sortedPlayers[Positions.Fourth].raw
	)	{
		const firstUmaValue = rule.amount[Positions.First];
		const secondUmaValue = rule.amount[Positions.Second];
		const splitUma = (firstUmaValue + secondUmaValue)/2;
		
		addedUma[Positions.First].uma = splitUma;
		addedUma[Positions.Second].uma = splitUma;
		addedUma[Positions.Third].uma = rule.amount[Positions.Third];
		addedUma[Positions.Fourth].uma = rule.amount[Positions.Fourth];
	}

	// 2nd and 3rd are tied
	else if (
		sortedPlayers[Positions.First].raw !== sortedPlayers[Positions.Second].raw &&
		sortedPlayers[Positions.Second].raw === sortedPlayers[Positions.Third].raw &&
		sortedPlayers[Positions.Third].raw !== sortedPlayers[Positions.Fourth].raw
	) {
		const secondUmaValue = rule.amount[Positions.Second];
		const thirdUmaValue = rule.amount[Positions.Third];
		const splitUma = (secondUmaValue + thirdUmaValue)/2;
		
		addedUma[Positions.First].uma = rule.amount[Positions.First];
		addedUma[Positions.Second].uma = splitUma;
		addedUma[Positions.Third].uma = splitUma;
		addedUma[Positions.Fourth].uma = rule.amount[Positions.Fourth];
	}
	
	// 3rd and 4th are tied but 1st and 4th are not tied
	else if (
		sortedPlayers[Positions.First].raw !== sortedPlayers[Positions.Second].raw &&
		sortedPlayers[Positions.Second].raw !== sortedPlayers[Positions.Third].raw &&
		sortedPlayers[Positions.Third].raw === sortedPlayers[Positions.Fourth].raw
	) {
		const thirdUmaValue = rule.amount[Positions.Third];
		const fourthUmaValue = rule.amount[Positions.Fourth];
		const splitUma = (thirdUmaValue + fourthUmaValue)/2;
		
		addedUma[Positions.First].uma = rule.amount[Positions.First];
		addedUma[Positions.Second].uma = rule.amount[Positions.Second];
		addedUma[Positions.Third].uma = splitUma;
		addedUma[Positions.Fourth].uma = splitUma;
	}
	
	// 1st and 2nd are tied with each other, and 3rd and 4th are tied with each other
	else if (
		sortedPlayers[Positions.First].raw === sortedPlayers[Positions.Second].raw &&
		sortedPlayers[Positions.Second].raw !== sortedPlayers[Positions.Third].raw &&
		sortedPlayers[Positions.Third].raw === sortedPlayers[Positions.Fourth].raw
	) {
		const firstUmaValue = rule.amount[Positions.First];
		const secondUmaValue = rule.amount[Positions.Second];
		const thirdUmaValue = rule.amount[Positions.Third];
		const fourthUmaValue = rule.amount[Positions.Fourth];
		const upperSplitUma = (firstUmaValue + secondUmaValue)/2;
		const lowerSplitUma = (thirdUmaValue + fourthUmaValue)/2;
		
		addedUma[Positions.First].uma = upperSplitUma;
		addedUma[Positions.Second].uma = upperSplitUma;
		addedUma[Positions.Third].uma = lowerSplitUma;
		addedUma[Positions.Fourth].uma = lowerSplitUma;
	}
	
	// 1st, 2nd and 3rd are tied
	else if (
		sortedPlayers[Positions.First].raw === sortedPlayers[Positions.Second].raw &&
		sortedPlayers[Positions.Second].raw === sortedPlayers[Positions.Third].raw &&
		sortedPlayers[Positions.Third].raw !== sortedPlayers[Positions.Fourth].raw
	) {
		const firstUmaValue = rule.amount[Positions.First];
		const secondUmaValue = rule.amount[Positions.Second];
		const thirdUmaValue = rule.amount[Positions.Third];
		const splitUma = (firstUmaValue + secondUmaValue + thirdUmaValue)/3;
		
		addedUma[Positions.First].uma = splitUma;
		addedUma[Positions.Second].uma = splitUma;
		addedUma[Positions.Third].uma = splitUma;
		addedUma[Positions.Fourth].uma = rule.amount[Positions.Fourth];
	}
	
	// 2nd, 3rd and 4th are tied
	else if (
		sortedPlayers[Positions.First].raw !== sortedPlayers[Positions.Second].raw &&
		sortedPlayers[Positions.Second].raw === sortedPlayers[Positions.Third].raw &&
		sortedPlayers[Positions.Third].raw === sortedPlayers[Positions.Fourth].raw
	) {
		const secondUmaValue = rule.amount[Positions.Second];
		const thirdUmaValue = rule.amount[Positions.Third];
		const fourthUmaValue = rule.amount[Positions.Fourth];
		const splitUma = (secondUmaValue + thirdUmaValue + fourthUmaValue)/3;
		
		addedUma[Positions.First].uma = rule.amount[Positions.First];
		addedUma[Positions.Second].uma = splitUma;
		addedUma[Positions.Third].uma = splitUma;
		addedUma[Positions.Fourth].uma = splitUma;
	}
	
	// everyone is tied
	else if (
		sortedPlayers[Positions.First].raw === sortedPlayers[Positions.Second].raw &&
		sortedPlayers[Positions.Second].raw === sortedPlayers[Positions.Third].raw &&
		sortedPlayers[Positions.Third].raw === sortedPlayers[Positions.Fourth].raw
	) {
		const splitUma = (rule.amount[Positions.First] + rule.amount[Positions.Second] + rule.amount[Positions.Third] + rule.amount[Positions.Fourth])/4;
		
		addedUma[Positions.First].uma = splitUma;
		addedUma[Positions.Second].uma = splitUma;
		addedUma[Positions.Third].uma = splitUma;
		addedUma[Positions.Fourth].uma = splitUma;
	}

	//Step 4: sort players back by seat order
	const resortedPlayers = addedUma.sort((a: Player, b: Player) => {
		if (a.seat > b.seat) return 1;
		if (a.seat < b.seat) return -1;
		return 0;
	});

	return [
		resortedPlayers[Seats.East].uma,
		resortedPlayers[Seats.South].uma,
		resortedPlayers[Seats.West].uma,
		resortedPlayers[Seats.North].uma
	];
};