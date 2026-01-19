import { useEffect, useMemo, useState } from 'react';

import useDebounce from '../hooks';
import type { IInputSearchResult, IUseInputSearch } from './utils';

export const useInputSearch = (
	fetchResults: (searchValue: string | number, setResults?: (value: IInputSearchResult[]) => void) => void
): IUseInputSearch => {
	const [searchTerm, setSearchTerm] = useState<string | number>('');
	const [selected, setSelected] = useState<string | number>('');
	const [results, setResults] = useState<IInputSearchResult[]>([]);
	const debouncedSearchTerm = useDebounce(searchTerm, 500);

	const getResults = useMemo(() => {
		if (!searchTerm) return results;
		return results.filter((i) => i.label.toLowerCase().includes(searchTerm.toString().toLowerCase()));
	}, [searchTerm, results, debouncedSearchTerm]);

	useEffect(() => {
		if (debouncedSearchTerm) {
			fetchResults(debouncedSearchTerm, setResults);
		}
	}, [debouncedSearchTerm]);

	return {
		results: getResults,
		setSearchTerm,
		setResults,
		searchTerm: searchTerm || selected,
		setSelected,
	};
};
