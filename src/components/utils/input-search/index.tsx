import './index.scss';

import React, { useEffect, useMemo, useRef, useState } from 'react';

import { minStyle } from '../../../constants/global';
import useDebounce, { Hvc } from '../hooks';
import { PulseSVG } from '../svgs';
import TextPrompt from '../text-prompt';

export interface IUseInputSearch {
	results: ISearchResult[];
	setSearchTerm: React.Dispatch<React.SetStateAction<string | number>>;
	setResults: React.Dispatch<React.SetStateAction<ISearchResult[]>>;
	setSelected: React.Dispatch<React.SetStateAction<string | number>>;
	searchTerm: string | number;
}

export const useInputSearch = (
	fetchResults: (searchValue: string | number, setResults?: (value: ISearchResult[]) => void) => void
): IUseInputSearch => {
	const [searchTerm, setSearchTerm] = useState<string | number>('');
	const [selected, setSelected] = useState<string | number>('');
	const [results, setResults] = useState<ISearchResult[]>([]);
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

export interface ISearchResult {
	label: string;
	value: string | number;
}

interface ISearchProps {
	results?: ISearchResult[];
	setSearchTerm: (value: string | number, id?: string | number) => void;
	load?: boolean;
}

interface IInputSearch extends React.ComponentPropsWithoutRef<'input'> {
	label?: string;
	error?: string | undefined;
	isonlyview?: boolean;
	searchProps?: ISearchProps;
	minComponent?: boolean;
	clear?: () => void;
}

// eslint-disable-next-line react/display-name
export const TypeInputSearch = React.forwardRef(
	({ label, error, isonlyview, searchProps, minComponent, clear, ...props }: IInputSearch, ref) => {
		const wrapperRef = useRef<HTMLDivElement>(null);

		const [isFocused, setIsFocused] = useState<boolean>(false);

		const handleClickOutside = (event: MouseEvent) => {
			if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
				setIsFocused(false);
			}
		};

		useEffect(() => {
			document.addEventListener('mousedown', handleClickOutside);
			return () => {
				document.removeEventListener('mousedown', handleClickOutside);
			};
		}, []);

		return (
			<div
				className={`type-input-search ${props.className || ''}`}
				ref={wrapperRef}
			>
				<div className={`form-container position-relative ${props.className || ''}`}>
					<div
						className='f-row justify-content-between align-items-center w-100'
						style={{ marginBottom: '14px' }}
					>
						{label && (
							<label
								htmlFor={props.id || props.name}
								className='m-0'
							>
								{label}
							</label>
						)}
						<Hvc
							removeDOM
							view={searchProps?.load || false}
						>
							<PulseSVG />
						</Hvc>
					</div>
					<div className='position-relative w-100'>
						<input
							{...props}
							ref={ref as React.LegacyRef<HTMLInputElement> | undefined}
							className={`${error ? 'is-error' : ''} ${isonlyview ? 'isonlyview' : ''}`}
							disabled={props.disabled || isonlyview}
							style={minStyle(minComponent)}
							onFocus={() => setIsFocused(true)}
						/>
						<Hvc
							removeDOM
							view={!!props.value}
							className='position-absolute cursor-pointer px-2 py-1 rounded bg-white'
							style={{ right: '4px', top: minComponent ? '2.7px' : '13px' }}
							onClick={clear}
						>
							<i className='fas fa-times color-danger text-little' />
						</Hvc>
					</div>
					<Hvc
						removeDOM
						view={isFocused}
					>
						<ul className='search-container rounded'>
							<Hvc
								removeDOM
								view={!searchProps?.results}
								className='py-1'
							>
								<p className='color-label text-tiny'>No results found</p>
							</Hvc>
							<Hvc
								removeDOM
								view={!!searchProps?.results}
							>
								{searchProps?.results?.map((result, index) => (
									<li
										key={index}
										className='text-tiny'
										onMouseDown={() => {
											searchProps?.setSearchTerm(result.label, result.value);
											setIsFocused(false);
										}}
									>
										{result.label}
									</li>
								))}
							</Hvc>
						</ul>
					</Hvc>
					{!!error && (
						<>
							<TextPrompt
								prompt={error}
								status={false}
							/>
						</>
					)}
				</div>
			</div>
		);
	}
);
