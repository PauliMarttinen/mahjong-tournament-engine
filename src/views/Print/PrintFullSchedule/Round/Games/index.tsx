import { Game } from "../../../../../data-types/tournament-data-types";

type GamesProps = {
	games: Game[],
	playerNames: string[]
};

const Games = (props: GamesProps) => {
	return (
		<tbody>
			{props.games.map((game: Game, index: number) => (
				<tr key={`game-tr-${index}`}>
					<th scope={"row"}>Table {game.table + 1}</th>
					<td>{props.playerNames[game.participants[0].playerId]}</td>
					<td>{props.playerNames[game.participants[1].playerId]}</td>
					<td>{props.playerNames[game.participants[2].playerId]}</td>
					<td>{props.playerNames[game.participants[3].playerId]}</td>
				</tr>
			))}
		</tbody>
	);
};

export default Games;