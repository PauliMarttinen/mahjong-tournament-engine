import { useState, useMemo, useEffect } from "react";
import LayoutHeader from "../../../components/LayoutHeader";
import LayoutContent from "../../../components/LayoutContent";
import { Steps, Button, Space, Card } from "antd";
import { ExportOutlined } from "@ant-design/icons";
import { useTournament } from "../../../utils/hooks/useTournament";
import { useAppState } from "../../../utils/hooks/useAppState";
import { getSteps } from "./utils/getSteps";
import { Route, Routes } from "../../../utils/routeUtils";
import { useDispatch } from "react-redux";
import { bindActionCreators } from "redux";
import { appActionCreators } from "../../../state";
import { BigScreenStates, navigateBigScreen } from "./utils/setBigScreenState";

const BigScreen = () => {
	const tournament = useTournament();
	const app = useAppState();
	const dispatch = useDispatch();
	const [currentStep, setCurrentStep] = useState<number>(-1);
	const steps = useMemo(() => getSteps(tournament), []);
	
	const {setBigScreen} = bindActionCreators(appActionCreators, dispatch);

	const showOnBigScreen = (stepId: number = 0) => {
		setCurrentStep(stepId);

		const route = steps[stepId].route;
		if (!app.bigScreen)
		{
			setBigScreen(window.open(
				route,
				"bigScreen",
				"width=500,height=500"
			));
			return;
		}

		navigateBigScreen(route);
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
						onClick={() => showOnBigScreen(0)}>
						Open Big Screen Popup
					</Button>
					<Steps
						progressDot={true}
						onChange={showOnBigScreen}
						direction={"vertical"}
						current={currentStep}
						items={steps}
					/>
				</Space>
				{
					steps[steps.length-1].route === Routes.BigScreenFinal &&
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