import { useState } from "react";
import { Routes } from "../../../utils/routeUtils";
import { Button, Card, Space, Alert } from "antd";
import LayoutHeader from "../../../components/LayoutHeader";
import LayoutContent from "../../../components/LayoutContent";

const FinalResults = () => {
	const [finalResultsPopup, setFinalResultsPopup] = useState<WindowProxy | null>(null);

	const openWindow = () => {
		setFinalResultsPopup(window.open(
			Routes.FinalResultsPopup,
			"finalResultsPopup",
			"width=500,height=500"
		));
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