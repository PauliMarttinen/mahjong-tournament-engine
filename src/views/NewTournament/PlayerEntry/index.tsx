import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { bindActionCreators } from "redux";
import Button from "../../../components/Button";
import {Modal, Alert, Switch, Card, Space, Input} from "antd";
import { newTournamentActionCreators } from "../../../state";
import { Routes } from "../../../utils/routeUtils";
import styles from "./PlayerEntryView.module.css";

const PlayerEntryView = () => {
	const [playersInput, setPlayersInput] = useState<string>("");
	const [duplicates, setDuplicates] = useState<string[]>([]);
	const [randomize, setRandomize] = useState<boolean>(false);

	const dispatch = useDispatch();
	const navigate = useNavigate();
	const {addPlayers} = bindActionCreators(newTournamentActionCreators, dispatch);

	const players: string[] = playersInput.split("\n").filter(name => name !== "");
	const rightAmount = players.length > 0 && players.length % 4 === 0;

	const save = (): void => {
		//Check for duplicates, notify if they exist and don't save names yet.
		const duplicatesFromInput = players.filter((name: string, index: number) => players.indexOf(name) !== index);

		if (duplicatesFromInput.length > 0)
		{
			setDuplicates(duplicatesFromInput);
			return;
		}

		const playersInOrder = randomize ? players.sort((a: string, b: string) => Math.random() - 0.5) : players;

		addPlayers(playersInOrder.map((name: string) => ({name: name, substitute: false})));
		navigate(Routes.SeatingTemplateEntry);
	};

	return (
		<>
			<Modal
				open={duplicates.length > 0}
				title={"Duplicate players"}
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
			<div className={styles.playerEntry}>
				<Space direction={"vertical"}>
				<h1>Enter players</h1>
				<Card>
					<p>Enter players, one per line. Currently {players.length} players.</p>
					<Input.TextArea
						value={playersInput}
						onChange={(e) => setPlayersInput(e.target.value)}
					/>
				</Card>
				<Card>
					<Space>
						<Switch
							checked={randomize}
							id={"randomize"}
							onChange={() => setRandomize(!randomize)}
							size={"small"}
						/>
						<label htmlFor={"randomize"}>Randomize the order of names.</label>
					</Space>
				</Card>
				<div className={styles.button}>
					<Button
						onClick={() => save()}
						disabled={!rightAmount}>
						Save players
					</Button>
				</div>
				{
					!rightAmount &&
					<Alert
						type={"error"}
						message={"Must have a number of players that is divisible by 4."}
					/>
				}
				</Space>
			</div>
		</>
	);
};

export default PlayerEntryView;