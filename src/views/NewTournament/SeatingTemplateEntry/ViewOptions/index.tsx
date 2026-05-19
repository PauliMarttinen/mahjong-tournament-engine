import { Card, Button } from "antd";
import FormatSelector, {Formats} from "./FormatSelector";

type ViewOptionsProps = {
	onPreview: (newState: boolean) => void,
	format: Formats,
	onFormat: (newFormat: Formats) => void
};

const ViewOptions = (props: ViewOptionsProps) => {
	return (
		<Card title={"View options"}>
			<Button
				type={"default"}
				onClick={() => props.onPreview(true)}>
				Preview With Names (NYI)
			</Button>
			<FormatSelector
				format={props.format}
				onFormatChange={props.onFormat}
			/>								
		</Card>
	);
};

export default ViewOptions;