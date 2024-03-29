import { ChangeEvent } from "react";

export type DropdownItem = {
	value: number,
	text: string
};

type DropdownProps = {
	className?: string,
	id: string,
	label: string,
	value: number,
	items: DropdownItem[],
	onChange: (newValue: number) => void
};

const Dropdown = (props: DropdownProps) => {
	const className = `${props.className ? props.className : ""}`;

	return (
		<div className={className}>
			<label htmlFor={props.id}>{props.label}</label>
			<select
				id={props.id}
				value={props.value}
				onChange={(e: ChangeEvent<HTMLSelectElement>) => props.onChange(+e.target.value)}>
				{
					props.items.map((item: DropdownItem, index: number) => (
						<option
							key={`dropdown-${props.label}-option-${index}`}
							value={item.value}>
							{item.text}
						</option>
					))
				}
			</select>
		</div>
	);
};

export default Dropdown;