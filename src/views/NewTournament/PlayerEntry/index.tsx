import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import readXlsxFile from "read-excel-file";
import { Row } from "read-excel-file/types";
import { bindActionCreators } from "redux";
import Button from "../../../components/Button";
import Popup from "../../../components/Popup";
import { Game, Score } from "../../../data-types/tournament-data-types";
import { tournamentActionCreators } from "../../../state";
import { convertTemplate } from "../../../utils/convertTemplate";
import { generateArray } from "../../../utils/generateArray";
import { generateSeating } from "../../../utils/generateSeating";
import { Routes } from "../../../utils/routeUtils";
import styles from "./PlayerEntryView.module.css";
import TemplateHelp from "./TemplateHelp";
import FileUpload from "../../../components/FileUpload";
import useTournament from "../../../utils/hooks/useTournament";

const defaultScore: Score = {
	raw: 0,
	uma: 0,
	penalty: 0
}

const PlayerEntryView = () => {
	const tournament = useTournament();

	const [showTemplateHelp, setShowTemplateHelp] = useState<boolean>(false);
	const [playersInput, setPlayersInput] = useState<string>("");
	const [duplicates, setDuplicates] = useState<string[]>([]);
	const [randomize, setRandomize] = useState<boolean>(false);
	const [customSeatingTemplate, setCustomSeatingTemplate] = useState<number[][] | null>(null);
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const {addGames, addPlayers} = bindActionCreators(tournamentActionCreators, dispatch)

	const players: string[] = playersInput.split("\n").filter(name => name !== "");

	const rightAmount = players.length > 0 && players.length % 4 === 0;

	const createGamesData = (seatingTemplate: number[][]): Game[] => {
		return generateArray(tournament.info.rounds).map((roundId: number): Game[] => (
			generateArray(players.length / 4).map((tableId: number): Game => ({
				round: roundId,
				table: tableId,
				finished: false,
				participants: [
					{
						playerId: seatingTemplate[tableId*4+0][roundId],
						score: defaultScore
					},
					{
						playerId: seatingTemplate[tableId*4+1][roundId],
						score: defaultScore
					},
					{
						playerId: seatingTemplate[tableId*4+2][roundId],
						score: defaultScore
					},
					{
						playerId: seatingTemplate[tableId*4+3][roundId],
						score: defaultScore
					}
				]
			}))
		)).reduce((combined: Game[], round: Game[]): Game[] => [...combined, ...round], []);
	};

	const getSeatingTemplate = () => 
		customSeatingTemplate === null
		?
		generateSeating({
			roundCount: tournament.info.rounds,
			tableCount: players.length / 4,
			playerCount: players.length
		})
		:
		customSeatingTemplate;    

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
		addGames(createGamesData(getSeatingTemplate()));
		navigate(Routes.Overview);
	};

	const readTemplateFile = (files: FileList | null) => {
		if (files === null) return;

		readXlsxFile(files[0]).then((excelRows: Row[]) => {
			setCustomSeatingTemplate(convertTemplate(excelRows));
		});
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
			<h2>Seating template</h2>
			<div>To use a seating template, upload one here:
				<FileUpload
					label={"Choose file"}
					onUpload={(content) => readTemplateFile(content)}
				/>
				<Button
					label="(help)"
					onClick={() => setShowTemplateHelp(true)}
				/>
			</div>
			<p>If you don't upload a template, an algithmically generated seating will be used. Note that the current version of Mahjong Tournament Engine does not generate good seatings.</p>
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
			{
				showTemplateHelp &&
				<TemplateHelp
					onClose={() => setShowTemplateHelp(false)}
				/>
			}
		</div>
	);
};

export default PlayerEntryView;