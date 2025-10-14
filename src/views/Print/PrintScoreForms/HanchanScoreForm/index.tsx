import { useSearchParams } from "react-router-dom";
import styles from "./HanchanScoreForm.module.css";

export type Form = {
	eastPlayer: string,
	southPlayer: string,
	westPlayer: string,
	northPlayer: string,
	table: number,
	round: number
};

type HanchanScoreFormProps = {
	form: Form
};

const HanchanScoreForm = (props: HanchanScoreFormProps) => {
	const [searchParams, setSearchParams] = useSearchParams();

	const nameless = searchParams.get("nameless") === "true";
	
	return (
		<table className={styles.form}>
			<caption className={styles.tableRoundLabel}>Table {props.form.table} - Hanchan {props.form.round}</caption>
			<caption>Please enter points relative to starting points.</caption>
			<thead>
				<tr>
					<th className={styles.windCell}>{null}</th>
					<th className={styles.cell}>Name</th>
					<th className={styles.cell}>Raw</th>
					<th className={styles.cell}>Uma</th>
					<th className={styles.cell}>Penalty</th>
				</tr>
			</thead>
			<tbody>
				<tr>
					<td className={styles.windCell}>東</td>
					<td className={`${styles.cell} ${styles.nameCell}`}>{nameless ? "" : props.form.eastPlayer}</td>
					<td className={styles.cell}>{null}</td>
					<td className={styles.cell}>{null}</td>
					<td className={styles.cell}>{null}</td>
				</tr>
				<tr>
					<td className={styles.windCell}>南</td>
					<td className={`${styles.cell} ${styles.nameCell}`}>{nameless ? "" : props.form.southPlayer}</td>
					<td className={styles.cell}>{null}</td>
					<td className={styles.cell}>{null}</td>
					<td className={styles.cell}>{null}</td>
				</tr>
				<tr>
					<td className={styles.windCell}>西</td>
					<td className={`${styles.cell} ${styles.nameCell}`}>{nameless ? "" : props.form.westPlayer}</td>
					<td className={styles.cell}>{null}</td>
					<td className={styles.cell}>{null}</td>
					<td className={styles.cell}>{null}</td>
				</tr>
				<tr>
					<td className={styles.windCell}>北</td>
					<td className={`${styles.cell} ${styles.nameCell}`}>{nameless ? "" : props.form.northPlayer}</td>
					<td className={styles.cell}>{null}</td>
					<td className={styles.cell}>{null}</td>
					<td className={styles.cell}>{null}</td>
				</tr>
			</tbody>
		</table>
	);
};

export default HanchanScoreForm;