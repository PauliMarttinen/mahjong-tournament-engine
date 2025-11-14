import IndividualPlayer from "./IndividualPlayer";
import ReportCards from "./ReportCards";
import {Tabs} from "antd";
import type {TabsProps} from "antd";
import LayoutHeader from "../../../components/LayoutHeader";
import LayoutContent from "../../../components/LayoutContent";

const PlayerPerformance = () => {
	const tabs: TabsProps["items"] = [
		{
			key: "1",
			label: "See individual player",
			children: <IndividualPlayer/>
		},
		{
			key: "2",
			label: "Print/Export PDF",
			children: <ReportCards/>
		}
	];

	return (
		<>
			<LayoutHeader>Player performance</LayoutHeader>
			<LayoutContent>
				<Tabs
					items={tabs}
				/>
			</LayoutContent>
		</>
	);
}

export default PlayerPerformance;