import { Standing } from "../../../data-types/tournament-data-types";
import { formatPoints } from "../../../utils/formatPoints";
import useStandings from "../../../utils/hooks/useStandings";
import useTournament from "../../../utils/hooks/useTournament";

type StandingsProps = {
	className?: string,
	afterRound: number
};

const PlainText = (props: StandingsProps) => {
	const tournament = useTournament();
	const standings = useStandings();

	return (
		<div>
			<pre>
				{
					standings[props.afterRound].map((standing: Standing, rank: number) => {
						const player = tournament.playerList[standing.playerId];
						const displayRank = player.substitute ? "--" : rank + 1;
						const name = player.name;
						const points = formatPoints({points: standing.points, sign: true});
						return `${displayRank}.\t${name}\t${points}\n`
					})
				}
			</pre>
		</div>
	);
};

export default PlainText;