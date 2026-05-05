import {useState, useEffect, useMemo, ReactNode} from "react";
import { Progress, Space, Button } from "antd";
import styles from "./Timer.module.css";
import {PlayCircleOutlined, /* PauseCircleOutlined, */ TrademarkCircleOutlined} from "@ant-design/icons";
import alarmAudio from "./alarm.wav";
import useTournament from "../../../../../utils/hooks/useTournament";
import collectGarbage from "../utils/collectGarbage";
import { STATE_MESSAGE_IDENTIFIER, BigScreenActions } from "../../utils/setBigScreenState";

type TimerProps = {
	roundId: number,
};

const Timer = (props: TimerProps) => {
	const tournament = useTournament();
	const roundLength = tournament.info.roundLength*60;
	
	const [timePassed, setTimePassed] = useState<number>(0);
	const [timer, setTimer] = useState<number | null>(null);

	const [timerSize, setTimerSize] = useState<number>(() =>
		typeof window !== "undefined" ? window.innerHeight : 0
	);

	const alarm = useMemo(() => new Audio(alarmAudio), []);
	alarm.loop = true;
	
	const passTime = () => {
		setTimePassed(prevTime => prevTime+1);
	};

	/* const pauseTimer = () => {
		if (timer !== null)
		{
			window.clearInterval(timer);
			setTimer(null);
		}
	}; */

	const startTimer = (stopPropagation?: boolean) => {
		const id = window.setInterval(() => passTime(), 1000);
		setTimer(id);

		if (!stopPropagation)
		{
			localStorage.setItem(STATE_MESSAGE_IDENTIFIER, JSON.stringify({
				type: BigScreenActions.StartRound,
				payload: props.roundId
			}));
			collectGarbage();
		}
	};

	const stopAlarm = () => {
		alarm.pause();
		alarm.currentTime = 0;
	};

	const resetTimer = () => {
		setTimePassed(0);
		stopAlarm();
	};

	useEffect(() => {
		//Timer resizer
		const updateSize = () => {
			const height = window.innerHeight-250;
			const width = window.innerWidth-250;
			setTimerSize(Math.min(height, width))
		};
		updateSize();
		window.addEventListener("resize", updateSize);

		//See if the round is already ongoing
		if (tournament.info.rounds[props.roundId].realStart !== "")
		{
			const nowMs = new Date().getTime();
			const roundStartMs = new Date(tournament.info.rounds[props.roundId].realStart).getTime();
			const difference = Math.floor((nowMs - roundStartMs)/1000);
			if (difference <= roundLength*60)
			{
				setTimePassed(difference);
				startTimer(true);
			}
		}

		//Remove timer resized when leaving the timer
		return () => window.removeEventListener("resize", updateSize);
	}, []);

	useEffect(() => {
		if (timePassed >= roundLength && timer !== null)
		{
			window.clearInterval(timer);
			setTimer(null);

			alarm.play();
		}
	}, [timePassed])

	const formatTime = (seconds: number): ReactNode => {
		if (seconds <= 0)
		{
			return <>One More Hand!</>;
		}

		const minutes = Math.floor(seconds/60);
		const remainder = seconds%60;
		
		return (
			<>
				<small>Round {props.roundId+1}</small>
				<br/>
				{minutes}:{remainder.toString().padStart(2, "0")}
			</>
		);
	};

	return (
		<div className={styles.timerWrapper}>
			<Space direction={"vertical"} size={50}>
				<Progress
					className={styles.timer}
					size={timerSize}
					type={"circle"}
					percent={timePassed/roundLength*100}
					format={(_) => formatTime(roundLength-timePassed)}
				/>
				<Space>
					<Button
						onClick={() => startTimer()}
						disabled={timer !== null}
						icon={<PlayCircleOutlined/>}>
						Start
					</Button>
					{/* <Button
						onClick={pauseTimer}
						disabled={timer === null}
						icon={<PauseCircleOutlined/>}>
						Pause
					</Button> */}
					<Button
						onClick={resetTimer}
						disabled={timer !== null && timePassed !== 0}
						icon={<TrademarkCircleOutlined/>}>
						Reset
					</Button>
				</Space>
				{
					timePassed >= roundLength &&
					<Button
						type={"text"}
						onClick={stopAlarm}>
						Stop the music
					</Button>
				}
			</Space>
		</div>
	);
};

export default Timer;