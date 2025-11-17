import {Button} from "antd";
import print from "./utils/print";
import styles from "./PrintableIframe.module.css";

type PrintableIframeProps = {
	label: string,
	id: string,
	src: string
};

const PrintableIframe = (props: PrintableIframeProps) => {
	return (
		<div>
			<Button
				type={"default"}
				onClick={() => print(props.id)}>
				{props.label}
			</Button>
			<iframe
				id={props.id}
				className={styles.iframe}
				src={props.src}
			/>
		</div>
	);
};

export default PrintableIframe;