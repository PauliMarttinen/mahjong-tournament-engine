import {useState} from "react";
import { Game } from "../../../../data-types/tournament-data-types";
import useTournament from "../../../../utils/hooks/useTournament";
import { useDispatch } from "react-redux";
import { tournamentActionCreators } from "../../../../state";
import { bindActionCreators } from "redux";
import styles from "./ResultEditor.module.css";
import { Space, Switch, Alert, Button } from "antd";
import PointInput from "../../../../components/PointInput";

type ResultEditorProps = {
	tableId: number,
	roundId: number
};

const ResultEditor = (props: ResultEditorProps) => {
	const tournament = useTournament();
	const game = tournament.games.find((game: Game): boolean => game.round === props.roundId && game.table === props.tableId);
	const [safeMode, setSafeMode] = useState<boolean>(true);
	const [automaticUma, setAutomaticUma] = useState<boolean>(tournament.info.uma.automatic);

	const dispatch = useDispatch();
	const {addGames} = bindActionCreators(tournamentActionCreators, dispatch);

	return (
		<div className={styles.resultEditor}>
			<Space direction={"vertical"}>
				<Space>
					<Space>
					</Space>
				</Space>
			</Space>
		</div>
	);
};