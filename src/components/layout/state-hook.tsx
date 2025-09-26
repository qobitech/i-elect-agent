import { useCallback, useReducer } from 'react';
// import { encodeDraft } from '../../constants/global'

export const reducer = <T extends Record<string, any>>(
	initState: T,
	state: T,
	action: { type: keyof T | 'CLEAR_ALL'; payload?: any }
) => {
	switch (action.type) {
		case 'CLEAR_ALL':
			return { ...initState }; // Reset to the initial state

		default:
			if (action.type in state) {
				if (state[action.type] === action.payload) return state; // No change if payload is the same
				return { ...state, [action.type]: action.payload }; // Update state
			}
			return state; // Return unchanged state if action type is invalid
	}
};

export interface IUSH<T> {
	state: T;
	updateState: <A extends keyof T>(type: A, payload: T[A]) => void; // Ensure payload matches the type of the state property
	clearState: <A extends keyof T>(type: A) => void;
	clearAll: () => void;
}

export const useStateHook = <T extends Record<string, any>>(initState: T): IUSH<T> => {
	const [state, dispatch] = useReducer(
		(state: T, action: { type: keyof T | 'CLEAR_ALL'; payload?: any }) => reducer(initState, state, action),
		initState
	);

	const updateState = useCallback(<A extends keyof T>(type: A, payload: T[A]) => {
		dispatch({ type, payload });
		// encodeDraft(state)
	}, []);

	const clearState = useCallback(<A extends keyof T>(type: A) => {
		dispatch({ type, payload: initState[type] });
	}, []);

	const clearAll = useCallback(() => {
		dispatch({ type: 'CLEAR_ALL' }); // Dispatch a specific action for clearing all
	}, []);

	return { state, updateState, clearState, clearAll };
};
