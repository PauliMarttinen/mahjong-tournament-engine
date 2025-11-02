import { useState } from "react";
import { Game, Score } from "../../../data-types/tournament-data-types";
import { generateArray } from "../../../utils/generateArray";
import useTournament from "../../../utils/hooks/useTournament";
import { bindActionCreators } from "redux";
import { tournamentActionCreators } from "../../../state";
import { useDispatch } from "react-redux";
import { premadeSeatingTemplates } from "./premadeSeatingTemplates/premadeSeatingTemplates";
import Button from "../../../components/Button";
import Popup from "../../../components/Popup";
import { useNavigate } from "react-router-dom";
import { Routes } from "../../../utils/routeUtils";
import FormatSelector, {Formats} from "./FormatSelector/FormatSelector";
import SeatingTemplateTable from "./SeatingTemplateTable";

const defaultScore: Score = {
	raw: 0,
	uma: 0,
	penalty: 0
}

const SeatingTemplateEntry = () => {
	const tournament = useTournament();
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const {addGames} = bindActionCreators(tournamentActionCreators, dispatch);
	
	const premadeExists = `r${tournament.info.rounds}p${tournament.playerList.length}` in premadeSeatingTemplates;
	const [showPreview, setShowPreview] = useState<boolean>(false);
	const [seatingTemplate, setSeatingTemplate] = useState<number[][] | null>(null);
	const [selectedFormat, setSelectedFormat] = useState<Formats>(Formats.TableRoundVertical);
	
	const createGamesData = (seatingTemplate: number[][]): Game[] => {
		return generateArray(tournament.info.rounds).map((roundId: number): Game[] => (
			generateArray(tournament.playerList.length / 4).map((tableId: number): Game => ({
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

	const confirmSeating = (): void => {
		//TODO: Validate seating template before proceeding.

		if (seatingTemplate === null) return;
		addGames(createGamesData(seatingTemplate));
		
		navigate(Routes.SeatingTemplateEntry);
	};

	return (
		<div>
			<h1>Seating</h1>
			<FormatSelector
				format={selectedFormat}
				onFormatChange={(format: Formats) => setSelectedFormat(format)}
			/>
			<SeatingTemplateTable
				seatingTemplate={premadeSeatingTemplates[`r${tournament.info.rounds}p${tournament.playerList.length}`]}
				format={selectedFormat}
				preview={showPreview}
			/>
			
			<Button
				label={"Preview With Names"}
				onClick={() => setShowPreview(true)}
			/>
			<Button
				label={"Confirm Seating"}
				onClick={() => confirmSeating()}
			/>
		</div>
	);
};

export default SeatingTemplateEntry;