import { Routes } from "../../../utils/routeUtils";
import { Button, Card, Space, Alert } from "antd";
import LayoutHeader from "../../../components/LayoutHeader";
import LayoutContent from "../../../components/LayoutContent";
import useAppState from "../../../utils/hooks/useAppState";
import { BigScreenStates, STATE_MESSAGE_IDENTIFIER } from "../BigScreen/utils/setBigScreenState";
import { useDispatch } from "react-redux";
import { bindActionCreators } from "redux";
import { appActionCreators } from "../../../state";

const FinalResults = () => {
	const appState = useAppState();

	const dispatch = useDispatch();
	const { setBigScreen } = bindActionCreators(appActionCreators, dispatch);

	const openWindow = () => {
		localStorage.setItem(STATE_MESSAGE_IDENTIFIER, JSON.stringify({
			type: BigScreenStates.Final
		}));

		if (!appState.bigScreen || appState.bigScreen.closed)
		{
			setBigScreen(window.open(
				Routes.BigScreenPopup,
				"finalResultsPopup",
				"width=500,height=500"
			));
		}
	};

	return (
		<>
			<LayoutHeader>Final Results</LayoutHeader>
			<LayoutContent>
				<Space direction={"vertical"}>
				<Alert message={"Display the final results on screen in a jubilant fashion!"}/>

				<Card title={"Instructions"}>
					<ul>
						<li>The window will open blank.</li>
						<li>When you press "space" for the first time, the window will display results for everyone expect the top 5.</li>
						<li>After that, pressing "space" will reveal the top 5 players one by one.</li>
					</ul>
				</Card>

				<div>
					<Button
						type={"primary"}
						onClick={() => openWindow()}>
						Open final results window
					</Button>
				</div>
				</Space>
			</LayoutContent>
		</>
	);
}

export default FinalResults;