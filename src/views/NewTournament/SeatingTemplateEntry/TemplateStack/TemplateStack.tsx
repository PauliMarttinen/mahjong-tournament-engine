import { Card, Space, Button } from "antd";
import { type SeatingTemplateStackItem, SeatingTemplateTypes } from "../../../../data-types/new-tournament-data-types";

type TemplateStackProps = {
	recommendedExists: boolean,
	index: number,
	stack: SeatingTemplateStackItem[],
	onChange: (newIndex: number) => void
};

const TemplateStack = (props: TemplateStackProps) => {
	const setRecommendedSeating = () => {
		if (!props.recommendedExists) return;
		props.onChange(0);
	};

	return (
		<Card title={"Template stack"}>
			<Space direction={"vertical"}>
				<p>Template {props.index + 1} of {props.stack.length}</p>
				<p>Kind: {SeatingTemplateTypes[props.stack[props.index].type]}</p>
				<Button
					type={"default"}
					onClick={() => props.onChange(props.index - 1)}
					disabled={props.index === 0}>
					Previous Seating
				</Button>
				<Button
					type={"default"}
					onClick={() => props.onChange(props.index + 1)}
					disabled={props.index === props.stack.length - 1}>
					Next Seating
				</Button>
				{
					props.recommendedExists &&
					<Button
						type={"default"}
						onClick={() => setRecommendedSeating()}>
						Recommended
					</Button>
				}
			</Space>
		</Card>
	);
};

export default TemplateStack;