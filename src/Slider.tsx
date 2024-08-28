import React, { useEffect } from 'react';
import { Slider as NextSlider } from '@nextui-org/slider';
import type { SliderProps } from '@nextui-org/slider';
import { Tooltip } from '@nextui-org/tooltip';

function Slider({
	label,
	isDisabled,
	value,
	setValue,
	minValue,
	maxValue,
	defaultValue,
	step,
}: SliderProps & {
	value: number;
	setValue: (value: number) => void;
}) {
	const [inputValue, setInputValue] = React.useState(`${value}`);

	const handleChange = (value: number | number[]) => {
		if (Array.isArray(value)) return;
		if (Number.isNaN(Number(value))) return;

		setValue(value);
		setInputValue(value.toString());
	};

	useEffect(() => {
		setInputValue(value.toString());
	}, [value]);

	return (
		<NextSlider
			label={label}
			isDisabled={isDisabled}
			size="md"
			step={step}
			minValue={minValue}
			maxValue={maxValue}
			defaultValue={defaultValue}
			color="primary"
			classNames={{
				base: 'max-w-md pl-4 mt-4',
				label: 'text-sm font-semibold',
			}}
			// eslint-disable-next-line @typescript-eslint/no-unused-vars
			renderValue={({ children, ...props }) => (
				<output {...props}>
					<Tooltip
						isDisabled={isDisabled}
						className="text-tiny text-default-500 rounded-md px-2 py-1 bg-white"
						content="Press Enter to confirm"
						placement="left"
					>
						<input
							className="px-1 py-0.5 w-12 text-right text-small text-default-700 font-medium bg-default-100 outline-none transition-colors rounded-md border-medium border-transparent hover:border-primary focus:border-primary disabled:border-none"
							type="text"
							disabled={isDisabled}
							value={inputValue}
							onChange={(e) => {
								setInputValue(e.target.value);
							}}
							onKeyDown={(e) => {
								if (
									e.key === 'Enter' &&
									!Number.isNaN(Number(inputValue))
								) {
									setValue(Number(inputValue));
								}
							}}
						/>
					</Tooltip>
				</output>
			)}
			value={Number(value)}
			onChange={handleChange}
		/>
	);
}

export default Slider;
