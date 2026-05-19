import { useState } from "react";
import { Button } from "antd";
import OorasuModal from "./OorasuModal";
import styles from "./OorasuChecker.module.css";

const OorasuChecker = () => {
	const [showModal, setShowModal] = useState<boolean>(false);

	return (
		<>
			<OorasuModal
				open={showModal}
				onClose={() => setShowModal(false)}
			/>
			<Button
				className={styles.oorasuCheckerButton}
				onClick={() => setShowModal(true)}>
				Oorasu checker
			</Button>	
		</>
	)
};

export default OorasuChecker;