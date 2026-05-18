import { useState } from "react";
import useTournament from "../../../utils/hooks/useTournament";
import LayoutHeader from "../../../components/LayoutHeader";
import LayoutContent from "../../../components/LayoutContent";
import { Button, Space } from "antd";
import Uma from "../../../components/Uma";
import { type Game, type Uma as UmaType } from "../../../data-types/tournament-data-types";
import styles from "./EditUma.module.css";
import { useDispatch } from "react-redux";
import { bindActionCreators } from "redux";
import { tournamentActionCreators } from "../../../state";
import getUma from "../HanchanResults/ResultEditor/utils/getUma2";

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

			const eastScore = game.participants[0].score;
			const southScore = game.participants[1].score;
			const westScore = game.participants[2].score;
			const northScore = game.participants[3].score;

			const [updatedEastUma, updatedSouthUma, updatedWestUma, updatedNorthUma] = getUma(
				currentUma,
				[eastScore, southScore, westScore, northScore]
			);

			return {
				...game,
				participants: [
					{
						...game.participants[0],
						score: {
							...game.participants[0].score,
							uma: updatedEastUma
						}
					},
					{
						...game.participants[1],
						score: {
							...game.participants[1].score,
							uma: updatedSouthUma
						}
					},
					{
						...game.participants[2],
						score: {
							...game.participants[2].score,
							uma: updatedWestUma
						}
					},
					{
						...game.participants[3],
						score: {
							...game.participants[3].score,
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