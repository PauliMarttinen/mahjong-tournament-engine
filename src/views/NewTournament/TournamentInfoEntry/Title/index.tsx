import MandatoryAsterisk from "../../../../components/MandatoryAsterisk";
import { Card, Input } from "antd";

type TitleProps = {
	title: string,
	onChange: (newTitle: string) => void
};

const Title = (props: TitleProps) => {
	return (
		<Card title={(
			<p>Tournament Title<MandatoryAsterisk/></p>
		)}>
			<Input
				value={props.title}
				onChange={(e) => props.onChange(e.target.value)}
			/>
		</Card>
	);
};

export default Title;