import { Alert } from "antd";

type DivisibleWarning = {
	show: boolean
};

const DivisibleWarning = (props: DivisibleWarning) => {
	if (props.show)	return (
		<Alert
			type={"error"}
			message={"Must have a number of players that is divisible by 4."}
		/>
	);

	return (<></>);
};

export default DivisibleWarning;