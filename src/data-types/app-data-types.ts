export type BigScreen = WindowProxy|null;

export type App = {
	tournamentLoaded: boolean,
	bigScreen: BigScreen
};

export enum Seats {
	East = 0, South = 1, West = 2, North = 3
};

export enum Positions {
	First = 0, Second = 1, Third = 2, Fourth = 3
};