import {useState, useMemo} from "react";
import LayoutHeader from "../../../components/LayoutHeader";
import LayoutContent from "../../../components/LayoutContent";
import { Steps, Button, Space } from "antd";
import { ExportOutlined } from "@ant-design/icons";
import useTournament from "../../../utils/hooks/useTournament";
import { getSteps } from "./utils/getSteps";
import { Routes } from "../../../utils/routeUtils";
import { setBigScreenState } from "./utils/setBigScreenState";

const BigScreen = () => {
	const tournament = useTournament();
	const [bigScreen, setBigScreen] = useState<WindowProxy | null>(null);
	const [currentStep, setCurrentStep] = useState<number>(0);
	const steps = useMemo(() => getSteps(tournament.info.rounds), []);

	const openWindow = () => {
		setBigScreen(window.open(
			`${Routes.BigScreenPopup}?step=${currentStep}`,
			"bigScreen",
			"width=500,height=500"
		));
	};

	const changeStep = (step: number) => {
		setCurrentStep(step);
		setBigScreenState(steps[step].stateChange);
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
						current={currentStep}
						items={steps}
					/>
				</Space>
			</LayoutContent>
		</>
	);
};

export default BigScreen;