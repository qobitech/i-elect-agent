import type React from 'react';
import { useEffect } from 'react';

import { useGlobalContext } from '../../../context/global';
import { TypeButton } from '../../utils/button';
import FormBuilder, { type IFormComponent } from '../../utils/form-builder';
import { useFormHook } from '../../utils/hooks';
import { useLocationDetails } from './hooks';
import { type ILocationDetailsProps, locationDetailsSchema } from './utils';

export const LocationDetails = ({ onPreview }: { onPreview: (data: ILocationDetailsProps) => void }) => {
	const { states, actions } = useGlobalContext();

	const [hookForm] = useFormHook<ILocationDetailsProps>(locationDetailsSchema);

	const ldProps = useLocationDetails(actions, hookForm);

	const { stateSearchProps, lgaSearchProps, wardSearchProps, puSearchProps, getState, getLGA, getWard, getPollingUnit } = ldProps;

	useEffect(() => {
		ldProps.getState('');
	}, []);

	useEffect(() => {
		if (hookForm.watch('stateId')) getLGA('');
	}, [hookForm.watch('stateId')]);

	useEffect(() => {
		if (hookForm.getValues('lgaName')) getWard('');
	}, [hookForm.watch('lgaName')]);

	useEffect(() => {
		if (hookForm.getValues('wardName')) getPollingUnit('');
	}, [hookForm.watch('wardName')]);

	const fc: IFormComponent[] = [
		{
			id: 'stateId',
			label: 'State of Residence',
			component: 'input-search',
			placeHolder: 'Click to select state',
			inputSearchProps: {
				results: stateSearchProps.results,
				setSearchTerm: (value, id) => {
					stateSearchProps.setSearchTerm('');
					stateSearchProps.setSelected(value);
					hookForm.setValue('stateId', parseInt(id + ''));
				},
				load: states?._countryState?.get_CountryStateLoading,
			},
			inputSearchOnChange: (e: React.ChangeEvent<HTMLInputElement>) => {
				stateSearchProps.setSearchTerm(e.target.value);
				stateSearchProps.setSelected(e.target.value);
			},
			inputSearchValue: stateSearchProps.searchTerm,
			refreshProps: {
				onRefresh: () => {
					getState('');
				},
				load: states?._countryState?.get_CountryStateLoading,
			},
			inputSearchClear: () => {
				stateSearchProps.setSearchTerm('');
				stateSearchProps.setSelected('');
				hookForm.setValue('stateId', 0);
				getState('');
			},
		},
		{
			id: 'lgaId',
			label: 'Local Government Area',
			component: 'input-search',
			placeHolder: 'Click to select local government',
			inputSearchProps: {
				results: lgaSearchProps.results,
				setSearchTerm: (value, id) => {
					lgaSearchProps.setSearchTerm('');
					lgaSearchProps.setSelected(value);
					hookForm.setValue('lgaId', parseInt(id + ''));
					hookForm.setValue('lgaName', value as string);
				},
				load: states?._lga?.getAll_LGALoading,
			},
			inputSearchOnChange: (e: React.ChangeEvent<HTMLInputElement>) => {
				lgaSearchProps.setSearchTerm(e.target.value);
				lgaSearchProps.setSelected(e.target.value);
			},
			inputSearchValue: lgaSearchProps.searchTerm,
			refreshProps: {
				onRefresh: () => {
					getLGA('');
				},
				load: states?._lga?.getAll_LGALoading,
			},
			inputSearchClear: () => {
				lgaSearchProps.setSearchTerm('');
				lgaSearchProps.setSelected('');
				hookForm.setValue('lgaId', 0);
				hookForm.setValue('lgaName', '');
				getLGA('');
			},
			hide: !hookForm.watch('stateId'),
		},
		{
			id: 'wardId',
			label: 'Ward',
			component: 'input-search',
			placeHolder: 'Click to select ward',
			inputSearchProps: {
				results: wardSearchProps.results,
				setSearchTerm: (value, id) => {
					wardSearchProps.setSearchTerm('');
					wardSearchProps.setSelected(value);
					hookForm.setValue('wardId', parseInt(id + ''));
					hookForm.setValue('wardName', value as string);
				},
				load: states?._ward?.get_WardLoading,
			},
			inputSearchOnChange: (e: React.ChangeEvent<HTMLInputElement>) => {
				wardSearchProps.setSearchTerm(e.target.value);
				wardSearchProps.setSelected(e.target.value);
			},
			inputSearchValue: wardSearchProps.searchTerm,
			refreshProps: {
				onRefresh: () => {
					getWard('');
				},
				load: states?._ward?.get_WardLoading,
			},
			inputSearchClear: () => {
				wardSearchProps.setSearchTerm('');
				wardSearchProps.setSelected('');
				hookForm.setValue('wardId', 0);
				hookForm.setValue('wardName', '');
				getWard('');
			},
			hide: !hookForm.watch('lgaId'),
		},
		{
			id: 'pollingUnitId',
			label: 'Polling Unit',
			component: 'input-search',
			placeHolder: 'Click to select polling unit',
			inputSearchProps: {
				results: puSearchProps.results,
				setSearchTerm: (value, id) => {
					puSearchProps.setSearchTerm('');
					puSearchProps.setSelected(value);
					hookForm.setValue('pollingUnitId', parseInt(id + ''));
				},
				load: states?._poolingUnit?.get_PoolingUnitLoading,
			},
			inputSearchOnChange: (e: React.ChangeEvent<HTMLInputElement>) => {
				puSearchProps.setSearchTerm(e.target.value);
				puSearchProps.setSelected(e.target.value);
			},
			inputSearchValue: puSearchProps.searchTerm,
			refreshProps: {
				onRefresh: () => {
					getPollingUnit('');
				},
				load: states?._poolingUnit?.get_PoolingUnitLoading,
			},
			inputSearchClear: () => {
				puSearchProps.setSearchTerm('');
				puSearchProps.setSelected('');
				hookForm.setValue('pollingUnitId', 0);
				getPollingUnit('');
			},
			hide: !hookForm.watch('wardId'),
		},
	];

	console.log(hookForm.getValues(), 'juju');

	return (
		<div className='f-column-33 mx-auto w-100 '>
			<div className='f-column-13'>
				<h5 className='m-0'>Location Details</h5>
				<p className='color-label m-0 font-14 color-label'>Make sure to select the correct locations below</p>
			</div>
			<FormBuilder
				hookForm={hookForm}
				formComponent={fc}
			/>
			<TypeButton
				title='Preview'
				buttonSize='small'
				onClick={hookForm.handleSubmit(onPreview)}
			/>
		</div>
	);
};
