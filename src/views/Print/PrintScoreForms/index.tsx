import { Game } from "../../../data-types/tournament-data-types";
import curlArray from "../../../utils/curlArray";
import useTournament from "../../../utils/hooks/useTournament";
import HanchanScoreForm, {Form} from "./HanchanScoreForm";
import styles from "./PrintScoreForms.module.css";

const PrintScoreForms = () => {
	const tournament = useTournament();

	const pages: Form[][] = curlArray(tournament.games.map((game: Game): Form => ({
		eastPlayer: tournament.playerList[game.participants[0].playerId].name,
		southPlayer: tournament.playerList[game.participants[1].playerId].name,
		westPlayer: tournament.playerList[game.participants[2].playerId].name,
		northPlayer: tournament.playerList[game.participants[3].playerId].name,
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