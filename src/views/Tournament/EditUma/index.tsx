import { useState } from "react";
import { useTournament } from "../../../utils/hooks/useTournament";
import LayoutHeader from "../../../components/LayoutHeader";
import LayoutContent from "../../../components/LayoutContent";
import { Button, Space } from "antd";
import Uma from "../../../components/Uma";
import { type Game, type Uma as UmaType } from "../../../data-types/tournament-data-types";
import styles from "./EditUma.module.css";
import { useDispatch } from "react-redux";
import { bindActionCreators } from "redux";
import { tournamentActionCreators } from "../../../state";
import { getUma } from "../HanchanResults/ResultEditor/utils/getUma";
import { Seats } from "../../../data-types/app-data-types";

const EditUma = () => {
	const tournament = useTournament();
	const [currentUma, setCurrentUma] = useState<UmaType>(tournament.info.uma);
	const dispatch = useDispatch();
	const {editTournamentInfo, addGames} = bindActionCreators(tournamentActionCreators, dispatch);

	const save = () => {
		editTournamentInfo({
			...tournament.info,
			uma: currentUma
		});
	};

	const saveRetroactive = () => {
		save();

		const updatedGames = tournament.games.map((game: Game): Game => {
			if (!game.finished) return game;

			const eastScore = game.participants[Seats.East].score;
			const southScore = game.participants[Seats.South].score;
			const westScore = game.participants[Seats.West].score;
			const northScore = game.participants[Seats.North].score;

			const [updatedEastUma, updatedSouthUma, updatedWestUma, updatedNorthUma] = getUma(
				currentUma,
				[eastScore, southScore, westScore, northScore]
			);

			return {
				...game,
				participants: [
					{
						...game.participants[Seats.East],
						score: {
							...game.participants[Seats.East].score,
							uma: updatedEastUma
						}
					},
					{
						...game.participants[Seats.South],
						score: {
							...game.participants[Seats.South].score,
							uma: updatedSouthUma
						}
					},
					{
						...game.participants[Seats.West],
						score: {
							...game.participants[Seats.West].score,
							uma: updatedWestUma
						}
					},
					{
						...game.participants[Seats.North],
						score: {
							...game.participants[Seats.North].score,
							uma: updatedNorthUma
						}
					}
				]
			}
		});

		addGames(updatedGames);
	};

	const cancel = () => {
		setCurrentUma(tournament.info.uma);
	};

	return (
		<>
			<LayoutHeader>Edit uma</LayoutHeader>
			<LayoutContent className={styles.editUma}>
				<Uma
					uma={currentUma}
					onChange={setCurrentUma}
				/>
				<Space className={styles.button} direction={"vertical"}>
					<Button
						type={"primary"}
						onClick={save}>
						Save without changing previous games
					</Button>
					<Button
						type={"primary"}
						onClick={saveRetroactive}>
						Save and update previous games
					</Button>
					<Button
						type={"default"}
						onClick={cancel}>
						Cancel changes
					</Button>
				</Space>
			</LayoutContent>
		</>
	);
};

export default EditUma;