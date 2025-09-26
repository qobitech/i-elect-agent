import type { IRefreshProps } from '../hooks';

export interface IUseInputSearch {
	results: IInputSearchResult[];
	setSearchTerm: React.Dispatch<React.SetStateAction<string | number>>;
	setResults: React.Dispatch<React.SetStateAction<IInputSearchResult[]>>;
	setSelected: React.Dispatch<React.SetStateAction<string | number>>;
	searchTerm: string | number;
}

export interface IInputSearchResult {
	label: string;
	value: string | number;
}

export interface IInputSearchProps {
	results?: IInputSearchResult[];
	setSearchTerm: (value: string | number, id?: string | number) => void;
	load?: boolean;
}

export interface IInputSearch extends React.ComponentPropsWithoutRef<'input'> {
	label?: string;
	error?: string | undefined;
	isonlyview?: boolean;
	searchProps?: IInputSearchProps;
	minComponent?: boolean;
	refreshProps?: IRefreshProps;
	clear?: () => void;
	multiSelect?: boolean;
	selectedItems?: IInputSearchResult[];
	setSelectedItems?: (selectedItems: IInputSearchResult[]) => void;
}

export interface ISelecteditems {
	items: IInputSearchResult[];
	onRemove: (id: string | number) => void;
	label?: string;
}
