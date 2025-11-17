import {Layout} from "antd";
import type { ReactNode } from "react";
import styles from "./LayoutContent.module.css";

type LayoutContentProps = {
	className?: string,
	children: ReactNode
};

const LayoutContent = (props: LayoutContentProps) => {
	return (
		<Layout.Content className={`${styles.layoutContent} ${props.className ? props.className : ""}`}>
			{props.children}
		</Layout.Content>
	);
};

export default LayoutContent;