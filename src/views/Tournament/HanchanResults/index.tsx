import { useState } from "react";
import type { Game } from "../../../data-types/tournament-data-types";
import styles from "./HanchanResults.module.css";
import useTournament from "../../../utils/hooks/useTournament";
import type { CollapseProps } from "antd";
import { Collapse } from "antd";
import RoundSelector from "../../../components/RoundSelector";
import AccordionLabel from "./AccordionLabel";
import ResultEditor from "./ResultEditor";
import LayoutHeader from "../../../components/LayoutHeader";
import LayoutContent from "../../../components/LayoutContent";

const HanchanResults = () => {
	const tournament = useTournament();

	const [roundId, setRoundId] = useState<number>(0);
	const games = tournament.games.filter((game: Game) => game.round === roundId);

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
			<LayoutContent className={styles.body}>
					<RoundSelector
						round={roundId+1}
						previousDisabled={roundId === 0}
						onPrevious={() => setRoundId(roundId-1)}
						nextDisabled={roundId === tournament.info.rounds-1}
						onNext={() => setRoundId(roundId+1)}
					/>
					<Collapse
						key={roundId}
						accordion={true}
						items={items}
					/>
			</LayoutContent>
		</>
	);
};

export default HanchanResults;