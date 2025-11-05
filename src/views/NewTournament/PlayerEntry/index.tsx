import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { bindActionCreators } from "redux";
import Button from "../../../components/Button";
import Popup from "../../../components/Popup";
import { tournamentActionCreators } from "../../../state";
import { Routes } from "../../../utils/routeUtils";
import styles from "./PlayerEntryView.module.css";

const PlayerEntryView = () => {
	const [playersInput, setPlayersInput] = useState<string>("");
	const [duplicates, setDuplicates] = useState<string[]>([]);
	const [randomize, setRandomize] = useState<boolean>(false);

	const dispatch = useDispatch();
	const navigate = useNavigate();
	const {addPlayers} = bindActionCreators(tournamentActionCreators, dispatch);

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
		<div>
			<h1>Enter players</h1>
			{
				duplicates.length > 0 &&
				<Popup
					title={"Duplicate players"}
					cancelHidden={true}
					cancelText={""}
					onCancel={() => {}}
					confirmText={"Ok"}
					onConfirm={(): void => setDuplicates([])}>
					<p>Please add some uniqueness (e.g. middle initial, nickname or city) to the names of these players:</p>
					<ul>
					{
						duplicates.map((name: string) => <li key={`duplicate-${name}`}>{name}</li>)
					}
					</ul>
				</Popup>
			}
			<p>Enter players, one per line. Currently {players.length} players.</p>
			<textarea
				className={styles.playerEntry}
				value={playersInput}
				onChange={(e) => setPlayersInput(e.target.value)}
			/>
			
			<p>
				<input
					type={"checkbox"}
					checked={randomize}
					name={"randomize"}
					id={"randomize"}
					onChange={() => setRandomize(!randomize)}
				/>
				<label htmlFor={"randomize"}>Randomize the order of names.</label>
			</p>
			<p>
				<Button
					label={"Save players"}
					onClick={() => save()}
					disabled={!rightAmount}
				/>
				{
					!rightAmount &&
					"Must have a number of players that is divisible by 4."
				}
			</p>
		</div>
	);
};

export default PlayerEntryView;