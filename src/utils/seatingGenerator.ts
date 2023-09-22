type Game = [number, number, number, number]; 

const seatingGenerator = (playerCount: number, roundCount: number) => {
	if (playerCount%4 !== 0) throw new Error("Player count must be divisible by 4.")

	const getWindOfPlayer = (playerId: number) => playerId%4; 
 
	const getPlayerOfWind = (playerNumber: number, wind: number) => playerNumber+4*wind; 

	const getPlayersOfWind = (wind: number) => Array(playerCount/4)
		.fill(0)
		.map((_: number, set: number) => wind+4*set);

	const playersMetTimes = (games: Game[][], playerA: number, playerB: number) => { 
    return games.reduce((overall: number, round: Game[]) => { 
        return overall + round.reduce((withinRound: number, game: Game) => { 
            return game.indexOf(playerA) !== -1 && game.indexOf(playerB) !== -1 ? withinRound + 1 : withinRound; 
        }, 0) 
    }, 0); 
	}
	
	return Array(roundCount).fill(0).reduce((carry: Game[][], _: number, round: number): Game[][] => {
			if (round === 0)
			{
				return [Array(playerCount/4)
					.fill(0)
					.map((_: number, table: number): Game => [
						4*table,
						4*table+1,
						4*table+2,
						4*table+3
					])];
			}
			
			return [...carry];
    }, []);
};

export default seatingGenerator;