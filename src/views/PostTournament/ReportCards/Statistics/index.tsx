import { useMemo } from "react";
import { Game, Score, Seat } from "../../../../data-types/tournament-data-types";
import { formatPoints } from "../../../../utils/formatPoints";

type PointStatistics = {
  highestSingle: number,
  lowestSingle: number,
  sum: number
}

type StatisticsType = {
  raw: PointStatistics,
  uma: PointStatistics,
  penalty: PointStatistics,
  total: PointStatistics,
  gamesPlayed: number
};

const initialStatistics: StatisticsType = {
  raw: {
    highestSingle: 0,
    lowestSingle: 0,
    sum: 0
  },
  uma: {
    highestSingle: 0,
    lowestSingle: 0,
    sum: 0
  },
  penalty: {
    highestSingle: 0,
    lowestSingle: 0,
    sum: 0
  },
  total: {
    highestSingle: 0,
    lowestSingle: 0,
    sum: 0
  },
  gamesPlayed: 0
};

type StatisticsProps = {
  playerId: number,
  games: Game[]
}

const Statistics = (props: StatisticsProps) => {
  const getTotal = (score: Score): number => score.raw + score.uma + score.penalty;

  const statistics: StatisticsType = useMemo(() => props.games.reduce((carry: StatisticsType, game: Game): StatisticsType => {
    //If the player wasn't part of this game, skip this game.
    if (!game.participants.some((seat: Seat): boolean => seat.playerId === props.playerId))
    {
      return carry;
    }

    const seatId = game.participants.findIndex((seat: Seat): boolean => seat.playerId === props.playerId);

    return {
      raw: {
        highestSingle: game.participants[seatId].score.raw > carry.raw.highestSingle ? game.participants[seatId].score.raw : carry.raw.highestSingle,
        lowestSingle: game.participants[seatId].score.raw < carry.raw.lowestSingle ? game.participants[seatId].score.raw : carry.raw.lowestSingle,
        sum: carry.raw.sum + game.participants[seatId].score.raw
      },
      uma: {
        highestSingle: game.participants[seatId].score.uma > carry.uma.highestSingle ? game.participants[seatId].score.uma : carry.uma.highestSingle,
        lowestSingle: game.participants[seatId].score.uma < carry.uma.lowestSingle ? game.participants[seatId].score.uma : carry.uma.lowestSingle,
        sum: carry.uma.sum + game.participants[seatId].score.uma
      },
      penalty: {
        highestSingle: game.participants[seatId].score.penalty > carry.penalty.highestSingle ? game.participants[seatId].score.penalty : carry.penalty.highestSingle,
        lowestSingle: game.participants[seatId].score.penalty < carry.penalty.lowestSingle ? game.participants[seatId].score.penalty : carry.penalty.lowestSingle,
        sum: carry.penalty.sum + game.participants[seatId].score.penalty
      },
      total: {
        highestSingle: getTotal(game.participants[seatId].score) > carry.total.highestSingle ? getTotal(game.participants[seatId].score) : carry.total.highestSingle,
        lowestSingle: getTotal(game.participants[seatId].score) < carry.total.lowestSingle ? getTotal(game.participants[seatId].score) : carry.total.lowestSingle,
        sum: carry.total.sum + getTotal(game.participants[seatId].score)
      },
      gamesPlayed: carry.gamesPlayed + 1
    };
  }, initialStatistics), [props.playerId]);

  return (
    <div>
      <h3>Statistics</h3>
      <table>
        <tbody>
          <tr>
            <td>{null}</td>
            <th>Sum</th>
            <th>Highest</th>
            <th>Lowest</th>
            <th>Mean</th>
          </tr>
          <tr>
            <th>Raw</th>
            <td>{formatPoints({points: statistics.raw.sum, sign: true})}</td>
            <td>{formatPoints({points: statistics.raw.highestSingle, sign: true})}</td>
            <td>{formatPoints({points: statistics.raw.lowestSingle, sign: true})}</td>
            <td>{formatPoints({points: statistics.raw.sum / statistics.gamesPlayed, sign: true})}</td>
          </tr>
          <tr>
            <th>Uma</th>
            <td>{formatPoints({points: statistics.uma.sum, sign: true})}</td>
            <td>{formatPoints({points: statistics.uma.highestSingle, sign: true})}</td>
            <td>{formatPoints({points: statistics.uma.lowestSingle, sign: true})}</td>
            <td>{formatPoints({points: statistics.uma.sum / statistics.gamesPlayed, sign: true})}</td>
          </tr>
          <tr>
            <th>Penalty</th>
            <td>{formatPoints({points: statistics.penalty.sum, sign: true})}</td>
            <td>{formatPoints({points: statistics.penalty.highestSingle, sign: true})}</td>
            <td>{formatPoints({points: statistics.penalty.lowestSingle, sign: true})}</td>
            <td>{formatPoints({points: statistics.penalty.sum / statistics.gamesPlayed, sign: true})}</td>
          </tr>
          <tr>
            <th>Total</th>
            <td>{formatPoints({points: statistics.total.sum, sign: true})}</td>
            <td>{formatPoints({points: statistics.total.highestSingle, sign: true})}</td>
            <td>{formatPoints({points: statistics.total.lowestSingle, sign: true})}</td>
            <td>{formatPoints({points: statistics.total.sum / statistics.gamesPlayed, sign: true})}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default Statistics;