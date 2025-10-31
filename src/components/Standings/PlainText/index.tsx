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
					standings[tournament.info.rounds - 1].map((standing: Standing, rank: number) => (
						`${rank + 1}.\t${tournament.playerList[standing.playerId].name}\t${formatPoints({points: standing.points, sign: true})}\n`
					))
				}
			</pre>
		</div>
	);
};

export default PlainText;