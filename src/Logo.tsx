import React from 'react';
import { TransformWrapper, TransformComponent } from 'react-zoom-pan-pinch';
import type { ReactZoomPanPinchRef } from 'react-zoom-pan-pinch';

interface LogoProps {
	width: number;
	globalSettings: number[];
	curvePath: string;
	curveTransform?: string;
}

const Wordmark = React.forwardRef(function Wordmark(
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	{ width, curvePath, curveTransform, globalSettings, ...rest }: LogoProps,
	ref: React.Ref<SVGSVGElement>
) {
	return (
		<svg
			ref={ref}
			viewBox="0 0 815 168"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
			width={width}
			{...rest}
		>
			<title>Watershed Wordmark</title>
			<g>
				<path d={curvePath} fill="#265CFF" fillRule="evenodd" />
			</g>
			<g>
				<path
					d="M328.737 126.553C315.939 126.553 305.941 119.338 305.941 105.697C305.941 90.7715 317.939 85.0385 331.037 85.0385H341.735C348.334 85.0385 351.333 82.4685 351.333 77.9216C351.333 71.9909 345.834 69.1244 338.735 69.1244C330.237 69.1244 324.838 73.177 324.338 80.3927H308.541C309.54 66.3567 318.739 57.2629 338.535 57.2629C358.332 57.2629 366.431 66.7521 366.431 79.8985V107.872C366.431 111.035 367.63 112.221 370.83 112.221H373.329V124.478H363.031C355.832 124.478 351.833 120.919 351.833 114.791V112.32H351.633C347.434 122.007 338.935 126.553 328.737 126.553ZM333.436 114.494C342.435 114.494 351.333 108.959 351.333 95.4172V89.3877H351.133C349.134 93.4403 345.234 95.4172 338.435 95.7138L333.536 95.9115C325.638 96.1091 322.238 100.063 322.238 105.203C322.238 110.343 325.638 114.593 333.536 114.593L333.436 114.494Z"
					fill="#0B2471"
				/>
				<path
					d="M383.628 106.883V71.5954H370.93V59.3385H383.628V41.5464H398.825V59.3385H418.721V71.5954H398.825V104.709C398.825 110.244 401.724 112.418 406.724 112.418H419.021V124.675H401.524C389.727 124.675 383.528 118.843 383.528 106.982L383.628 106.883Z"
					fill="#0B2471"
				/>
				<path
					d="M422.715 91.9572C422.715 70.3101 436.313 57.3613 455.31 57.3613C474.307 57.3613 487.004 68.5309 487.004 89.4861V96.2075H438.813C439.313 107.377 445.612 114.692 455.71 114.692C463.009 114.692 468.508 110.738 470.607 104.511H486.204C483.305 117.558 471.807 126.553 455.51 126.553C436.013 126.553 422.815 113.505 422.815 91.9572H422.715ZM471.807 85.4334C471.807 75.9442 466.008 69.2228 455.71 69.2228C445.412 69.2228 439.912 76.3396 438.913 85.4334H471.807Z"
					fill="#0B2471"
				/>
				<path
					d="M497.405 59.3372H512.303V69.6171H512.503C515.602 63.0933 519.801 59.3372 528.6 59.3372H534.999V71.594H525.9C516.802 71.594 512.603 76.4374 512.603 87.1127V124.575H497.505V59.3372H497.405Z"
					fill="#0B2471"
				/>
				<path
					d="M538.597 102.929H554.195C554.595 111.133 559.794 114.692 567.592 114.692C575.391 114.692 580.19 110.935 580.19 105.104C580.19 99.9637 576.991 96.8994 568.792 96.8994H561.593C547.796 96.8994 539.797 89.3872 539.797 78.4154C539.797 65.9609 549.995 57.3613 567.292 57.3613C584.589 57.3613 594.788 66.6528 595.188 80.4911H579.69C579.29 73.1766 575.291 69.2228 567.192 69.2228C559.994 69.2228 555.594 72.5835 555.594 77.9211C555.594 82.7646 559.294 85.1369 565.393 85.1369H573.291C589.089 85.1369 596.287 93.9341 596.287 104.609C596.287 117.558 585.989 126.652 567.592 126.652C549.196 126.652 538.897 117.36 538.497 103.028L538.597 102.929Z"
					fill="#0B2471"
				/>
				<path
					d="M606.789 41.7434H621.886V58.5471C621.886 61.5125 621.886 63.7859 621.686 69.3212H621.886C625.386 62.2044 632.185 57.361 641.683 57.361C655.181 57.361 664.479 66.6524 664.479 82.4677V124.576H649.382V85.433C649.382 73.7693 644.383 69.3212 636.884 69.3212C629.385 69.3212 621.886 74.1647 621.886 87.2122V124.576H606.789V41.7434Z"
					fill="#0B2471"
				/>
				<path
					d="M674.773 91.9572C674.773 70.3101 688.271 57.3613 707.368 57.3613C726.464 57.3613 739.062 68.5309 739.062 89.4861V96.2075H690.871C691.371 107.377 697.669 114.692 707.768 114.692C715.066 114.692 720.566 110.738 722.665 104.511H738.262C735.363 117.558 723.865 126.553 707.568 126.553C687.971 126.553 674.873 113.505 674.873 91.9572H674.773ZM723.865 85.4334C723.865 75.9442 718.066 69.2228 707.768 69.2228C697.47 69.2228 691.97 76.3396 690.971 85.4334H723.865Z"
					fill="#0B2471"
				/>
				<path
					d="M746.562 91.9568C746.562 69.3212 760.559 57.361 775.957 57.361C786.055 57.361 794.054 62.5009 798.053 70.8039H798.253C798.053 68.5305 798.053 66.5536 798.053 64.1813V41.7434H813.15V124.576H798.153V120.227C798.153 117.854 798.153 115.68 798.253 113.209H798.053C794.054 121.512 786.055 126.652 775.957 126.652C760.559 126.652 746.562 114.691 746.562 92.0557V91.9568ZM780.456 114.691C791.454 114.691 798.053 105.696 798.053 91.9568C798.053 78.2173 791.454 69.2224 780.456 69.2224C769.458 69.2224 762.759 78.2173 762.759 91.9568C762.759 105.696 769.358 114.691 780.456 114.691Z"
					fill="#0B2471"
				/>
				<path
					fillRule="evenodd"
					d="M250.72 93.5007L264.648 123.983H277.046L314.839 41.0518H297.442L270.947 102.83H270.647L244.352 41.0518H226.755L243.247 77.1458L230.754 106.191H230.554L204.159 41.0518H186.662L224.555 123.983H236.853L250.72 93.5007Z"
					fill="#0B2471"
				/>
			</g>
		</svg>
	);
});

const Logo = React.forwardRef(function Logo(
	{ width, globalSettings, curvePath, curveTransform, ...rest }: LogoProps,
	ref: React.Ref<SVGSVGElement>
) {
	const strokeWidth = globalSettings[0];
	return (
		<svg
			ref={ref}
			viewBox="0 0 100 100"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
			width={width}
			stroke="#265CFF"
			strokeWidth={strokeWidth}
			{...rest}
		>
			<title>Watershed Logo</title>
			<defs>
				<circle
					id="outer-circle"
					cx="50"
					cy="50"
					r={(100 - strokeWidth) / 2}
				/>
			</defs>
			<clipPath id="clip-circle">
				<use href="#outer-circle" />
			</clipPath>
			<g clip-path="url(#clip-circle)">
				<path d={curvePath} transform={curveTransform} />
				<line
					x1="50"
					y1={strokeWidth / 2}
					x2="50"
					y2={100 - strokeWidth / 2}
				/>
				<ellipse
					cx="50"
					cy="50"
					rx={(100 - strokeWidth) / 4}
					ry={(100 - strokeWidth) / 2}
				/>
			</g>
			<use href="#outer-circle" />
		</svg>
	);
});

interface WrappedLogoProps {
	downloadRef: React.RefObject<SVGSVGElement>;
	width: number | null;
	isWordmark?: boolean;
	globalSettings: number[];
	curvePath?: string;
	curveTransform?: string;
}

const WrappedLogo = React.memo(
	React.forwardRef(function WrappedLogo(
		props: WrappedLogoProps,
		ref: React.Ref<ReactZoomPanPinchRef>
	) {
		if (props.width == null || !props.curvePath) {
			return null;
		}

		// Appease Typescript.
		const width = props.width || 0;
		const curvePath = props.curvePath || '';

		const LogoComponent = props.isWordmark ? Wordmark : Logo;
		return (
			<div className="flex flex-wrap justify-between">
				<div className="cursor-grab active:cursor-grabbing">
					<TransformWrapper
						ref={ref}
						minScale={0.5}
						maxScale={100}
						centerZoomedOut={false}
					>
						<TransformComponent>
							<LogoComponent
								ref={props.downloadRef}
								width={width}
								globalSettings={props.globalSettings}
								curvePath={curvePath}
								curveTransform={props.curveTransform}
							/>
						</TransformComponent>
					</TransformWrapper>
				</div>
				{!props.isWordmark && (
					<>
						<LogoComponent
							width={width / 2}
							globalSettings={props.globalSettings}
							curvePath={curvePath}
							curveTransform={props.curveTransform}
						/>
						<LogoComponent
							width={width / 4}
							globalSettings={props.globalSettings}
							curvePath={curvePath}
							curveTransform={props.curveTransform}
						/>
						<LogoComponent
							width={width / 8}
							globalSettings={props.globalSettings}
							curvePath={curvePath}
							curveTransform={props.curveTransform}
						/>
						<LogoComponent
							width={width / 16}
							globalSettings={props.globalSettings}
							curvePath={curvePath}
							curveTransform={props.curveTransform}
						/>
					</>
				)}
			</div>
		);
	})
);

export default WrappedLogo;
