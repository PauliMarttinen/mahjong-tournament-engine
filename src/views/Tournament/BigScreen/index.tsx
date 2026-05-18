import { useState, useMemo, useEffect } from "react";
import LayoutHeader from "../../../components/LayoutHeader";
import LayoutContent from "../../../components/LayoutContent";
import { Steps, Button, Space, Card } from "antd";
import { ExportOutlined } from "@ant-design/icons";
import useTournament from "../../../utils/hooks/useTournament";
import useAppState from "../../../utils/hooks/useAppState";
import { getSteps } from "./utils/getSteps";
import { Routes } from "../../../utils/routeUtils";
import { useDispatch } from "react-redux";
import { bindActionCreators } from "redux";
import { appActionCreators } from "../../../state";
import { BigScreenStates, setBigScreenState } from "./utils/setBigScreenState";

const BigScreen = () => {
	const tournament = useTournament();
	const app = useAppState();
	const dispatch = useDispatch();
	const [currentStep, setCurrentStep] = useState<number>(-1);
	const steps = useMemo(() => getSteps(tournament), []);
	
	const {setBigScreen} = bindActionCreators(appActionCreators, dispatch);

	const openWindow = () => {
		if (currentStep > 0)
		{
			setBigScreenState(steps[currentStep].stateChange);
		}
		if (currentStep <= 0)
		{
			setBigScreenState(steps[0].stateChange);
		}
		
		if (!app.bigScreen)
		{
			setBigScreen(window.open(
				Routes.BigScreenPopup,
				"bigScreen",
				"width=500,height=500"
			));
		}
	};

	const changeStep = (step: number) => {
		if (!app.bigScreen) openWindow();
		setCurrentStep(step);
		setBigScreenState(steps[step].stateChange);
	};

	useEffect(() => {
		if (!app.bigScreen) setCurrentStep(-1);
	}, [app.bigScreen]);

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
						progressDot={true}
						onChange={changeStep}
						direction={"vertical"}
						current={currentStep}
						items={steps}
					/>
				</Space>
				{
					steps[steps.length-1].stateChange.type === BigScreenStates.Final &&
					<Card title={"Instructions for the Final Results screen"}>
						<p>The Final Results screen will start blank.</p>

						<p>Pressing space on the screen for the first time will reveal players who are placed <strong>6th or lower</strong>.</p>

						<p>After that, pressing space on the screen will reveal the <strong>top 5</strong> players one-by-one, from 5th to 1st.</p>
					</Card>
				}
			</LayoutContent>
		</>
	);
};

export default BigScreen;