import * as versionValidators from "./updateTournamentFormat/versionValidators";
import { Version0 } from "./updateTournamentFormat/version0/Version0";
import { Version1 } from "./updateTournamentFormat/version1/Version1";

export type GeneralInfo = {
	title: string,
	rounds: number
};

export type Score = {
	raw: number,
	uma: number,
	penalty: number
};

export type Player = {
	name: string,
	substitute: boolean
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

export type Meta = {
	dataFormatVersion: number
}

export type AllVersions = Version0|Version1;

export type Tournament = Version1;

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

export const isTournamentDataValid = (data: AllVersions): boolean => {
	return versionValidators.isValidVersion0(data as Version0)
		|| versionValidators.isValidVersion1(data as Version1);
};