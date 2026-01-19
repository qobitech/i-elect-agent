import type { UseFormReturn } from 'react-hook-form';
import * as yup from 'yup';

import type { IFormComponent } from '../../utils/form-builder';
import type { IUseInputSearch } from '../../utils/input-search';

export interface ILocationDetailsProps {
	stateId: number;
	lgaId: number;
	lgaName: string;
	wardId: number;
	wardName: string;
	pollingUnitId: number;
}

export const locationDetailsSchema = {
	stateId: yup.number().required('Phone number is required'),
	lgaId: yup.number().required('Phone number is required'),
	lgaName: yup.string(),
	wardId: yup.number().required('Phone number is required'),
	wardName: yup.string(),
	pollingUnitId: yup.number().required('Phone number is required'),
};

export interface IPersonalDetailsProps {
	firstName: string;
	lastName: string;
	email: string;
	phoneNumber: string;
	nin: string;
}

export const personalDetailsSchema = {
	firstName: yup.string().required('First name is required'),
	lastName: yup.string().required('Last name is required'),
	email: yup.string().required('Email is required'),
	phoneNumber: yup.string().required('Phone number is required'),
	nin: yup.string().required('Phone number is required'),
};

export const personalDetailsFC: IFormComponent[] = [
	{
		id: 'firstName',
		label: 'First Name',
		placeHolder: 'Enter your first name',
		component: 'input',
	},
	{
		id: 'lastName',
		label: 'Last Name',
		placeHolder: 'Enter your last name',
		component: 'input',
	},
	{
		id: 'email',
		label: 'Email address',
		placeHolder: 'Enter your email address',
		component: 'input',
	},
	{
		id: 'phoneNumber',
		label: 'Phone Number',
		placeHolder: 'Enter your phone number',
		component: 'input',
		type: 'number',
	},
	{
		id: 'nin',
		label: 'National Identification Number',
		placeHolder: 'Enter your National Identification Number',
		component: 'input',
	},
];

export type stageType = 'Personal' | 'Location' | 'Preview';

export interface IUseLocationDetails {
	stateSearchProps: IUseInputSearch;
	lgaSearchProps: IUseInputSearch;
	wardSearchProps: IUseInputSearch;
	puSearchProps: IUseInputSearch;
	hookForm: UseFormReturn<ILocationDetailsProps, any>;
	getState: (searchValue: string | number) => void;
	getLGA: (searchValue: string | number) => void;
	getWard: (searchValue: string | number) => void;
	getPollingUnit: (searchValue: string | number) => void;
}
