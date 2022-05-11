import { useState, useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";
import { bindActionCreators } from "redux";
import { Views } from "../../data-types/app-data-types";
import { tournamentActionCreators, State, appActionCreators } from "../../state";

import { Game, PointSticks, Table } from "../../data-types/tournament-data-types";
import TextInput from "../../components/TextInput";
import NumberInput from "../../components/NumberInput";

import { generateArray } from "../../utils/generateArray";
import { allMeetings, generateSeating, violations } from "../../utils/generateSeating";

const PlayerEntryView = () => {
  const defaultPointSticks: PointSticks = {
    tenThousand: 1,
    fiveThousand: 2,
    oneThousand: 9,
    fiveHundred: 1,
    oneHundred: 5
  };

  const defaultTable: Table = {
    setOwner: "",
    matOwner: "",
    notes: "",
    pointSticks: defaultPointSticks
  };

  const [currentPointSticks, setCurrentPointSticks] = useState<PointSticks>(defaultPointSticks);
  const [currentTable, setCurrentTable] = useState<Table>(defaultTable);
  const [tables, setTables] = useState<Table[]>([]);
  const dispatch = useDispatch();
  const tournamentState = useSelector((state: State) => state.tournament);

  useEffect(() => {
    setCurrentTable({
      ...currentTable,
      pointSticks: currentPointSticks
    })
  }, [currentPointSticks]);

  const {addTables, addGames} = bindActionCreators(tournamentActionCreators, dispatch);
  const {changeView} = bindActionCreators(appActionCreators, dispatch);

  const totalPoints = (({tenThousand, fiveThousand, oneThousand, fiveHundred, oneHundred}) => {
    return tenThousand*10 + fiveThousand*5 + oneThousand + fiveHundred*0.5 + oneHundred*0.1;
  })(currentTable.pointSticks);

  const correctPointSticks = totalPoints === 30 - tournamentState.info.oka;

  const enoughTables = tables.length === tournamentState.playerNames.length / 4;

  const storeTable = (): void => {
    setTables([...tables, currentTable]);
    setCurrentPointSticks(defaultPointSticks);
    setCurrentTable(defaultTable);
  };

  const createGamesData = (): Game[] => {
    //Generate seating plan. Bad algorithm. TODO: Make a better one.
    const rounds = generateArray(tournamentState.info.rounds);
    const tables = generateArray(tournamentState.playerNames.length/4);

    const seating = generateSeating(tournamentState.playerNames.length/4, tournamentState.info.rounds);

    const meetings = allMeetings(seating);
    console.log(meetings);
    console.log(violations(meetings));

    return rounds.map((round: number): Game[] => 
      tables.map((table: number): Game => ({
        round: round,
        table: table,
        finished: false,
        score: {
          east: {
            playerId: seating[round][table][0],
            points: 0
          },
          south: {
            playerId: seating[round][table][1],
            points: 0
          },
          west: {
            playerId: seating[round][table][2],
            points: 0
          },
          north: {
            playerId: seating[round][table][3],
            points: 0
          }
        }
      }))
    ).reduce((combined: Game[], round: Game[]): Game[] => [...combined, ...round], []);
  };

  const saveAndContinue = (): void => {
    addTables(tables);
    addGames(createGamesData());
    changeView(Views.InTournament);
  };

  return (
    <div>
      <h1>Enter Table Information</h1>
      {
        !enoughTables &&
        <div>
          <p>Enter information for table {tables.length + 1}.</p>
          <p>{tournamentState.playerNames.length/4} tables are needed.</p>
        </div>
      }
      <TextInput
        label={"Set owner"}
        value={currentTable.setOwner}
        onChange={(newValue: string): void => setCurrentTable({...currentTable, setOwner: newValue})}
        disabled={enoughTables}
      />
      <TextInput
        label={"Mat owner"}
        value={currentTable.matOwner}
        onChange={(newValue: string): void => setCurrentTable({...currentTable, matOwner: newValue})}
        disabled={enoughTables}
      />
      <TextInput
        label={"Notes"}
        value={currentTable.notes}
        onChange={(newValue: string): void => setCurrentTable({...currentTable, notes: newValue})}
        disabled={enoughTables}
      />
      <NumberInput
        label={"10k sticks"}
        value={currentTable.pointSticks.tenThousand}
        onChange={(newValue: number): void => setCurrentPointSticks({...currentPointSticks, tenThousand: newValue})}
        steps={[1]}
        disabled={enoughTables}
      />
      <NumberInput
        label={"5k sticks"}
        value={currentTable.pointSticks.fiveThousand}
        onChange={(newValue: number): void => setCurrentPointSticks({...currentPointSticks, fiveThousand: newValue})}
        steps={[1]}
        disabled={enoughTables}
      />
      <NumberInput
        label={"1k sticks"}
        value={currentTable.pointSticks.oneThousand}
        onChange={(newValue: number): void => setCurrentPointSticks({...currentPointSticks, oneThousand: newValue})}
        steps={[1]}
        disabled={enoughTables}
      />
      <NumberInput
        label={"500 sticks"}
        value={currentTable.pointSticks.fiveHundred}
        onChange={(newValue: number): void => setCurrentPointSticks({...currentPointSticks, fiveHundred: newValue})}
        steps={[1]}
        disabled={enoughTables}
      />
      <NumberInput
        label={"100 sticks"}
        value={currentTable.pointSticks.oneHundred}
        onChange={(newValue: number): void => setCurrentPointSticks({...currentPointSticks, oneHundred: newValue})}
        steps={[1]}
        disabled={enoughTables}
      />
      <p>Total points {totalPoints}.</p>
      <button
        disabled={!correctPointSticks || enoughTables}
        onClick={() => storeTable()}>
        Store table
      </button>
      <button
        disabled={!enoughTables}
        onClick={() => saveAndContinue()}>
        Save tables and continue
      </button>
      <table>
        <thead>
          <tr>
            <th>Table</th>
            <th>Set owner</th>
            <th>Mat owner</th>
            <th>Notes</th>
            <th>Point sticks</th>
          </tr>
        </thead>
        <tbody>
          {
            tables.map((table: Table, index: number) => (
              <tr key={`table-tr-${index}`}>
                <td>
                  Table {index + 1}
                </td>
                <td>
                  {table.setOwner}
                </td>
                <td>
                  {table.matOwner}
                </td>
                <td>
                  {table.notes}
                </td>
                <td>
                  {table.pointSticks.tenThousand} - {table.pointSticks.fiveThousand} - {table.pointSticks.oneThousand} - {table.pointSticks.fiveHundred} - {table.pointSticks.oneHundred}
                </td>
              </tr>
            ))
          }
        </tbody>
      </table>
    </div>
  );
};

export default PlayerEntryView;