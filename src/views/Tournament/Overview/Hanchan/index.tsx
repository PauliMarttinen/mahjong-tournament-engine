import styles from "./Hanchan.module.css";

type HanchanProps = {
	east: string,
	south: string,
	west: string,
	north: string,
	finished: boolean,
	onClick?: () => void,
	hilight: string,
	clickable: boolean
};

const Hanchan = (props: HanchanProps) => {
	const isHilighted = (name: string) => props.hilight.length > 0 && name.toLowerCase().indexOf(props.hilight.toLowerCase()) >= 0;

	const eastHilight = isHilighted(props.east) ? styles.hilightedPlayer : "";
	const southHilight = isHilighted(props.south) ? styles.hilightedPlayer : "";
	const westHilight = isHilighted(props.west) ? styles.hilightedPlayer : "";
	const northHilight = isHilighted(props.north) ? styles.hilightedPlayer : "";

	const hanchanClassName = `${styles.hanchan} ${props.finished && styles.finished}`

	const eastClassName = `player ${eastHilight}`;
	const southClassName = `player ${southHilight}`;
	const westClassName = `player ${westHilight}`;
	const northClassName = `player ${northHilight}`;

	return (
		<div className={hanchanClassName}>
			{
				/* props.clickable &&
				<div className={styles.clickable} onClick={() => props.onClick()}>{null}</div> */
			}
			<table>
				<tbody>
					<tr>
						<td>East</td>
						<td className={eastClassName}>{props.east}</td>
					</tr>
					<tr>
						<td>South</td>
						<td className={southClassName}>{props.south}</td>
					</tr>
					<tr>
						<td>West</td>
						<td className={westClassName}>{props.west}</td>
					</tr>
					<tr>
						<td>North</td>
						<td className={northClassName}>{props.north}</td>
					</tr>
				</tbody>
			</table>
		</div>
	);
};

export default Hanchan;