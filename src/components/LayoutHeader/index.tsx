import type { ReactNode } from "react"
import {Layout} from "antd";
import styles from "./LayoutHeader.module.css";

type LayoutHeaderProps = {
	children: ReactNode
};

const LayoutHeader = (props: LayoutHeaderProps) => {
	return (
		<Layout.Header className={styles.layoutHeader}>
			{props.children}
		</Layout.Header>
	);
};

export default LayoutHeader;