import PrintableIframe from "../../../components/PrintableIframe";
import { Routes } from "../../../utils/routeUtils";
import {Card, Space} from "antd";
import LayoutHeader from "../../../components/LayoutHeader";
import LayoutContent from "../../../components/LayoutContent";
import styles from "./PrintOuts.module.css";

const PlayerSchedules = () => {
	return (
		<>
			<LayoutHeader>Print-outs/PDFs</LayoutHeader>
			<LayoutContent>
				<Space direction={"vertical"}>
				<Card
					className={styles.card}
					title={"Full schedule"}>
					<p>To save paper, consider various printing options such as scaling down or setting "pages per sheet" to 2.</p>
					<PrintableIframe
						label={"Print full schedule"}
						id={"full-schedule"}
						src={Routes.FullSchedule}
					/>
				</Card>
				<Card
					className={styles.card}
					title={"Personal schedules"}>
				<PrintableIframe
					label={"Print personal schedules"}
					id={"personal-schedules"}
					src={Routes.PrintPersonalSchedules}
				/>
				</Card>
				<Card
					className={styles.card}
					title={"Score forms"}>
					<p>To save paper, consider printing score forms on two sides.</p>
					<Space>
						<PrintableIframe
							label={"Print score forms (with names)"}
							id={"score-forms-names"}
							src={Routes.PrintScoreForms}
						/>
						<PrintableIframe
							label={"Print score forms (without names)"}
							id={"score-forms-nameless"}
							src={`${Routes.PrintScoreForms}?nameless=true`}
						/>
					</Space>
				</Card>
				</Space>
			</LayoutContent>
		</>
	);
};

export default PlayerSchedules;