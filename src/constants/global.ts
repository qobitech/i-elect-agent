import Cookies from 'js-cookie';
import jwtDecode from 'jwt-decode';
import jwtEncode from 'jwt-encode';

import type { IStates } from '../interface/IReducer';
import type { ILogin, IUserState } from '../interface/state/IAuthState';

export const USERDATACOOKIE = '_ud1234567891EL0';
export const DRAFTCOOKIE = '_udraft1234567891EL0';

export const onLogout = () => {
	Cookies.remove(USERDATACOOKIE);
	localStorage.clear();
};

export interface IToken {
	UserId: string;
	FullName: string;
	Email: string;
	role: string;
	nbf: number;
	exp: number;
	iat: number;
	iss: string;
	aud: string;
}

interface IResponseToken {
	token: any;
	refreshToken: any;
	sub: string;
	name: string;
	iat: number;
}

export const encodeData = (token: any, refreshToken: any) => {
	try {
		const jst = jwtEncode(
			{
				sub: '1516239022',
				name: 'ERMS',
				iat: Math.floor(Date.now() / 1000), // Use a valid timestamp
				token,
				refreshToken,
			} as IResponseToken,
			process.env.REACT_APP_COOKIESECRET
			// { expiresIn: '1h' } // Change 'expires' to 'expiresIn'
		);
		Cookies.set(USERDATACOOKIE, jst);
	} catch (error) {
		console.log(error);
	}
};

// function roughSizeOfObject(object: any): number {
//   const objectList = new Set<object>() // To track visited objects
//   const stack = [object] // Stack for traversing properties
//   let bytes = 0 // Accumulator for the total size in bytes

//   while (stack.length) {
//     const value = stack.pop()

//     if (typeof value === 'boolean') {
//       bytes += 4 // Booleans are approximately 4 bytes
//     } else if (typeof value === 'string') {
//       bytes += value.length * 2 // Strings are roughly 2 bytes per character
//     } else if (typeof value === 'number') {
//       bytes += 8 // Numbers are typically 8 bytes (64-bit floating point)
//     } else if (typeof value === 'object' && value !== null) {
//       if (objectList.has(value)) {
//         continue // Skip objects that have already been processed
//       }
//       objectList.add(value)

//       // Push each property of the object onto the stack
//       for (const key in value) {
//         if (Object.prototype.hasOwnProperty.call(value, key)) {
//           stack.push(value[key])
//         }
//       }
//     }
//   }
//   return bytes // Return the estimated size in bytes
// }

export const encodeDraft = (data: any, saveDraft: (data: string) => void) => {
	try {
		const jst = jwtEncode(
			{
				sub: '151623902266',
				name: 'DRAFT',
				iat: Math.floor(Date.now() / 1000), // Use a valid timestamp
				data,
			},
			'secret'
		);
		// console.log(jst, roughSizeOfObject(data), 'juju')
		saveDraft(jst);
	} catch (error) {
		console.log('error');
	}
};

const getUser = (): IResponseToken => {
	try {
		const data = Cookies.get(USERDATACOOKIE);
		if (!data) throw new Error('data not valid');
		const userData: IResponseToken = jwtDecode(data);
		if (!userData) throw new Error('user not logged in');
		return userData;
	} catch (e) {
		return {} as IResponseToken;
	}
};

export const getUserData = (): ILogin => {
	try {
		return {
			user: getUser().token ? jwtDecode(getUser().token) : ({} as IUserState),
			token: getUser().token,
			refreshToken: getUser().refreshToken,
		};
	} catch (e) {
		return {} as ILogin;
	}
};

export const PRIMARY_COLOR = '#286439';
export const PRIMARY_COLOR_LIGHT = 'rgb(218, 239, 224)';

export const ISSESSION = () =>
	// const timestamp = getUserData()?.user?.exp || 0;
	// if (!timestamp) return false;
	// const currentTimestamp = Math.floor(Date.now() / 1000);
	// return timestamp > currentTimestamp;
	false;

export const ISADMINLOGGED = () => !!getUserData().user?.UserId;

// export const COREAPI = 'https://core-ielect.ngrok.app';
// export const COMMANDAPI = 'https://command-ielect.ngrok.app';
// export const QUERYAPI = 'https://query-ielect.ngrok.app';
// export const EXTRACTAPI = 'https://erms-ocr.ngrok.app';
export const COREAPI = process.env.REACT_APP_BASE_CORE;
export const COMMANDAPI = process.env.REACT_APP_BASE_COMMAND;
export const QUERYAPI = process.env.REACT_APP_BASE_QUERY;
export const EXTRACTAPI = process.env.REACT_APP_BASE_EXTRACT;

export const PAGE_SIZE = 20;

export interface IStateData {
	states?: IStates;
}

export const resultTypeEnum = {
	EC8A: 'Statement of Result at the Polling Unit',
	EC8B: 'Summary of Results at the Ward Collation Level',
	EC8C: 'Summary of Results at the Local Government Area (LGA) Collation Level',
	EC8D: 'Summary of Results at the State Collation Level',
	EC8E: 'Summary of Results at the National Collation Level',
	EC4OH: 'List of Accredited Voters',
	EC4OG: 'Ballot Paper Accounting and Verification Statement',
	EC4OA: 'Polling Unit Accounting Form',
	EC4OB: 'Polling Unit Material Receipt Form',
	EC4OC: 'Polling Unit Staff Oath/Affirmation of Neutrality Form',
} as const;

export type ResultType = keyof typeof resultTypeEnum;

export const minStyle = (min?: boolean) => ({
	fontSize: min ? '12px' : '',
	height: min ? '40px' : '',
	border: min ? '1px solid #d1d1d1' : '',
});

export const ISDEVELOPMENT = true;
