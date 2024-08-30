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
		path: [
			'M15.0163 77.0848C14.8185 79.1911 14.7174 81.3253 14.7174 83.483C14.7174 110.363 30.4085 133.591 53.1603 144.562C52.223 142.987 51.3394 141.361 50.5106 139.699C43.1718 124.982 38.8381 105.151 38.8381 83.6352C38.8381 76.8459 39.2696 70.2244 40.0908 63.8783C33.9098 63.6875 29.7643 64.9214 26.7874 66.4602C22.8618 68.4894 20.4453 71.1509 17.5331 74.3585C16.7439 75.2277 15.9183 76.1371 15.0163 77.0848ZM22.0009 52.924C27.5913 50.4236 34.3121 49.1595 42.6706 49.7227C44.624 41.5408 47.2753 34.0589 50.5106 27.5711C51.4145 25.7584 52.3837 23.9891 53.4167 22.2814C39.8532 28.7516 28.776 39.5694 22.0009 52.924ZM75.594 18.5232C71.4675 21.2175 67.1943 26.167 63.3259 33.9244C60.7287 39.1327 58.5127 45.2675 56.8181 52.105C64.5132 54.1767 70.5898 57.5994 75.594 61.7036L75.594 18.5232ZM75.5939 82.7284C70.0356 75.0897 63.9596 69.1359 54.221 66.2048C53.5248 71.7504 53.15 77.5889 53.15 83.6352C53.15 103.427 57.1657 120.993 63.3259 133.346C67.1942 141.103 71.4674 146.053 75.5938 148.747L75.5939 82.7284ZM89.9058 149.405L89.9059 103.673C94.6839 109.735 100.577 115.456 108.648 119.315C107.138 124.501 105.317 129.215 103.257 133.346C99.0492 141.785 94.3621 146.9 89.9058 149.405ZM111.835 104.824C104.148 100.103 99.27 92.596 93.3245 83.4473C92.853 82.7219 92.3749 81.9862 91.8881 81.2407C91.2425 80.252 90.5835 79.2516 89.9059 78.2459L89.906 17.8654C94.3622 20.37 99.0492 25.4859 103.257 33.9244C109.417 46.2777 113.433 63.8434 113.433 83.6352C113.433 91.0643 112.867 98.1797 111.835 104.824ZM125.484 109.978C126.957 101.68 127.745 92.811 127.745 83.6352C127.745 62.1194 123.411 42.2879 116.073 27.5711C115.301 26.0244 114.482 24.5093 113.617 23.037C135.677 34.2511 150.782 57.1096 150.782 83.483C150.782 88.8074 150.167 93.9885 149.002 98.9595C148.81 98.9116 148.811 98.9103 148.811 98.909L148.813 98.9009L148.816 98.8864L148.822 98.8641L148.827 98.8462C148.827 98.8458 148.821 98.868 148.808 98.9107C148.783 98.9966 148.732 99.1633 148.652 99.3957C148.488 99.8637 148.211 100.578 147.787 101.424C146.927 103.143 145.558 105.224 143.503 106.957C140.658 109.356 135.363 112.045 125.484 109.978ZM122.225 123.865C120.521 129.604 118.455 134.921 116.073 139.699C115.377 141.095 114.642 142.464 113.87 143.8C122.856 139.184 130.678 132.632 136.78 124.696C132.493 125.23 127.654 125.028 122.225 123.865ZM84.0061 165.555C128.902 164.886 165.094 128.399 165.094 83.483C165.094 38.1487 128.225 1.40167 82.7498 1.40167C37.2744 1.40167 0.405457 38.1487 0.405457 83.483C0.405457 128.817 37.2744 165.564 82.7498 165.564C82.8632 165.564 82.9766 165.564 83.0899 165.564C83.1571 165.564 83.2243 165.564 83.2916 165.564C83.5306 165.564 83.7688 165.561 84.0061 165.555Z',
		],
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
