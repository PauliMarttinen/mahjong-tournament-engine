import styles from "../HanchanResults.module.css";

type AccordionLabelProps = {
	table: number,
	east: string,
	south: string,
	west: string,
	north: string,
	finished: boolean
};

const AccordionLabel = (props: AccordionLabelProps) => {
	return (
		<div className={styles.accordionLabel}>
			<div className={styles.tableLabel}>Table {props.table+1}</div>
			<div className={styles.players}>{props.east} &mdash; {props.south} &mdash; {props.west} &mdash; {props.north}</div>
			<div className={`${styles.statusLabel} ${!props.finished ? styles.unfinished : ""}`}>Finished</div>
		</div>
	);
};

export default AccordionLabel;