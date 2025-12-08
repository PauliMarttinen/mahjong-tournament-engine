import {useState} from "react";
import styles from "./Welcome.module.css";
import useTournament from "../../../../../utils/hooks/useTournament";
import TextInput from "../../../../../components/TextInput";

const Welcome = () => {
	const tournament = useTournament();
	const [message, setMessage] = useState<string>("");

	return (
		<div>
			<header className={styles.header}>Welcome to {tournament.info.title}</header>
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

export default Welcome;