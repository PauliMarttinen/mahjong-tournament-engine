type TimerProps = {
	roundId: number
};

const Timer = (props: TimerProps) => {
	return (
		<h1>Timer for round {props.roundId+1}</h1>
	);
};

export default Timer;