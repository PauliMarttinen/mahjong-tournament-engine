import { Card } from "antd";
import { useTournament } from "../../../../utils/hooks/useTournament";

type FinalInstructionsProps = {
	show: boolean
};

const FinalInstructions = (props: FinalInstructionsProps) => {
	const tournament = useTournament();
	if (!props.show) return <></>;

	if (tournament.playerList.length === 4)
	{
		return (
			<Card title={"Instructions for the Final Results screen"}>
				<p>The Final Results screen will start blank.</p>

				<p>Since this tournament has four players, pressing space will reveal the players <strong>one by one</strong> starting from the last place.</p>

				<p>Notice that the behavior will be slightly different in tournaments with 8 or more players.</p>
			</Card>
		);
	}

	return (
		<Card title={"Instructions for the Final Results screen"}>
			<p>The Final Results screen will start blank.</p>

			<p>Pressing space on the screen for the first time will reveal players who are placed <strong>6th or lower</strong>.</p>

			<p>After that, pressing space on the screen will reveal the <strong>top 5</strong> players one-by-one, from 5th to 1st.</p>
		</Card>
	);
};

export default FinalInstructions;