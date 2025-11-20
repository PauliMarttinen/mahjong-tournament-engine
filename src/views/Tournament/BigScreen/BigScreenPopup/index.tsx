import {useState, useEffect} from "react";
import { MESSAGE_IDENTIFIER, PARAMETER_IDENTIFIER, Messages } from "../utils/messageToBigScreen";

const BigScreenPopup = () => {
	const [message, setMessage] = useState<string|null>(null);
	const [messageReceiver, setMessageReceiver] = useState<number | null>(null);
	
	const readMessage = () => {
		switch (localStorage.getItem(MESSAGE_IDENTIFIER))
		{
			case Messages.JumpToStep:
				if (localStorage.getItem(PARAMETER_IDENTIFIER) === null) break;
				setMessage(localStorage.getItem(PARAMETER_IDENTIFIER));
				break;
		}
		localStorage.removeItem(MESSAGE_IDENTIFIER);
		localStorage.removeItem(PARAMETER_IDENTIFIER);
	};

	useEffect(() => {
		const id = window.setInterval(readMessage, 1000);
		setMessageReceiver(id);

		//Make sure there aren't any leftover messages from earlier
		localStorage.removeItem(MESSAGE_IDENTIFIER);
		localStorage.removeItem(PARAMETER_IDENTIFIER);
		return () => window.clearInterval(id);
	}, []);

	return (
		<h1>{message}</h1>
	);
};

export default BigScreenPopup;