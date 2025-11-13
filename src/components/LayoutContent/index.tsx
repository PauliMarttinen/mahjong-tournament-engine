import {Layout} from "antd";
import { ReactNode } from "react";
import styles from "./LayoutContent.module.css";

type LayoutContentProps = {
	children: ReactNode
};

const LayoutContent = (props: LayoutContentProps) => {
	return (
		<Layout.Content className={styles.layoutContent}>
			{props.children}
		</Layout.Content>
	);
};

export default LayoutContent;