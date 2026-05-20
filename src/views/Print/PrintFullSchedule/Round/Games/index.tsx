import { type Game, type Player } from "../../../../../data-types/tournament-data-types";
import { Seats } from "../../../../../data-types/app-data-types";

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
					<td>{props.playerList[game.participants[Seats.East].playerId].name}</td>
					<td>{props.playerList[game.participants[Seats.South].playerId].name}</td>
					<td>{props.playerList[game.participants[Seats.West].playerId].name}</td>
					<td>{props.playerList[game.participants[Seats.North].playerId].name}</td>
				</tr>
			))}
		</tbody>
	);
};

export default Games;