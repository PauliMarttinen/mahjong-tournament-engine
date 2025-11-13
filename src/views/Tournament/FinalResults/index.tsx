import { useState } from "react";
import Button from "../../../components/Button";
import { Routes } from "../../../utils/routeUtils";
import { Layout } from "antd";
import LayoutHeader from "../../../components/LayoutHeader";

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
			<LayoutHeader>Post-tournament</LayoutHeader>
			<Layout.Content>
				<p>Click the button below to open a new video that will display the standings in a cool animated fashion, so you can display the final results on a big screen.</p>

				<p>Instructions:</p>
				<ul>
					<li>The window will open blank.</li>
					<li>When you press "space" for the first time, the window will display results for everyone expect the top 5.</li>
					<li>After that, pressing "space" will reveal the top 5 players one by one.</li>
				</ul>

				<div>
					<Button
						label={"Open final results window."}
						onClick={() => openWindow()}
					/>
				</div>
			</Layout.Content>
		</>
	);
}

export default FinalResults;