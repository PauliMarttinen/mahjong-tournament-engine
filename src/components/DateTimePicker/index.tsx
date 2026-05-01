import styles from "./DateTimePicker.module.css";

type DateTimePickerProps = {
	onChange: (newValue: string) => void,
	value: string
};

const DateTimePicker = (props: DateTimePickerProps) => {
	const [date, time] = props.value.split("T");
	const current = new Date().toISOString();
	const currentDate = current.split("T")[0];
	const currentTime = current.split("T")[1].slice(0, 5);
	
	const parsedDate = date || currentDate;
	const parsedTime = time?.slice(0, 5) || currentTime;

	const handleChange = (newDate: string, newTime: string) => {
		props.onChange(`${newDate}T${newTime}:00`);
	};

	return (
		<div className={styles.DateTimePicker}>
			<input
				type={"date"}
				value={parsedDate}
				onChange={(e) => handleChange(e.target.value, parsedTime)}
			/>
			<input
				type={"time"}
				value={parsedTime}
				onChange={(e) => handleChange(parsedDate, e.target.value)}
			/>
		</div>
	);
};

export default DateTimePicker;