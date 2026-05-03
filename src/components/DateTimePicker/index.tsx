import styles from "./DateTimePicker.module.css";
import dayjs from "dayjs";
import { DatePicker, TimePicker } from "antd";

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

	const handleDateChange = (newDate: dayjs.Dayjs) => {
		props.onChange(`${newDate.format("YYYY-MM-DD")}T${parsedTime}`);
	};

	const handleTimeChange = (newTime: dayjs.Dayjs) => {
		props.onChange(`${parsedDate}T${newTime.format("HH:mm")}`);
	};

	return (
		<div className={styles.DateTimePicker}>
			<DatePicker
				allowClear={false}
				value={dayjs(parsedDate, "YYYY-MM-DD")}
				onChange={handleDateChange}
			/>
			<TimePicker
				allowClear={false}
				value={dayjs(parsedTime, "HH:mm")}
				format={"HH:mm"}
				onChange={handleTimeChange}
			/>
		</div>
	);
};

export default DateTimePicker;