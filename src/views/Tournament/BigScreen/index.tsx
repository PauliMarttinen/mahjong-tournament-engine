import {useState, useMemo} from "react";
import LayoutHeader from "../../../components/LayoutHeader";
import LayoutContent from "../../../components/LayoutContent";
import { Steps, Button, Space } from "antd";
import { ExportOutlined } from "@ant-design/icons";
import useTournament from "../../../utils/hooks/useTournament";
import { getSteps } from "./utils/getSteps";
import { Routes } from "../../../utils/routeUtils";

const BigScreen = () => {
	const tournament = useTournament();
	const [bigScreen, setBigScreen] = useState<WindowProxy | null>(null);
	const steps = useMemo(() => getSteps(tournament.info.rounds), []);

	const changeStep = (step: number) => {
		console.log("new step:", step)
	};

	const openWindow = () => {
		setBigScreen(window.open(
			Routes.BigScreenPopup,
			"bigScreen",
			"width=500,height=500"
		));
	};

	return (
		<>
			<LayoutHeader>Big Screen</LayoutHeader>
			<LayoutContent>
				<Space direction={"vertical"}>
					<Button
						icon={<ExportOutlined/>}
						onClick={openWindow}>
						Open Big Screen Popup
					</Button>
					<Steps
						onChange={changeStep}
						direction={"vertical"}
						current={0}
						items={steps}
					/>
				</Space>
			</LayoutContent>
		</>
	);
};

export default BigScreen;