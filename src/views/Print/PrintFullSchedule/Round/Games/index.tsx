import { Game, Player } from "../../../../../data-types/tournament-data-types";

type GamesProps = {
	games: Game[],
	playerList: Player[]
};

const Games = (props: GamesProps) => {
	return (
		<tbody>
			{props.games.map((game: Game, index: number) => (
				<tr key={`game-tr-${index}`}>
					<th scope={"row"}>Table {game.table + 1}</th>
					<td>{props.playerList[game.participants[0].playerId].name}</td>
					<td>{props.playerList[game.participants[1].playerId].name}</td>
					<td>{props.playerList[game.participants[2].playerId].name}</td>
					<td>{props.playerList[game.participants[3].playerId].name}</td>
				</tr>
			))}
		</tbody>
	);
};

export default Games;