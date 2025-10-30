import { useState } from "react";
import { useDispatch } from "react-redux";
import Popup from "../../../components/Popup";
import TextInput from "../../../components/TextInput";
import { tournamentActionCreators } from "../../../state";
import { bindActionCreators } from "redux";
import Button from "../../../components/Button";
import useTournament from "../../../utils/hooks/useTournament";
import { Player } from "../../../data-types/tournament-data-types";

const EditPlayers = () => {
	const dispatch = useDispatch();
	const tournament = useTournament();

	const {addPlayers} = bindActionCreators(tournamentActionCreators, dispatch)

	const [newList, setNewList] = useState<Player[]>([...tournament.playerList])
	const [duplicates, setDuplicates] = useState<string[]>([]);

	const changeName = (params: {newName: string, playerId: number}): void => {
		setNewList(newList.map((oldPlayer: Player, index: number) => index === params.playerId ? {...oldPlayer, name: params.newName} : oldPlayer))
	};

	const saveNames = (): void => {
		const duplicatesFromInput = newList.map((player: Player) => player.name).filter((name: string, index: number, newNames: string[]) => newNames.indexOf(name) !== index);

		if (duplicatesFromInput.length > 0)
		{
			setDuplicates(duplicatesFromInput);
			return;
		}

		addPlayers(newList);
	};

	return (
		<div>
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
			<h1>Edit player names</h1>
			<table>
				<tbody>
					<tr>
						<th>Previous name</th>
						<th>New name</th>
						<th>{null}</th>
					</tr>
					{
						tournament.playerList.map((player: Player, playerId: number) => (
							<tr key={`editname-${playerId}`}>
								<td>
									{player.name}
								</td>
								<td>
									<TextInput
										label={""}
										value={newList[playerId].name}
										onChange={(newValue: string) => changeName({newName: newValue, playerId: playerId})}
									/>
								</td>
								<td>
									{
										player.name !== newList[playerId].name &&
										"*"
									}
								</td>
							</tr>
						))
					}
				</tbody>
			</table>
			<Button
				label={"Save new names"}
				onClick={() => saveNames()}
			/>
		</div>
	)
};

export default EditPlayers;