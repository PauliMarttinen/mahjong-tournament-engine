import { useDispatch } from "react-redux";
import { bindActionCreators } from "redux";
import { tournamentActionCreators, appActionCreators } from "../../state";
import { Tournament } from "../../data-types/tournament-data-types";
import { useNavigate } from "react-router-dom";
import Button from "../../components/Button";
import styles from "./Entrance.module.css";
import { findRoute, Routes } from "../../utils/routeUtils";
import React from "react";
import saveTournamentFile from "../../utils/saveTournamentFile";
import FileUpload from "../../components/FileUpload";
import shouldOfferStoredGame from "./utils/shouldOfferStoredGame";
import updateTournamentFormat from "../../data-types/updateTournamentFormat/updateTournamentFormat";

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
			<div>
				<div className={styles.buttonContainer}>
					<Button
						className={styles.button}
						label={"Start new tournament"}
						subLabel={`${offerStoredGame ? "Tournament stored in memory will be wiped out." : ""}`}
						onClick={() => startNewTournament()}
					/>
				</div>
				<div className={styles.buttonContainer}>
					<FileUpload
						className={styles.button}
						label={"Open tournament file"}
						onUpload={(content) => loadFromFile(content)}
					/>
				</div>
				{
					offerStoredGame &&
					<React.Fragment>
						<div className={styles.buttonContainer}>
							<Button
								className={styles.button}
								label={"Load tournament from memory"}
								subLabel={"There seems to be a tournament stored in browser storage."}
								onClick={() => loadFromLocalStorage()}
							/>
						</div>
						<div className={styles.buttonContainer}>
							<Button
								className={styles.button}
								label={"Save tournament to file"}
								subLabel={"The tournament stored in browser storage."}
								onClick={() => saveTournamentToFile()}
							/>
						</div>
					</React.Fragment>
				}
			</div>
		</div>
	);
};

export default Entrance;