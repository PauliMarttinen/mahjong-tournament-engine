import { useState, useEffect } from "react";
import { type GeneralInfo, PointInputType, type Round, Uma, UmaTiebreak } from "../../../data-types/tournament-data-types";
import { useDispatch } from "react-redux";
import { bindActionCreators } from "redux";
import { newTournamentActionCreators } from "../../../state";
import NumberInput from "../../../components/NumberInput";
import { initialState } from "../../../state/reducers/tournamentReducer";
import { Routes } from "../../../utils/routeUtils";
import { useNavigate } from "react-router-dom";
import styles from "./TournamentInfoEntry.module.css";
import {Input, Space, Card, Button, Checkbox, Radio, RadioChangeEvent, Modal} from "antd";
import {QuestionCircleOutlined} from "@ant-design/icons";
import MandatoryAsterisk from "../../../components/MandatoryAsterisk";
import NewTournamentSteps from "../../../components/NewTournamentSteps";
import { emptyRound } from "../../../state/reducers/newTournamentReducer";
import getSimpleDateISOString from "../../../utils/getSimpleDateISOString";
import PointInput from "../../../components/PointInput";

const TournamentInfoView = () => {
	const navigate = useNavigate();
	const [currentInfo, setCurrentInfo] = useState<GeneralInfo>(initialState.info);
	const [showUmaHelp, setShowUmaHelp] = useState<boolean>(false);
	const dispatch = useDispatch();

	const {addGeneralInfo} = bindActionCreators(newTournamentActionCreators, dispatch);

	const onSave = (): void => {
		addGeneralInfo(currentInfo);
		navigate(Routes.ScheduleEntry);
	};

	const setRounds = (count: number): void => {
		const newRoundsArray = Array(count).fill(emptyRound);
		const dateTime = getSimpleDateISOString();

		setCurrentInfo({
			...currentInfo,
			rounds: newRoundsArray.map((_: Round) => ({
				scheduledStart: dateTime,
				realStart: ""
			}))
		});
	};

	useEffect(() => {
		setRounds(initialState.info.rounds.length);
	}, []);

	const toggleAutomaticUma = () => {
		setCurrentInfo({
			...currentInfo,
			uma: {
				...currentInfo.uma,
				automatic: !currentInfo.uma.automatic
			}
		})
	};

	const setTiebreakStyle = (style: UmaTiebreak) => {
		setCurrentInfo({
			...currentInfo,
			uma: {
				...currentInfo.uma,
				tiebreak: style
			}
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

	const setUma = (seat: number, newValue: PointInputType) => {
		const updatedAmounts: [PointInputType, PointInputType, PointInputType, PointInputType] = [
			...currentInfo.uma.amount
		];
		updatedAmounts[seat] = newValue;

		setCurrentInfo({
			...currentInfo,
			uma: {
				...currentInfo.uma,
				amount: updatedAmounts
			}
		});
	};

	const closeUmaHelp = () => setShowUmaHelp(false);
	const openUmaHelp = () => setShowUmaHelp(true);

	return (
		<>
			<Modal
				centered={true}
				open={showUmaHelp}
				title={"Uma settings"}
				onCancel={closeUmaHelp}
				footer={[
					<Button type={"primary"} onClick={closeUmaHelp}>Close</Button>
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
			<NewTournamentSteps key={"newTournamentSteps"} current={0}/>
			<div className={styles.tournamentInfoEntry}>
				<Space direction={"horizontal"}>
					<Space direction={"vertical"}>
						<h1>Start new tournament</h1>
						<Card title={(
							<p>Tournament Title<MandatoryAsterisk/></p>
						)}>
							<Input
								value={currentInfo.title}
								onChange={(e): void => setCurrentInfo({...currentInfo, title: e.target.value})}
							/>
						</Card>
						<Card title={"Rounds"}>
							<label>Number of rounds</label>
							<NumberInput
								minimum={1}
								value={currentInfo.rounds.length}
								onChange={(newValue: number): void => setRounds(newValue)}
							/>
							<label>Round length (minutes)</label>
							<NumberInput
								minimum={1}
								value={currentInfo.roundLength}
								onChange={(newValue: number): void => setCurrentInfo({...currentInfo, roundLength: newValue})}
							/>
						</Card>
						<div className={styles.button}>
							<Button
								type={"primary"}
								disabled={currentInfo.title.trim() === ""}
								onClick={() => onSave()}>
								Next
							</Button>
						</div>
					</Space>
					<Card title={"Uma"}>
						<Space direction={"vertical"}>
							<Checkbox
								checked={currentInfo.uma.automatic}
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
												value={currentInfo.uma.amount[0]}
												onChange={(newValue: PointInputType) => setUma(0, newValue)}
												short={true}
												disabled={!currentInfo.uma.automatic}
												uma
											/>
										</td>
									</tr>
									<tr>
										<td>2nd</td>
										<td>
											<PointInput
												className={styles.pointInput}
												value={currentInfo.uma.amount[1]}
												onChange={(newValue: PointInputType) => setUma(1, newValue)}
												short={true}
												disabled={!currentInfo.uma.automatic}
												uma
											/>
										</td>
									</tr>
									<tr>
										<td>3rd</td>
										<td>
											<PointInput
												className={styles.pointInput}
												value={currentInfo.uma.amount[2]}
												onChange={(newValue: PointInputType) => setUma(2, newValue)}
												short={true}
												disabled={!currentInfo.uma.automatic}
												uma
											/>
										</td>
									</tr>
									<tr>
										<td>4th</td>
										<td>
											<PointInput
												className={styles.pointInput}
												value={currentInfo.uma.amount[3]}
												onChange={(newValue: PointInputType) => setUma(3, newValue)}
												short={true}
												disabled={!currentInfo.uma.automatic}
												uma
											/>
										</td>
									</tr>
								</tbody>
							</table>
							<Radio.Group
								disabled={!currentInfo.uma.automatic}
								options={umaTiebreakOptions}
								value={currentInfo.uma.tiebreak}
								onChange={(e: RadioChangeEvent) => setTiebreakStyle(e.target.value)}
							/>
							<Button
								type={"default"}
								onClick={openUmaHelp}>
								<QuestionCircleOutlined/>
							</Button>
						</Space>
					</Card>
				</Space>
			</div>
		</>
	);
};

export default TournamentInfoView;