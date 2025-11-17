import styles from "./Affix.module.css";

type AffixProps = {
	children?: React.ReactNode
};

const Affix = (props: AffixProps) => {
	return (
		<div className={styles.affix}>
			{props.children}
		</div>
	);
};

export default Affix;