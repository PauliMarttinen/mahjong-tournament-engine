import { useState } from "react";
import UmaHelp from "./UmaHelp";
import { Space, Card, Checkbox, Radio, Button, RadioChangeEvent } from "antd";
import {QuestionCircleOutlined} from "@ant-design/icons";
import PointInput from "../PointInput";
import { type Uma as UmaType, UmaTiebreak } from "../../data-types/tournament-data-types";
import { type PointInputType } from "../PointInput";
import styles from "./Uma.module.css";
import { getNumericValue } from "../../utils/getNumericValue";

type UmaProps = {
	uma: UmaType,
	onChange: (newUma: UmaType) => void
};

const Uma = (props: UmaProps) => {
	const [showUmaHelp, setShowUmaHelp] = useState<boolean>(false);
	const closeUmaHelp = () => setShowUmaHelp(false);
	const openUmaHelp = () => setShowUmaHelp(true);

	const toggleAutomaticUma = () => {
		props.onChange({
			...props.uma,
			automatic: !props.uma.automatic
		});
	};

	const setTiebreakStyle = (style: UmaTiebreak) => {
		props.onChange({
			...props.uma,
			tiebreak: style
		});
	};

	const setUmaAmount = (seat: number, newValue: PointInputType) => {
		const numericValue = getNumericValue(newValue);
		const updatedAmounts: [number, number, number, number] = [
			...props.uma.amount
		];
		updatedAmounts[seat] = numericValue;

		props.onChange({
			...props.uma,
			amount: updatedAmounts
		});
	};

	const umaTiebreakOptions = [
		{
			value: UmaTiebreak.Split,
			label: "Split"
		},
		{
			value: UmaTiebreak.Headbump,
			label: "Headbump"
		}
	];

	return (
		<>
			<UmaHelp
				open={showUmaHelp}
				onClose={closeUmaHelp}
			/>
			<Card title={"Uma"}>
				<Space direction={"vertical"}>
					<Checkbox
						checked={props.uma.automatic}
						id={"automatic-uma"}
						onChange={() => toggleAutomaticUma()}>
						Automatic uma
					</Checkbox>
					<table>
						<tbody>
							<tr>
								<td>1st</td>
								<td>
									<PointInput
										className={styles.pointInput}
										value={props.uma.amount[0]}
										onChange={(newValue: PointInputType) => setUmaAmount(0, newValue)}
										short={true}
										disabled={!props.uma.automatic}
										uma
									/>
								</td>
							</tr>
							<tr>
								<td>2nd</td>
								<td>
									<PointInput
										className={styles.pointInput}
										value={props.uma.amount[1]}
										onChange={(newValue: PointInputType) => setUmaAmount(1, newValue)}
										short={true}
										disabled={!props.uma.automatic}
										uma
									/>
								</td>
							</tr>
							<tr>
								<td>3rd</td>
								<td>
									<PointInput
										className={styles.pointInput}
										value={props.uma.amount[2]}
										onChange={(newValue: PointInputType) => setUmaAmount(2, newValue)}
										short={true}
										disabled={!props.uma.automatic}
										uma
									/>
								</td>
							</tr>
							<tr>
								<td>4th</td>
								<td>
									<PointInput
										className={styles.pointInput}
										value={props.uma.amount[3]}
										onChange={(newValue: PointInputType) => setUmaAmount(3, newValue)}
										short={true}
										disabled={!props.uma.automatic}
										uma
									/>
								</td>
							</tr>
						</tbody>
					</table>
					<Radio.Group
						disabled={!props.uma.automatic}
						options={umaTiebreakOptions}
						value={props.uma.tiebreak}
						onChange={(e: RadioChangeEvent) => setTiebreakStyle(e.target.value)}
					/>
					<Button
						type={"default"}
						onClick={openUmaHelp}>
						<QuestionCircleOutlined/>
					</Button>
				</Space>
			</Card>
		</>
	);
};

export default Uma;