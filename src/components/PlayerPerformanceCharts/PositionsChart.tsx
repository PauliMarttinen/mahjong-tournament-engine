import {useMemo} from "react";
import useTournament from "../../utils/hooks/useTournament";
import { generateArray } from "../../utils/generateArray";
import { Game, Seat } from "../../data-types/tournament-data-types";
import {
	LineChart,
	Line,
	XAxis,
	YAxis,
	CartesianGrid,
	ReferenceLine
} from "recharts";

type PositionDataPoint = {
	name: string,
	position: number
};

type PositionData = {
	evolution: PositionDataPoint[],
	mean: number
};

type PositionsChartProps = {
	playerId: number,
};

const PositionsChart = (props: PositionsChartProps) => {
	const tournament = useTournament();

	// Data format for recharts: Array of objects for each round. Object contains round label ("name") and 
	//  properties of each line's value for that line.

	//For position graph, get position evolution and mean position.
	const positions: PositionData = useMemo(() => {
		const evolution: PositionDataPoint[] = generateArray(tournament.info.rounds).map((round: number): PositionDataPoint => ({
			name: `${round + 1}`,
			position: 1 + tournament.games
				//Get the game of current round that the selected player played in
				.filter((game: Game): boolean => game.round === round && game.participants.some((seat: Seat): boolean => seat.playerId === props.playerId))[0]
				//Sort participants of that game
				.participants.slice().sort((a: Seat, b: Seat) => (b.score.raw + b.score.uma) - (a.score.raw + a.score.uma))
				//Find position of the selected player
				.findIndex((seat: Seat) => seat.playerId === props.playerId)
		}));

		const mean = evolution.reduce((carry: number, point: PositionDataPoint): number => carry+point.position, 0) / tournament.info.rounds;

		return {
			evolution,
			mean
		};
	}, [props.playerId]);

	return (
		<LineChart
			width={700}
			height={200}
			data={positions.evolution}>
			<CartesianGrid strokeDasharray="3 3" />
			<XAxis dataKey="name" />
			<YAxis reversed={true} domain={[0, 4]}/>
			<ReferenceLine y={positions.mean} stroke="#7777ff" />
			<Line
				dataKey={"position"}
				stroke={"#ff0000"}
				dot={true}
				isAnimationActive={false}
			/>
		</LineChart>
	);
};

export default PositionsChart;