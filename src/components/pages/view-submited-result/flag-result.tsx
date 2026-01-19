import { useEffect, useMemo } from 'react';

import { useGlobalContext } from '../../../context/global';
import type { IIRevResultState } from '../../../interface/state/IRev';
import { CardItems } from '../../utils/hooks';

const Flags = ({ result }: { result: IIRevResultState }) => {
	const { states, actions } = useGlobalContext();

	const onRefresh = () => {
		// actions?.get_ResultFlag({});
	};

	useEffect(() => {
		onRefresh();
	}, []);

	// const mappedFlags = useMemo(() => {
	// 	const mapResultFlags = (i: string) => {
	// 		const flagObj = states?._result?.get_ResultFlag?.data?.find((j) => `${j.id}` === i);
	// 		if (!flagObj)
	// 			return {
	// 				label: i,
	// 				description: '',
	// 			};
	// 		return {
	// 			label: flagObj.name,
	// 			description: flagObj.description || '',
	// 		};
	// 	};
	// 	return result?.flags?.map?.(mapResultFlags) || [];
	// }, [states?._result?.get_ResultFlag, result?.flags]);

	return (
		<div className='f-column-33'>
			<h3 className='m-0'>Flags</h3>
			<div className='grid-wrapper-30 gap-33'>
				{/* {mappedFlags?.map((i, index) => (
					<div
						key={index}
						className='f-row-17 align-items-center'
					>
						<CardItems
							title={`Flag #${index + 1}`}
							value={i.label}
							description={i.description}
						/>
					</div>
				))} */}
			</div>
		</div>
	);
};

export default Flags;
