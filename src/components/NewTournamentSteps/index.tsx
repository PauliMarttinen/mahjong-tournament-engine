import {Steps} from "antd";
import styles from "./NewTournamentSteps.module.css";

type NewTournamentStepsProps = {
	current: number
};

const NewTournamentSteps = (props: NewTournamentStepsProps) => {
	const steps = [
		{
			title: "Basic information"
		},
		{
			title: "Enter players"
		},
		{
			title: "Seating"
		}
	];

	return (
		<div className={styles.newTournamentSteps}>
			<Steps
				current={props.current}
				items={steps}
			/>
		</div>
	);
};

export default NewTournamentSteps;