import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { bindActionCreators } from "redux";
import { Modal, Space, Button } from "antd";
import { newTournamentActionCreators } from "../../../state";
import { Routes } from "../../../utils/routeUtils";
import styles from "./PlayerEntryView.module.css";
import NewTournamentSteps from "../../../components/NewTournamentSteps";
import NamedSwitch from "./NamedSwitch";
import NamedPlayers from "./NamedPlayers";
import DivisibleWarning from "./DivisbleWarning";
import NamelessPlayers from "./NamelessPlayers";
import { generateArray } from "../../../utils/generateArray";

const PlayerEntryView = () => {
	const [playersInput, setPlayersInput] = useState<string>("");
	const [duplicates, setDuplicates] = useState<string[]>([]);
	const [randomize, setRandomize] = useState<boolean>(false);
	const [named, setNamed] = useState<boolean>(true);
	const [namelessCount, setNamelessCount] = useState<number>(20);

	const dispatch = useDispatch();
	const navigate = useNavigate();
	const {addPlayers} = bindActionCreators(newTournamentActionCreators, dispatch);

	const players: string[] = playersInput.split("\n").filter(name => name !== "");
	const rightAmount = (() => {
		if (named) return players.length > 0 && players.length % 4 === 0;
		return namelessCount % 4 === 0;
	})();

	const saveNamed = (): void => {
		const duplicatesFromInput = players.filter((name: string, index: number) => players.indexOf(name) !== index);

		if (duplicatesFromInput.length > 0)
		{
			setDuplicates(duplicatesFromInput);
			return;
		}

		const playersInOrder = randomize ? players.sort((a: string, b: string) => Math.random() - 0.5) : players;

		addPlayers(playersInOrder.map((name: string) => ({name: name, substitute: false})));
	};

	const saveNameless = (): void => {
		const playerNumbers = generateArray(namelessCount, 1);
		addPlayers(playerNumbers.map((playerNumber: number) => ({
			name: playerNumber.toString(),
			substitute: false
		})));
	};

	const save = (): void => {
		if (named) saveNamed();
		if (!named) saveNameless();
		navigate(Routes.SeatingTemplateEntry);
	};

	return (
		<>
			<NewTournamentSteps key={"newTournamentSteps"} current={2}/>
			<Modal
				centered={true}
				open={duplicates.length > 0}
				title={"Duplicate players"}
				onCancel={() => setDuplicates([])}
				footer={[
					<Button type={"primary"} onClick={() => setDuplicates([])}>Close</Button>
				]}>
				<p>Please add some uniqueness (e.g. middle initial, nickname or city) to the names of these players:</p>
				<ul>
				{
					duplicates.map((name: string) => <li key={`duplicate-${name}`}>{name}</li>)
				}
				</ul>
			</Modal>
			<Space
				className={styles.playerEntry}
				direction={"vertical"}>
				<h1>Enter players</h1>
				<NamedSwitch
					named={named}
					onChange={setNamed}
				/>
				{
					named
					?
					<NamedPlayers
						playersCount={players.length}
						textareaValue={playersInput}
						onChange={setPlayersInput}
						randomize={randomize}
						onSwitch={setRandomize}
					/>
					:
					<NamelessPlayers
						value={namelessCount}
						onChange={setNamelessCount}
					/>
				}
				<DivisibleWarning
					show={!rightAmount}
				/>
				<div className={styles.button}>
					<Button
						type={"primary"}
						onClick={() => save()}
						disabled={!rightAmount}>
						Save players
					</Button>
				</div>
			</Space>
		</>
	);
};

export default PlayerEntryView;