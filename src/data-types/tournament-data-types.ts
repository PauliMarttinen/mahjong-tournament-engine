export type GeneralInfo = {
	title: string,
	rounds: number
};

export type Score = {
	raw: number,
	uma: number,
	penalty: number
};

export type Seat = {
	playerId: number,
	score: Score
};

export type Participants = [Seat, Seat, Seat, Seat];

export type Game = {
	round: number,
	table: number,
	finished: boolean,
	participants: Participants
};

export type Tournament = {
	info: GeneralInfo,
	playerNames: string[],
	seatingTemplate: number[][],
	games: Game[]
};

export type Standing = {
	rank: number,
	playerId: number,
	points: number,
	change: number
};

export type PointInputType = {
	positive: boolean,
	value: number
};

export const isTournamentDataValid = (data: Tournament): boolean => {
	return (
		//Check that general tournament info is intact
		"info" in data &&
		"title" in data.info && typeof data.info.title === "string" &&
		"rounds" in data.info && typeof data.info.rounds === "number" &&

		//Check that player names are ok
		"playerNames" in data &&
		!data.playerNames.some((name: string): boolean => typeof name !== "string") &&

		//Check that game data is ok
		"games" in data &&
		data.games.length >= data.info.rounds * (data.playerNames.length/4)

		/*TODO: check that
		-each round has every player exactly once
		- there are no player id's outside actual player id range
		- there are no games with duplicate player ids
		-each round is named exactly data.tables.length times
		-each table is named exactly data.info.rounds times
		-each participant in each game has a valid score object
	*/
	);
};