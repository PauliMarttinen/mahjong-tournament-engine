import PlainText from "./PlainText";
import Table from "./Table";

type StandingsProps = {
	className?: string,
	plainText?: boolean,
	singleColumn?: boolean,
	afterRound: number
};

const Standings = (props: StandingsProps) => {
	if (props.plainText)
	{
		return (
			<PlainText
				className={props.className}
				afterRound={props.afterRound}
			/>
		);
	}

	return (
		<Table
			singleColumn={props.singleColumn}
			className={props.className}
			afterRound={props.afterRound}
		/>
	);
};

export default Standings;