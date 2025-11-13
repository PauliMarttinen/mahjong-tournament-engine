import { useState } from "react";
import Toggle from "../../../components/Toggle";
import IndividualPlayer from "./IndividualPlayer";
import ReportCards from "./ReportCards";
import {Layout} from "antd";
import LayoutHeader from "../../../components/LayoutHeader";

const PlayerPerformance = () => {
	const [individualPlayer, setIndividualPlayer] = useState<boolean>(true);

	return (
		<>
			<LayoutHeader>Player performance</LayoutHeader>
			<Layout.Content>
				<Toggle
					true={"See individual player"}
					false={"Print performance cards"}
					value={individualPlayer}
					onSwitch={() => setIndividualPlayer(!individualPlayer)}
				/>
				{
					individualPlayer
					?
					<IndividualPlayer/>
					:
					<ReportCards/>
				}
			</Layout.Content>
		</>
	);
}

export default PlayerPerformance;