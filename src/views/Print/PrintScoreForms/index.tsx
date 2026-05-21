import { type Game } from "../../../data-types/tournament-data-types";
import { curlArray } from "../../../utils/curlArray";
import { useTournament } from "../../../utils/hooks/useTournament";
import HanchanScoreForm from "./HanchanScoreForm";
import { Form } from "./HanchanScoreForm";
import styles from "./PrintScoreForms.module.css";
import { Seats } from "../../../data-types/app-data-types";

const PrintScoreForms = () => {
	const tournament = useTournament();

	const pages: Form[][] = curlArray(tournament.games.map((game: Game): Form => ({
		eastPlayer: tournament.playerList[game.participants[Seats.East].playerId].name,
		southPlayer: tournament.playerList[game.participants[Seats.South].playerId].name,
		westPlayer: tournament.playerList[game.participants[Seats.West].playerId].name,
		northPlayer: tournament.playerList[game.participants[Seats.North].playerId].name,
		table: game.table + 1,
		round: game.round + 1
	})).sort((a: Form, b: Form) => a.table !== b.table ? a.table - b.table : a.round - b.round), 2);

	return (
		<div>
			{
				pages.map((page: Form[], pageNumber: number) => (
					<div className={styles.page} key={`tsf-page-${pageNumber}`}>
						<header className={styles.header}>{tournament.info.title}</header>
						{
							page.map((form: Form, formNumber: number) => (
								<HanchanScoreForm
									key={`tsf-page-${pageNumber}-form-${formNumber}`}
									form={form}
								/>
							))
						}
					</div>
				))
			}
		</div>
	);
};

export default PrintScoreForms;