import {useEffect, useRef, useState} from "react";
import {
	STATE_MESSAGE_IDENTIFIER,
	PING_MESSAGE_IDENTIFIER,
	PING_INTERVAL,
	BigScreenStates
} from "../../views/Tournament/BigScreen/utils/setBigScreenState";

const BigScreenStatus = () => {
	const timeoutRef = useRef<number | null>(null);
	const [bigScreenOn, setBigScreenOn] = useState<boolean>(false);

	const off = () => {
		console.log("turning off")
		setBigScreenOn(false);
	};

	const handleStorageEvent = (event: StorageEvent) => {
		if (event.key === PING_MESSAGE_IDENTIFIER && event.newValue) {
			setBigScreenOn(true);

			if (timeoutRef.current !== null) {
				window.clearTimeout(timeoutRef.current);
			}
			timeoutRef.current = window.setTimeout(off, PING_INTERVAL + 500);
		}

		if (event.key === STATE_MESSAGE_IDENTIFIER && event.newValue) {
			try {
				const stateChange = JSON.parse(event.newValue);
				if (stateChange.type === BigScreenStates.Off)
				{
					off();
				}
			}
			catch (e) {}
		}
	};

	useEffect(() => {
		window.addEventListener("storage", handleStorageEvent);

		return () => {
			window.removeEventListener("storage", handleStorageEvent);
			if (timeoutRef.current !== null) {
				window.clearInterval(timeoutRef.current);
			}
		};
	}, []);

	return (
		<div style={{background: "white"}}>
			Big Screen Status: {bigScreenOn ? "on" : "off"}
		</div>
	);
};

export default BigScreenStatus;