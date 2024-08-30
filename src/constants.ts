function addIndexId<T>(item: T, index: number): T & { id: number } {
	return { ...item, id: index };
}

interface SettingsConfig {
	id: number;
	label: string;
	min: number;
	max: number;
	step?: number;
	defaultValue: number;
}

interface CurveType {
	id: number;
	title: string;
	description: string;
	extendedDescription: string[];
	path: string[] | ((...args: unknown[]) => string[]);
	settings: SettingsConfig[];
}

export const curveTypes: CurveType[] = [
	{
		title: 'Wordmark',
		description: 'Use the buttons to zoom in.',
		path: [''],
	},
	{
		title: 'Original curve',
		description: 'Watershed’s current logo.',
		extendedDescription: [
			'This is the original curve used in Watershed’s logo. It is a simple cubic Bézier curve defined by four points. The curve’s bottom dips a bit lower than a symmetrical curve would.',
			'The logo displayed above keeps the original curve while fixing a few bugs in the rest of the logo. Specifically, the vertical line is now centered on the logo, the aspect ratio is updated to 1:1, and stroke widths are made consistent. The curve now makes a smoother connection to the outer circle.',
		],
		path: (rotation: number) => [
			'M5.097,43.248C9.541,38.671 14.374,30.832 31.981,34.912C52.643,39.696 52.042,61.805 69.449,68.505C90.816,76.727 94.859,60.366 94.859,60.366',
			`rotate(${rotation} 50 50)`,
		],
		settings: [
			{
				label: 'Rotation',
				min: -180,
				max: 180,
				step: 1,
				defaultValue: 0,
			},
		],
	},
	{
		title: 'Quadratic curve',
		description: 'My personal favourite.',
		extendedDescription: [
			'This curve is ✨ elegance ✨',
			'It maintains the spirit of the original curve while improving its flow and balance. Weighing a mere 25 characters, this curve makes the most of the vector format.',
			'I think this is the best one; no point pretending otherwise.',
		],
		path: (
			curveHeight: number,
			verticalOffset: number,
			rotation: number,
			strokeWidth: number
		) => {
			return [
				`M${strokeWidth / 2} ${50 - verticalOffset}Q 25,${50 - curveHeight} 50,50 T${100 - strokeWidth / 2} ${50 + verticalOffset}`,
				`rotate(${rotation} 50 50)`,
			];
		},
		settings: [
			{
				label: 'Height',
				min: 10,
				max: 50,
				defaultValue: 30,
			},
			{
				label: 'Vertical offset',
				min: 0,
				max: 20,
				defaultValue: 6,
			},
			{
				label: 'Rotation',
				min: -180,
				max: 180,
				step: 1,
				defaultValue: 0,
			},
		],
	},
	{
		title: 'Sine curve',
		description: 'Tricky to make with SVG.',
		extendedDescription: [
			'Sine waves are everywhere in nature, from tides to sound and light waves.',
			'The problem with using sine curves in SVG is that they’re not natively supported. It’s easy to generate one with code, but they’re hard to edit afterwards. If you inspect the exported SVG, you’ll see that this “curve” is actually a series of 100 connected straight lines. It’s inherently not a vector curve.',
			'I also think it looks too straight in the middle.',
		],
		path: (
			curveHeight: number,
			period: number,
			rotation: number,
			strokeWidth: number
		) => {
			const periodOffset = (1 - period) / 2;
			const xOffset = Math.sin(periodOffset * Math.PI);
			const xMin = strokeWidth / 2 + xOffset;
			const xMax = 100 - strokeWidth / 2 - xOffset;
			const xRange = xMax - xMin;
			const points = Array.from({ length: 100 }, (_, i) => {
				const x = xMin + (i / 99) * xRange;
				const y =
					-Math.sin(
						((i / 99) * period + periodOffset) * Math.PI * 2
					) *
						curveHeight +
					50;
				return `${x} ${y}`;
			});
			return [`M${points.join('L')}`, `rotate(${rotation} 50 50)`];
		},
		settings: [
			{
				label: 'Height',
				min: 0,
				max: 30,
				defaultValue: 15,
			},
			{
				label: 'Period',
				min: 0.25,
				max: 1.5,
				step: 0.01,
				defaultValue: 0.9,
			},
			{
				label: 'Rotation',
				min: -180,
				max: 180,
				step: 1,
				defaultValue: 0,
			},
		],
	},
	{
		title: 'Semicircle curve',
		description: 'This one’s a dud.',
		extendedDescription: [
			'This curve connects an arc from the top of a circle with an arc from the bottom of a circle. The clearest way to see this is by dragging the “Radius” slider all the way to the left.',
			'It’s quirky and fun, but doesn’t feel like a great fit to me.',
		],
		path: (radius: number, rotation: number, strokeWidth: number) => {
			return [
				`M ${strokeWidth / 2} 50 A ${radius} ${radius} 0 0 1 50 50 A ${radius} ${radius} 0 0 0 ${100 - strokeWidth / 2} 50`,
				`rotate(${rotation} 50 50)`,
			];
		},
		settings: [
			{
				label: 'Radius',
				min: 20,
				max: 100,
				defaultValue: 25,
			},
			{
				label: 'Rotation',
				min: -180,
				max: 180,
				step: 1,
				defaultValue: 0,
			},
		],
	},
].map((curveType, curveTypeIndex) => {
	return {
		...addIndexId(curveType, curveTypeIndex),
		settings: curveType.settings?.map(addIndexId) || [],
	};
}) as CurveType[];

export const globalSettingsConfig: SettingsConfig[] = [
	{
		label: 'Stroke width',
		min: 1,
		max: 16,
		step: 0.1,
		defaultValue: 8.7,
	},
].map(addIndexId);

export const notchLocations = [
	[17.818074484944532, 58.45941978497207], // Logo connection
	[40.471640253565766, 67.66740104510782], // a
	[46.60846275752773, 63.1388119406571], // t
	[51.40283676703645, 54.2448147035858], // e
	[65.58913629160064, 60.8640807255691], // s
	[82.346323296355, 54.216253228422126], // e
];
