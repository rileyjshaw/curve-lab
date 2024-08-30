import { useDeferredValue, useRef } from 'react';
import { useMeasure } from '@uidotdev/usehooks';
import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { NextUIProvider } from '@nextui-org/system';
import { Button, ButtonGroup } from '@nextui-org/button';
import { Tooltip } from '@nextui-org/tooltip';
import type { ReactZoomPanPinchRef } from 'react-zoom-pan-pinch';
import { RotateCcw } from 'lucide-react';

import CurveTypeSelector from './CurveTypeSelector';
import Header from './Header';
import Logo from './Logo';
import { curveTypes, globalSettingsConfig, notchLocations } from './constants';
import Slider from './Slider';

interface State {
	selectedCurveId: number;
	curveSettings: number[][];
	globalSettings: number[];
	setSelectedCurveId: (id: number) => void;
	resetSelectedCurveSettings: () => void;
	resetCurveSettings: () => void;
	resetGlobalSettings: () => void;
	updateSelectedCurveSetting: (settingId: number, newValue: number) => void;
	updateGlobalSetting: (settingId: number, newValue: number) => void;
}

const defaultCurveSettings = curveTypes.map((curveType) =>
	curveType.settings?.map((setting) => setting.defaultValue)
);

const defaultGlobalSettings = globalSettingsConfig.map(
	(setting) => setting.defaultValue
);

const useStore = create<State>()(
	devtools((set) => ({
		selectedCurveId: 0,
		curveSettings: defaultCurveSettings,
		globalSettings: defaultGlobalSettings,

		setSelectedCurveId: (id: number) => set({ selectedCurveId: id }),
		resetSelectedCurveSettings: () =>
			set((state) => {
				const curveSettings = [...state.curveSettings];
				curveSettings[state.selectedCurveId] =
					defaultCurveSettings[state.selectedCurveId];
				return { curveSettings };
			}),
		resetCurveSettings: () =>
			set(() => ({ curveSettings: defaultCurveSettings })),
		resetGlobalSettings: () =>
			set(() => ({ globalSettings: defaultGlobalSettings })),
		updateSelectedCurveSetting: (settingId, newValue) =>
			set((state) => {
				const curveSettings = [...state.curveSettings];
				const selectedCurveSettings = [
					...curveSettings[state.selectedCurveId],
				];
				selectedCurveSettings[settingId] = newValue;
				curveSettings[state.selectedCurveId] = selectedCurveSettings;
				return { curveSettings };
			}),
		updateGlobalSetting: (settingId, newValue) =>
			set((state) => {
				const globalSettings = [...state.globalSettings];
				globalSettings[settingId] = newValue;
				return { globalSettings };
			}),
	}))
);

function App() {
	const [logoRef, logoSize] = useMeasure();
	const transformWrapperRef = useRef<ReactZoomPanPinchRef | null>(null);
	const downloadRef = useRef<SVGSVGElement | null>(null);
	const {
		selectedCurveId,
		setSelectedCurveId,
		curveSettings,
		globalSettings,
		resetSelectedCurveSettings,
		resetCurveSettings,
		resetGlobalSettings,
		updateSelectedCurveSetting,
		updateGlobalSetting,
	} = useStore((state: State) => state);

	const selectedCurve = curveTypes[selectedCurveId];
	const curveSettingsConfig = selectedCurve.settings;
	const selectedCurveSettings = curveSettings[selectedCurveId];
	const deferredGlobalSettings = useDeferredValue(globalSettings);

	const [curvePath, curveTransform] =
		typeof selectedCurve.path === 'function'
			? selectedCurve.path(...selectedCurveSettings, ...globalSettings)
			: selectedCurve.path;
	const deferredCurvePath = useDeferredValue(curvePath);
	const deferredCurveTransform = useDeferredValue(curveTransform);
	// const isPathCurrent = deferredCurvePath === curvePath && deferredCurveTransform === curveTransform && deferredGlobalSettings === globalSettings;

	// HACK: Prevent flash when switching between wordmark and logo.
	const isWordmark = selectedCurveId === 0 || !deferredCurvePath;

	function resetZoom() {
		if (transformWrapperRef.current) {
			const { resetTransform } = transformWrapperRef.current;
			resetTransform(0);
		}
	}

	function zoomToNotch(notchIdx: number) {
		if (transformWrapperRef.current) {
			const { setTransform } = transformWrapperRef.current;
			if (!logoSize.width || !logoSize.height) return;

			resetZoom();
			// Each of these coordinates is a %, so usually we would need to /= 100. But since the zoom level is 100, we
			// also need to *= 100, so it cancels out.
			const [x, y] = notchLocations[notchIdx];
			setTransform(
				-(x * logoSize.width),
				-(y * logoSize.height),
				100,
				1500,
				'easeInQuad'
			);
		}
	}

	function handleCurveTypeChange(id: number) {
		resetZoom();
		setSelectedCurveId(id);
	}

	function downloadSvg() {
		const svgElement = downloadRef.current;
		if (!svgElement) return;

		const svgData = new XMLSerializer().serializeToString(svgElement);
		const svgBlob = new Blob([svgData], {
			type: 'image/svg+xml;charset=utf-8',
		});
		const svgUrl = URL.createObjectURL(svgBlob);

		const downloadLink = document.createElement('a');
		downloadLink.href = svgUrl;
		downloadLink.download = 'logo.svg';
		document.body.appendChild(downloadLink);
		downloadLink.click();
		document.body.removeChild(downloadLink);

		URL.revokeObjectURL(svgUrl);
	}

	return (
		<div className="min-h-dvh flex flex-col">
			<Header />
			<main className="constrain-x grow">
				<section>
					<div className="flex justify-between items-center mb-4 flex-wrap">
						<h2 className="mb-0">Logo</h2>
						<div className="flex">
							<Tooltip
								className="text-tiny text-default-500 rounded-md px-2 py-1 bg-white"
								content="Zoom presets are only available for the wordmark"
								placement="bottom"
								isDisabled={isWordmark}
							>
								<ButtonGroup
									size="sm"
									radius="sm"
									color="primary"
									variant="light"
								>
									{notchLocations.map((_, idx) => (
										<Button
											// biome-ignore lint/suspicious/noArrayIndexKey: These IDs are unique and fixed.
											key={idx}
											onPress={() => zoomToNotch(idx)}
											className="shrink min-w-0"
											isDisabled={!isWordmark}
										>
											{idx + 1}
										</Button>
									))}
								</ButtonGroup>
							</Tooltip>
							<Button
								onPress={resetZoom}
								size="sm"
								radius="sm"
								color="primary"
								variant="light"
								className="px-1 min-w-0 w-12"
							>
								<RotateCcw size={20} />
							</Button>
						</div>
					</div>
					{
						<div ref={logoRef}>
							<Logo
								ref={transformWrapperRef}
								downloadRef={downloadRef}
								width={
									isWordmark
										? logoSize.width
										: Math.min(logoSize.width ?? 0, 260)
								}
								globalSettings={deferredGlobalSettings}
								curvePath={deferredCurvePath}
								curveTransform={deferredCurveTransform}
								isWordmark={isWordmark}
							/>
						</div>
					}
				</section>
				<section>
					<h2>Curve type</h2>
					<CurveTypeSelector
						curveId={selectedCurveId}
						setCurveId={handleCurveTypeChange}
					/>
				</section>
				{!isWordmark && (
					<div className="grid gap-x-16 md:grid-cols-2">
						<div className="pr-4 md:pr-0">
							<section>
								<div className="flex justify-between items-center flex-wrap">
									<h2 className="mb-0">Curve settings</h2>
									<Button
										isDisabled={!curveSettingsConfig.length}
										size="sm"
										radius="sm"
										color="primary"
										variant="light"
										onPress={resetSelectedCurveSettings}
										className="px-1 min-w-0 w-12"
									>
										<RotateCcw size={20} />
									</Button>
								</div>
								{curveSettingsConfig.length ? (
									curveSettingsConfig.map(
										(settings, index) => {
											return (
												<Slider
													key={`${selectedCurveId}-${
														settings.id
													}`}
													label={settings.label}
													value={
														selectedCurveSettings[
															index
														]
													}
													minValue={settings.min}
													maxValue={settings.max}
													defaultValue={
														settings.defaultValue
													}
													step={settings.step}
													setValue={(newValue) =>
														updateSelectedCurveSetting(
															index,
															newValue
														)
													}
												/>
											);
										}
									)
								) : (
									<p className="text-sm text-gray-500">
										There are no settings available for this
										curve.
									</p>
								)}
							</section>
							<section>
								<div className="flex justify-between items-center flex-wrap">
									<h2 className="mb-0">Global settings</h2>
									<Button
										size="sm"
										radius="sm"
										color="primary"
										variant="light"
										onPress={resetGlobalSettings}
										className="px-1 min-w-0 w-12"
									>
										<RotateCcw size={20} />
									</Button>
								</div>
								{globalSettingsConfig.map((settings, index) => {
									return (
										<Slider
											key={`global-${settings.id}`}
											label={settings.label}
											value={globalSettings[index]}
											minValue={settings.min}
											maxValue={settings.max}
											defaultValue={settings.defaultValue}
											step={settings.step}
											setValue={(newValue) =>
												updateGlobalSetting(
													index,
													newValue
												)
											}
										/>
									);
								})}
							</section>
						</div>
						<section>
							<h2>About this curve</h2>
							{(
								selectedCurve.extendedDescription ?? [
									selectedCurve.description,
								]
							).map((p, i) => (
								<p
									key={`${selectedCurve.id}-${i}`}
									className={`text-sm text-gray-500${i ? ' mt-2' : ''}`}
								>
									{p}
								</p>
							))}
						</section>
					</div>
				)}
				<section>
					<div className="flex justify-between items-center flex-wrap">
						<h2>Controls</h2>
					</div>
					<div className="flex flex-wrap gap-4">
						<Button
							onPress={downloadSvg}
							color="primary"
							radius="sm"
							size="sm"
						>
							Export SVG
						</Button>
						<Button
							onPress={() => {
								resetCurveSettings();
								resetGlobalSettings();
								resetZoom();
							}}
							color="warning"
							radius="sm"
							size="sm"
						>
							Reset all
						</Button>
					</div>
				</section>
			</main>
		</div>
	);
}

function AppWrapper() {
	return (
		<NextUIProvider>
			<App />
		</NextUIProvider>
	);
}

export default AppWrapper;
