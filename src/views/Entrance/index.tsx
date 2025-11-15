import { useDispatch } from "react-redux";
import { bindActionCreators } from "redux";
import { tournamentActionCreators, appActionCreators } from "../../state";
import { Tournament } from "../../data-types/tournament-data-types";
import { useNavigate } from "react-router-dom";
import Button from "../../components/Button";
import styles from "./Entrance.module.css";
import { findRoute, Routes } from "../../utils/routeUtils";
import saveTournamentFile from "../../utils/saveTournamentFile";
import FileUpload from "../../components/FileUpload";
import shouldOfferStoredGame from "./utils/shouldOfferStoredGame";
import updateTournamentFormat from "../../data-types/updateTournamentFormat/updateTournamentFormat";
import { Space, Card, Alert } from "antd";

const Entrance = () => {
	const navigate = useNavigate();
	const dispatch = useDispatch();

	const { markTournamentLoaded } = bindActionCreators(appActionCreators, dispatch);
	const { setTournament } = bindActionCreators(tournamentActionCreators, dispatch);

	const offerStoredGame = shouldOfferStoredGame();

	const startNewTournament = () => {
		localStorage.removeItem("mahjong-tournament");
		markTournamentLoaded(true);
		navigate(Routes.TournamentInfoEntry);
	};

	const loadFromLocalStorage = () => {
		const tournament: Tournament = updateTournamentFormat(JSON.parse(localStorage.getItem("mahjong-tournament") as string)) as Tournament;
		const view = findRoute(tournament);
		markTournamentLoaded(true);
		setTournament(tournament);
		navigate(view);
	};

	const loadFromFile = (files: FileList | null) => {
		if (files === null) return;
		
		const fileReader = new FileReader();
		fileReader.onload = () => {
			const tournament: Tournament = updateTournamentFormat(JSON.parse(fileReader.result as string)) as Tournament;
			const view = findRoute(tournament);
			setTournament(tournament);
			markTournamentLoaded(true);
			navigate(view);
		};
		fileReader.readAsText(files[0]);
	};

	const saveTournamentToFile = () => {
		saveTournamentFile(JSON.parse(localStorage.getItem("mahjong-tournament") as string));
	};

	return (
		<div className={styles.entrance}>
			<Space
				className={styles.entrance}
				direction={"vertical"}>
				<h1>Mahjong Tournament Engine</h1>
				<Card>
					<Space
						direction={"vertical"}
						className={styles.space}>
						<Button
							onClick={startNewTournament}
							className={styles.button}>
							Start new tournament
						</Button>
						{
							offerStoredGame &&
							<Alert
								type={"warning"}
								message={"Tournament stored in browser storage will be wiped out."}
							/>
						}
					</Space>
				</Card>
				<Card>
					<FileUpload
						className={styles.button}
						label={"Open tournament file"}
						onUpload={(content) => loadFromFile(content)}
					/>
				</Card>
				{
					offerStoredGame &&
					<>
						<Card>
							<Space direction={"vertical"}>
								<Alert
									type={"info"}
									message={"There seems to be a tournament stored in your browser storage."}
								/>
								<Button
									onClick={loadFromLocalStorage}
									className={styles.button}>
									Load tournament from storage
								</Button>
								<Button
									onClick={saveTournamentToFile}
									className={styles.button}>
									Save tournament from storage to file
								</Button>
							</Space>
						</Card>
					</>
				}
			</Space>
		</div>
	);
};

export default Entrance;