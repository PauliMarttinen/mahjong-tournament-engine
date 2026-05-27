import { useState, useEffect, useMemo, useRef, type ReactNode } from "react";
import { Progress, Space, Button } from "antd";
import styles from "./Timer.module.css";
import { PlayCircleOutlined, /* PauseCircleOutlined, */ TrademarkCircleOutlined } from "@ant-design/icons";
import alarmAudio from "./alarm.wav";
import { useTournament } from "../../../../../utils/hooks/useTournament";
import { BigScreenActions, setBigScreenState } from "../../utils/setBigScreenState";

type TimerProps = {
	roundId: number,
};

const Timer = (props: TimerProps) => {
	const tournament = useTournament();
	const roundLengthSeconds = tournament.info.roundLength*60;
	
	const [timePassedSeconds, setTimePassedSeconds] = useState<number>(0);
	const startTimeSeconds = useRef<number>(0);
	const [timer, setTimer] = useState<number | null>(null);

	const [timerSize, setTimerSize] = useState<number>(() =>
		typeof window !== "undefined" ? window.innerHeight : 0
	);

	const alarm = useMemo(() => new Audio(alarmAudio), []);
	alarm.loop = true;
	
	const passTime = () => {
		const currentSeconds = Math.floor(new Date().getTime()/1000);
		const difference = currentSeconds - startTimeSeconds.current;

		if (difference >= roundLengthSeconds && timer !== null)
		{
			window.clearInterval(timer);
			setTimer(null);
			alarm.play();
			return;
		}
		
		setTimePassedSeconds(currentSeconds - startTimeSeconds.current);
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
			startTimeSeconds.current = Math.floor(new Date().getTime()/1000);
			setBigScreenState({
				type: BigScreenActions.StartRound,
				payload: props.roundId
			});
		}
	};

	const stopAlarm = () => {
		alarm.pause();
		alarm.currentTime = 0;
	};

	const resetTimer = () => {
		setTimePassedSeconds(0);
		stopAlarm();
	};

	useEffect(() => {
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
			const currentSeconds = Math.floor(new Date().getTime()/1000);
			startTimeSeconds.current = Math.floor(new Date(tournament.info.rounds[props.roundId].realStart).getTime()/1000);
			const difference = currentSeconds - startTimeSeconds.current;
			
			if (difference <= roundLengthSeconds)
			{
				setTimePassedSeconds(difference);
				startTimer(true);
			}
		}

		return () => window.removeEventListener("resize", updateSize);
	}, []);

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
					percent={timePassedSeconds/roundLengthSeconds*100}
					format={(_) => formatTime(roundLengthSeconds-timePassedSeconds)}
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
						disabled={timer !== null && timePassedSeconds !== 0}
						icon={<TrademarkCircleOutlined/>}>
						Reset
					</Button>
				</Space>
				{
					timePassedSeconds >= roundLengthSeconds &&
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