import { useMemo } from "react";
import { Game, Score, Seat, Tournament } from "../../../../data-types/tournament-data-types";
import { generateArray } from "../../../../utils/generateArray";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Legend
} from "recharts";

type CumulativePointsProps = {
  tournament: Tournament,
  playerId: number
};

const CumulativePoints = (props: CumulativePointsProps) => {
  //For cumulative points chart, reduce game of that round and earlier rounds into a score sum.
  const cumulativePoints = useMemo(() => generateArray(props.tournament.info.rounds).map((round: number): Score => (
    props.tournament.games.reduce((carry: Score, game: Game): Score => {
      const seat = game.participants.findIndex((seat: Seat): boolean => seat.playerId === props.playerId);

      //Skip the games that the player didn't play in, and games that aren't in the range of round
      if (game.round > round || seat === -1)
      {
        return carry;
      }

      //Otherwise the player did play in this game, so we sum their score from this game to the carried sum.
      return {
        raw: carry.raw + game.participants[seat].score.raw,
        uma: carry.uma + game.participants[seat].score.uma,
        penalty: carry.penalty + game.participants[seat].score.penalty,
      }
    }, {raw: 0, uma: 0, penalty: 0})
  )).map((cumulatedPoints: Score, round: number) => ({
    name: `${round + 1}`,
    total: cumulatedPoints.raw + cumulatedPoints.uma + cumulatedPoints.penalty,
    ...cumulatedPoints
  })), [props.playerId]);

  return (
    <div>
      <h3>Cumulative points</h3>
      <LineChart
        width={700}
        height={350}
        data={cumulativePoints}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis/>
        <Legend/>
        <Line
          dataKey={"raw"}
          stroke={"#00aa00"}
          dot={true}
          isAnimationActive={false}
        />
        <Line
          dataKey={"uma"}
          stroke={"#0000ff"}
          dot={true}
          isAnimationActive={false}
        />
        <Line
          dataKey={"penalty"}
          stroke={"#000000"}
          dot={true}
          isAnimationActive={false}
        />
        <Line
          dataKey={"total"}
          stroke={"#ff0000"}
          dot={true}
          isAnimationActive={false}
        />
      </LineChart>
    </div>
  );
};

export default CumulativePoints;