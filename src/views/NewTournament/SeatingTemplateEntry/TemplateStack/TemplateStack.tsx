import { Card, Space, Button } from "antd";
import { type SeatingTemplateHistoryItem, SeatingTemplateTypes } from "../../../../data-types/new-tournament-data-types";

type TemplateStackProps = {
	recommendedExists: boolean,
	index: number,
	history: SeatingTemplateHistoryItem[],
	onChange: (newIndex: number) => void
};

/**
 * TODO: Muuta history stackiksi kaikkialla.
 */

const TemplateStack = (props: TemplateStackProps) => {
	const setRecommendedSeating = () => {
		if (!props.recommendedExists) return;
		props.onChange(0);
	};

	return (
		<Card title={"Template stack"}>
			<Space direction={"vertical"}>
				<p>Template {props.index + 1} of {props.history.length}</p>
				<p>Kind: {SeatingTemplateTypes[props.history[props.index].type]}</p>
				<Button
					type={"default"}
					onClick={() => props.onChange(props.index - 1)}
					disabled={props.index === 0}>
					Previous Seating
				</Button>
				<Button
					type={"default"}
					onClick={() => props.onChange(props.index + 1)}
					disabled={props.index === props.history.length - 1}>
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