'use client';

import { Radio, RadioGroup } from '@headlessui/react';
import { CheckCircleIcon } from '@heroicons/react/20/solid';

import { curveTypes } from './constants';

function CurveTypeSelector({
	curveId,
	setCurveId,
}: {
	curveId: number;
	setCurveId: (id: number) => void;
}) {
	return (
		<fieldset>
			<RadioGroup
				value={curveTypes[curveId]}
				onChange={(curveType) => setCurveId(curveType.id)}
				className="grid grid-cols-2 gap-2 md:gap-4 md:grid-cols-5"
			>
				{curveTypes.map((curveType) => (
					<Radio
						key={curveType.id}
						value={curveType}
						aria-label={curveType.title}
						aria-description={curveType.description}
						className="group relative flex cursor-pointer rounded-lg border border-gray-300 bg-white p-4 shadow-sm focus:outline-none data-[focus]:border-cobalt-600 data-[focus]:ring-2 data-[focus]:ring-cobalt-600"
					>
						<span className="flex flex-1">
							<span className="flex flex-col">
								<span className="block text-sm font-medium text-gray-900 text-pretty">
									{curveType.title}
								</span>
								<span className="mt-1 flex items-center text-sm text-gray-500 text-pretty">
									{curveType.description}
								</span>
							</span>
						</span>
						<CheckCircleIcon
							aria-hidden="true"
							className="h-5 w-5 text-cobalt-600 [.group:not([data-checked])_&]:invisible"
						/>
						<span
							aria-hidden="true"
							className="pointer-events-none absolute -inset-px rounded-lg border-2 border-transparent group-data-[focus]:border group-data-[checked]:border-cobalt-600"
						/>
					</Radio>
				))}
			</RadioGroup>
		</fieldset>
	);
}

export default CurveTypeSelector;
