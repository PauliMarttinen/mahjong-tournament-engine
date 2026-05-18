import { Modal, Button } from "antd";
import styles from "./UmaHelp.module.css";

type UmaHelpProps = {
	open: boolean,
	onClose: () => void
};

const UmaHelp = (props: UmaHelpProps) => {
	return (
		<Modal
			className={styles.umaHelp}
			centered={true}
			open={props.open}
			title={"Uma settings"}
			onCancel={props.onClose}
			footer={[
				<Button type={"primary"} onClick={props.onClose}>Close</Button>
			]}>
			<p>To ease the tournament official's burden, you can set uma to be determined automatically when entering hanchan results.</p>

			<p>"Split" and "Headbump" are ways to decide how uma is awarded to players who are tied with points.</p>

			<p>For "split" systems it is highly advisable that the first/last place uma score is 3x the second/third place uma score.</p>

			<p>Ruleset examples:</p>
			<table className={styles.rulesetExamples}>
				<tbody>
					<tr>
						<td>EMA 2025, WRC 2025</td>
						<td>+15 / +5 / -5 / -15</td>
						<td>Split</td>
					</tr>
					<tr>
						<td>M.League</td>
						<td>+30 / +10 / -10 / -30</td>
						<td>Split</td>
					</tr>
					<tr>
						<td>Tenhou.net</td>
						<td>+20 / +10 / -10 / -20</td>
						<td>Headbump</td>
					</tr>
					<tr>
						<td>Mahjong Soul</td>
						<td>+15 / +5 / -5 / -15</td>
						<td>Headbump</td>
					</tr>
				</tbody>
			</table>
		</Modal>
	);
};

export default UmaHelp;