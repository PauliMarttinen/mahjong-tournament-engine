import { useState } from "react";
import StandingsDisplay from "../../../../../components/Standings";
import TextInput from "../../../../../components/TextInput";
import styles from "./Standings.module.css";

type StandingsProps = {
	roundId: number
};

const Standings = (props: StandingsProps) => {
	const [message, setMessage] = useState<string>("");

	return (
		<div>
			<header className={styles.header}>Standings after round {props.roundId + 1}</header>
			<div className={styles.standingsPopup}>
				<StandingsDisplay
					afterRound={props.roundId}
					plainText={false}
				/>
			</div>
			<footer className={styles.note}>
				<TextInput
					className={styles.popupMessage}
					value={message}
					onChange={(newMessage) => setMessage(newMessage)}
				/>
			</footer>
		</div>
	);
};

export default Standings;