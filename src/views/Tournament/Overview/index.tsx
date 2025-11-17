import { useState } from "react";
import type { Game } from "../../../data-types/tournament-data-types";
import Hanchan from "./Hanchan";
import { generateArray } from "../../../utils/generateArray";
import styles from "./Overview.module.css";
import useTournament from "../../../utils/hooks/useTournament";
import {Input} from "antd";
import { SearchOutlined } from "@ant-design/icons";
import LayoutHeader from "../../../components/LayoutHeader";
import LayoutContent from "../../../components/LayoutContent";

const Overview = () => {
	const [highlight, setHighlight] = useState<string>("");
	const resultsEnterMode = false;
	const tournament = useTournament();

	const rounds = generateArray(tournament.info.rounds);
	const tables = generateArray(tournament.playerList.length/4);

	return (
		<>
			<LayoutHeader>
				Overview
			</LayoutHeader>
			<LayoutContent>
				<Input
					value={highlight}
					prefix={<SearchOutlined/>}
					onChange={(e) => setHighlight(e.target.value)}
					className={styles.highlight}
					placeholder={"Search for player"}
				/>
				<div className={styles.seatingTable}>
					<table className={styles.table}>
						<tbody>
							<tr>
								<th className={styles.sticky}>{null}</th>
								{
									tables.map((tableId: number) => <th key={`table-th-${tableId}`}>{`Table ${tableId+1}`}</th>)
								}
							</tr>
							{
								rounds.map((roundId: number) => (
									<tr key={`round-tr-${roundId}`}>
										<th className={styles.sticky}>{`Round ${roundId+1}`}</th>
										{
											tables.map((tableId: number) => {
												const game = tournament.games.find((game: Game): boolean => game.round === roundId && game.table === tableId);

												return (
													game
													?
													<td key={`round-tr-${roundId}-table-td-${tableId}`}>
														<Hanchan
															east={tournament.playerList[game.participants[0].playerId].name}
															south={tournament.playerList[game.participants[1].playerId].name}
															west={tournament.playerList[game.participants[2].playerId].name}
															north={tournament.playerList[game.participants[3].playerId].name}
															finished={game.finished}
															hilight={highlight}
															clickable={resultsEnterMode}
														/>
													</td>
													:
													<td key={`round-tr-${roundId}-table-td-${tableId}`}>Game undefined</td>
												);
											})
										}
									</tr>
								))
							}
						</tbody>
					</table>
				</div>
			</LayoutContent>
		</>
	);
};

export default Overview;