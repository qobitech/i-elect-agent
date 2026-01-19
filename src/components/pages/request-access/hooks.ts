import type { UseFormReturn } from 'react-hook-form';

import type { IActions } from '../../../interface/IAction';
import { useInputSearch } from '../../utils/input-search';
import type { ILocationDetailsProps, IUseLocationDetails } from './utils';

export const useLocationDetails = (
	actions: IActions | undefined,
	hookForm: UseFormReturn<ILocationDetailsProps, any>
): IUseLocationDetails => {
	const getState = (searchValue: string | number) => {
		actions?.get_CountryState({
			query: [
				{
					key: 'Name',
					value: searchValue,
				},
			],
			paged: true,
			onSuccess: ({ data }) => {
				stateSearchProps.setResults(
					data.map((i) => ({
						label: i.name,
						value: i.id,
					}))
				);
			},
		});
	};

	const getLGA = (searchValue: string | number) => {
		actions?.getAll_LGA({
			query: [
				{
					key: 'Name',
					value: searchValue,
				},
				// {
				//   key: 'LgaCode',
				//   value: searchValue
				// },
				{
					key: 'StateId',
					value: hookForm.watch('stateId'),
				},
			],
			paged: true,
			onSuccess: ({ data }) => {
				lgaSearchProps.setResults(
					data.map((i) => ({
						label: i.name,
						value: i.id,
					}))
				);
			},
		});
	};

	const getWard = (searchValue: string | number) => {
		actions?.get_Ward({
			query: [
				{
					key: 'Name',
					value: searchValue,
				},
				{
					key: 'LGAName',
					value: hookForm.getValues('lgaName'),
				},
			],
			paged: true,
			onSuccess: ({ data }) => {
				wardSearchProps.setResults(
					data.map((i) => ({
						label: i.name,
						value: i.id,
					}))
				);
			},
		});
	};

	const getPollingUnit = (searchValue: string | number) => {
		actions?.get_PoolingUnit({
			query: [
				{
					key: 'Name',
					value: searchValue,
				},
				{
					key: 'WardName',
					value: hookForm.getValues('wardName'),
				},
			],
			paged: true,
			onSuccess: ({ data }) => {
				puSearchProps.setResults(
					data.map((i) => ({
						label: i.name,
						value: i.id,
					}))
				);
			},
		});
	};

	const stateSearchProps = useInputSearch(getState);
	const lgaSearchProps = useInputSearch(getLGA);
	const wardSearchProps = useInputSearch(getWard);
	const puSearchProps = useInputSearch(getPollingUnit);

	return {
		stateSearchProps,
		lgaSearchProps,
		wardSearchProps,
		puSearchProps,
		hookForm,
		getState,
		getLGA,
		getWard,
		getPollingUnit,
	};
};
