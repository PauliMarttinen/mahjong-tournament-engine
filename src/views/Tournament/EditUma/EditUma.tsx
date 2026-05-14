import { useState } from "react";
import useTournament from "../../../utils/hooks/useTournament";
import LayoutHeader from "../../../components/LayoutHeader";
import LayoutContent from "../../../components/LayoutContent";
import { Button, Alert } from "antd";
import Uma from "../../../components/Uma/Uma";
import { type Uma as UmaType } from "../../../data-types/tournament-data-types";
import styles from "./EditUma.module.css";
import { useDispatch } from "react-redux";
import { bindActionCreators } from "redux";
import { tournamentActionCreators } from "../../../state";

const EditUma = () => {
	const tournament = useTournament();
	const [currentUma, setCurrentUma] = useState<UmaType>(tournament.info.uma);
	const dispatch = useDispatch();
	const {editTournamentInfo} = bindActionCreators(tournamentActionCreators, dispatch);

	const onSave = () => {
		editTournamentInfo({
			...tournament.info,
			uma: currentUma
		});
	};

	return (
		<>
			<LayoutHeader>Edit uma</LayoutHeader>
			<LayoutContent className={styles.editUma}>
				<Uma
					uma={currentUma}
					onChange={setCurrentUma}
				/>
				<div className={styles.button}>
					<Button
						type={"primary"}
						onClick={onSave}>
						Save
					</Button>
				</div>
				<Alert
					type={"warning"}
					message={<>Note: Editing uma will <strong>not</strong> affect those games whose score has already been entered.</>}
				/>
			</LayoutContent>
		</>
	);
};

export default EditUma;