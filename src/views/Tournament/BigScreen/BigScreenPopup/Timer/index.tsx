import {useState, useEffect, useMemo, ReactNode} from "react";
import { Progress, Space, Button } from "antd";
import styles from "./Timer.module.css";
import NumberInput from "../../../../../components/NumberInput";
import {PlayCircleOutlined, PauseCircleOutlined, TrademarkCircleOutlined} from "@ant-design/icons";
import alarmAudio from "./alarm.wav";

type TimerProps = {
	roundId: number,
};

const Timer = (props: TimerProps) => {
	const [roundLength, setRoundLength] = useState<number>(75*60);
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

	const pauseTimer = () => {
		if (timer !== null)
		{
			window.clearInterval(timer);
			setTimer(null);
		}
	};

	const startTimer = () => {
		const id = window.setInterval(() => passTime(), 1000);
		setTimer(id);
	};

	const resetTimer = () => {
		setTimePassed(0);
		alarm.pause();
		alarm.currentTime = 0;
	};

	useEffect(() => {
		const updateSize = () => {
			const height = window.innerHeight-300;
			const width = window.innerWidth-300;
			setTimerSize(Math.min(height, width))
		};
		updateSize();
		window.addEventListener("resize", updateSize);
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
				<NumberInput
					disabled={timer !== null}
					value={(roundLength/60)}
					onChange={(newValue) => setRoundLength(newValue*60)}
				/>
				<Space>
					<Button
						onClick={startTimer}
						disabled={timer !== null}
						icon={<PlayCircleOutlined/>}>
						Start
					</Button>
					<Button
						onClick={pauseTimer}
						disabled={timer === null}
						icon={<PauseCircleOutlined/>}>
						Pause
					</Button>
					<Button
						onClick={resetTimer}
						disabled={timer !== null && timePassed !== 0}
						icon={<TrademarkCircleOutlined/>}>
						Reset
					</Button>
				</Space>
			</Space>
		</div>
	);
};

export default Timer;