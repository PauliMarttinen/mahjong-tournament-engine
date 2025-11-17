import { useState } from "react";
import { useDispatch } from "react-redux";
import { tournamentActionCreators } from "../../../state";
import { bindActionCreators } from "redux";
import useTournament from "../../../utils/hooks/useTournament";
import type { Player } from "../../../data-types/tournament-data-types";
import {Input, Switch, Button, Modal} from "antd";
import LayoutHeader from "../../../components/LayoutHeader";
import LayoutContent from "../../../components/LayoutContent";
import styles from "./EditPlayers.module.css";

const EditPlayers = () => {
	const dispatch = useDispatch();
	const tournament = useTournament();

	const {addPlayers} = bindActionCreators(tournamentActionCreators, dispatch)

	const [newList, setNewList] = useState<Player[]>([...tournament.playerList])
	const [duplicates, setDuplicates] = useState<string[]>([]);

	const changeName = (params: {newName: string, playerId: number}): void => {
		setNewList(newList.map((oldPlayer: Player, index: number) => index === params.playerId ? {...oldPlayer, name: params.newName} : oldPlayer))
	};

	const switchSubstitute = (playerId: number): void => {
		setNewList(newList.map((oldPlayer: Player, index: number) => index === playerId ? {...oldPlayer, substitute: !oldPlayer.substitute} : oldPlayer))
	};

	const saveChanges = (): void => {
		const duplicatesFromInput = newList.map((player: Player) => player.name).filter((name: string, index: number, newNames: string[]) => newNames.indexOf(name) !== index);

		if (duplicatesFromInput.length > 0)
		{
			setDuplicates(duplicatesFromInput);
			return;
		}

		addPlayers(newList);
	};

	return (
		<>
			<Modal
				title={"Duplicate player names"}
				open={duplicates.length > 0}
				centered={true}
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
			<LayoutHeader>Edit players</LayoutHeader>
			<LayoutContent>
				<table className={styles.editPlayersTable}>
					<thead>
						<tr>
							<th>Previous name</th>
							<th>New name</th>
							<th>{null}</th>
							<th>Substitute</th>
						</tr>
					</thead>
					<tbody>
						{
							tournament.playerList.map((player: Player, playerId: number) => (
								<tr key={`editname-${playerId}`}>
									<td>
										{player.name}
									</td>
									<td>
										<Input
											value={newList[playerId].name}
											onChange={(e) => changeName({newName: e.target.value, playerId})}
										/>
									</td>
									<td>
										{
											player.name !== newList[playerId].name &&
											"*"
										}
									</td>
									<td className={styles.substituteCell}>
										<Switch
											value={newList[playerId].substitute}
											onChange={() => switchSubstitute(playerId)}
											size={"small"}
										/>
									</td>
								</tr>
							))
						}
					</tbody>
				</table>
				<Button
					type={"primary"}
					onClick={() => saveChanges()}>
					Save changes
				</Button>
			</LayoutContent>
		</>
	)
};

export default EditPlayers;