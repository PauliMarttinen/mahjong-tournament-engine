import PrintableIframe from "../../../components/PrintableIframe";
import { Routes } from "../../../utils/routeUtils";

const PlayerSchedules = () => {
	return (
		<div>
			<h1>Print-outs</h1>
			<p>Print-outs can be printed on paper or exported to PDF (requires a print-to-PDF thingy).</p>
			<h2>Full schedule</h2>
			<p>To save paper, consider various printing options such as scaling down or setting "pages per sheet" to 2.</p>
			<PrintableIframe
				label={"Print full schedule"}
				id={"full-schedule"}
				src={Routes.FullSchedule}
			/>
			<h2>Personal schedules</h2>
			<PrintableIframe
				label={"Print personal schedules"}
				id={"personal-schedules"}
				src={Routes.PrintPersonalSchedules}
			/>
			<h2>Table score forms</h2>
			<p>To save paper, consider printing score forms on two sides.</p>
			<PrintableIframe
				label={"Print score forms"}
				subLabel={"With names"}
				id={"score-forms-names"}
				src={Routes.PrintScoreForms}
			/>
			<PrintableIframe
				label={"Print score forms"}
				subLabel={"Without names"}
				id={"score-forms-nameless"}
				src={`${Routes.PrintScoreForms}?nameless=true`}
			/>
		</div>
	);
};

export default PlayerSchedules;