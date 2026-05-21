import { useState } from "react";
import { Button, Modal, Space, Input } from "antd";
import { type PointInputType } from "../../../../../components/PointInput";
import PointInput from "../../../../../components/PointInput";
import { getNumericValue } from "../../../../../utils/getNumericValue";
import styles from "./OorasuModal.module.css";
import { formatPoints } from "../../../../../utils/formatPoints";

type OorasuModalProps = {
	open: boolean,
	onClose: () => void
};

const INITIAL_POINTS: PointInputType = {
	positive: true,
	value: 0
};

const OorasuModal = (props: OorasuModalProps) => {
	const [firstPoints, setFirstPoints] = useState<PointInputType>(INITIAL_POINTS);
	const [secondPoints, setSecondPoints] = useState<PointInputType>(INITIAL_POINTS);
	const [thirdPoints, setThirdPoints] = useState<PointInputType>(INITIAL_POINTS);
	const [fourthPoints, setFourthPoints] = useState<PointInputType>(INITIAL_POINTS);

	const total =
		getNumericValue(firstPoints) +
		getNumericValue(secondPoints) +
		getNumericValue(thirdPoints) +
		getNumericValue(fourthPoints);

	const onClose = () => {
		setFirstPoints(INITIAL_POINTS);
		setSecondPoints(INITIAL_POINTS);
		setThirdPoints(INITIAL_POINTS);
		setFourthPoints(INITIAL_POINTS);

		props.onClose();
	};

	return (
		<Modal
			open={props.open}
			onCancel={onClose}
			footer={[
			<Button type={"primary"} onClick={onClose}>Close</Button>
			]}
			title={"Oorasu checker"}
			className={styles.oorasuModal}>
			<Space direction={"vertical"} className={styles.form}>
				<PointInput
					value={firstPoints}
					onChange={(newValue: PointInputType) => setFirstPoints(newValue)}
					short
				/>
				<PointInput
					value={secondPoints}
					onChange={(newValue: PointInputType) => setSecondPoints(newValue)}
					short
				/>
				<PointInput
					value={thirdPoints}
					onChange={(newValue: PointInputType) => setThirdPoints(newValue)}
					short
				/>
				<PointInput
					value={fourthPoints}
					onChange={(newValue: PointInputType) => setFourthPoints(newValue)}
					short
				/>
				<Input
					value={formatPoints({points: total, sign: true})}
					onChange={() => {}}
					disabled
					className={total === 0 ? styles.correct : styles.wrong}
				/>
			</Space>
			{
				total === 0
				?
				<p>Oorasu OK!</p>
				:
				<p>Oorasu incorrect!</p>
			}
		</Modal>
	);
};

export default OorasuModal;