import * as versionValidators from "./updateTournamentFormat/versionValidators";
import type { Version0 } from "./updateTournamentFormat/version0/Version0";
import type { Version1 } from "./updateTournamentFormat/version1/Version1";
import type { Version2 } from "./updateTournamentFormat/version2/Version2";
import type { Version3 } from "./updateTournamentFormat/version3/Version3";

export type Round = {
	scheduledStart: string,
	realStart: string
};

export enum UmaTiebreak {
	Headbump = "headbump",
	Split = "split"
};

export type UmaAmount = [PointInputType, PointInputType, PointInputType, PointInputType];

export type Uma = {
	automatic: boolean,
	tiebreak: UmaTiebreak,
	amount: UmaAmount
};

export type GeneralInfo = {
	title: string,
	roundLength: number,
	rounds: Round[],
	uma: Uma
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

export type AllVersions = Version0|Version1|Version2|Version3;

export type Tournament = Version3;

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
		|| versionValidators.isValidVersion1(data as Version1)
		|| versionValidators.isValidVersion2(data as Version2)
		|| versionValidators.isValidVersion3(data as Version3);
};