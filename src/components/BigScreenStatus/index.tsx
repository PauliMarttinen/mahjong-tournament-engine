import {useEffect, useRef, useState} from "react";
import {
	STATE_MESSAGE_IDENTIFIER,
	PING_MESSAGE_IDENTIFIER,
	PING_INTERVAL,
	BigScreenStates
} from "../../views/Tournament/BigScreen/utils/setBigScreenState";
import useAppState from "../../utils/hooks/useAppState";
import { useDispatch } from "react-redux";
import { bindActionCreators } from "redux";
import { appActionCreators } from "../../state";

const BigScreenStatus = () => {
	const timeoutRef = useRef<number | null>(null);
	const appState = useAppState();
	const dispatch = useDispatch();

	const {setBigScreen} = bindActionCreators(appActionCreators, dispatch);

	const off = () => {
		setBigScreen(null);
	};

	const handleStorageEvent = (event: StorageEvent) => {
		if (event.key === PING_MESSAGE_IDENTIFIER && event.newValue)
		{
			if (timeoutRef.current !== null)
				{
				window.clearTimeout(timeoutRef.current);
			}
			timeoutRef.current = window.setTimeout(off, PING_INTERVAL + 500);
		}

		if (event.key === STATE_MESSAGE_IDENTIFIER && event.newValue)
		{
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
			Big Screen Status: {appState.bigScreen && !appState.bigScreen.closed ? "on" : "off"}
		</div>
	);
};

export default BigScreenStatus;