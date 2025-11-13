import { useState } from "react";
import { Game } from "../../../data-types/tournament-data-types";
import styles from "./HanchanResults.module.css";
import useTournament from "../../../utils/hooks/useTournament";
import type { CollapseProps } from "antd";
import { Collapse, Button } from "antd";
import AccordionLabel from "./AccordionLabel";
import ResultEditor from "./ResultEditor";
import {Layout} from "antd";
import LayoutHeader from "../../../components/LayoutHeader";

const HanchanResults = () => {
	const tournament = useTournament();

	const [round, setRound] = useState<number>(0);
	const games = tournament.games.filter((game: Game) => game.round === round);

	const items: CollapseProps["items"] = games.map((game: Game) => ({
		key: ""+game.table,
		label: (
			<AccordionLabel
				table={game.table}
				east={tournament.playerList[game.participants[0].playerId].name}
				south={tournament.playerList[game.participants[1].playerId].name}
				west={tournament.playerList[game.participants[2].playerId].name}
				north={tournament.playerList[game.participants[3].playerId].name}
				finished={game.finished}
			/>
		),
		children: (
			<ResultEditor
				round={game.round}
				table={game.table}
			/>
		)
	}));

	return (
		<>
			<LayoutHeader>Hanchan Results</LayoutHeader>
			<Layout.Content>
				<div className={styles.body}>
					<div className={styles.roundSelector}>
						<Button
							type={"text"}
							onClick={() => setRound(round-1)}
							disabled={round === 0}
							className={styles.roundButton}>
							←
						</Button>
						<div>Round {round+1}</div>
						<Button
							type={"text"}
							onClick={() => setRound(round+1)}
							disabled={round === tournament.info.rounds-1}
							className={styles.roundButton}>
							→
						</Button>
					</div>
					<Collapse
						key={round}
						accordion={true}
						items={items}
					/>
				</div>
			</Layout.Content>
		</>
	);
};

export default HanchanResults;