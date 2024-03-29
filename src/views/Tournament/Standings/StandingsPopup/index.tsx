import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import StandingsDisplay from "../../../../components/Standings";
import TextInput from "../../../../components/TextInput";
import styles from "./StandingsPopup.module.css";

const StandingsPopup = () => {
	const [searchParams] = useSearchParams();
	const afterRound = parseInt(searchParams.get("afterRound") as string);
	const plainText = searchParams.get("plainText") !== null && searchParams.get("plainText") === "true";
	const [message, setMessage] = useState<string>("");

	return (
		<div>
			<header className={styles.header}>Standings after round {afterRound + 1}</header>
			<div className={styles.standingsPopup}>
				<StandingsDisplay
					afterRound={afterRound}
					plainText={plainText}
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

export default StandingsPopup;