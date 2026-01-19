import {
	forwardRef,
	useCallback,
	useEffect,
	// useMemo,
	useRef,
	useState,
} from 'react';
import styled from 'styled-components';

import { minStyle } from '../../../constants/global';
import { Hvc, RefreshComponent } from '../hooks';
import TextPrompt from '../text-prompt';
import { SelectedItems } from './selected-items';
import type { IInputSearch } from './utils';

// eslint-disable-next-line react/display-name
export const TypeInputSearch = forwardRef(
	(
		{
			label = '',
			error = '',
			isonlyview = false,
			searchProps,
			minComponent = false,
			clear,
			refreshProps,
			multiSelect = false,
			selectedItems = [],
			setSelectedItems,
			...props
		}: IInputSearch,
		ref
	) => {
		const wrapperRef = useRef<HTMLDivElement>(null);

		const [showOptions, setShowOptions] = useState<boolean>(false);

		const handleClickOutside = (event: MouseEvent) => {
			if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
				setShowOptions(false);
			}
		};

		useEffect(() => {
			document.addEventListener('mousedown', handleClickOutside);
			return () => {
				document.removeEventListener('mousedown', handleClickOutside);
			};
		}, []);

		const onAddItem = (value: string | number) => {
			if (!value) return;
			const selectedItem = searchProps?.results?.filter((i) => i.value === value)?.[0];
			if (!selectedItem) return;
			setSelectedItems?.([...(selectedItems || []), selectedItem]);
		};

		const onRemoveItems = useCallback(
			(value: string | number) => {
				if (!value) return;
				setSelectedItems?.([...(selectedItems || []).filter((i) => i.value !== value)]);
			},
			[selectedItems]
		);

		// const filteredResults = useMemo(() => {
		//   if (!selectedItems?.length) return searchProps?.results
		//   const filtered = searchProps?.results?.filter(
		//     (i) => !selectedItems.map((j) => j.value).includes(i.value)
		//   )
		//   return filtered ?? []
		// }, [selectedItems])

		return (
			<TypeInputClass
				className={props.className || ''}
				ref={wrapperRef}
			>
				<div className={`form-container f-column-14 position-relative ${props.className || ''}`}>
					<Hvc
						removeDOM
						view={!!label}
						className='f-row-20 align-items-center'
					>
						<label
							className='m-0'
							htmlFor={props.id || props.name}
						>
							{label}
						</label>
						<Hvc
							removeDOM
							view={!!refreshProps}
						>
							<RefreshComponent
								load={refreshProps?.load}
								onRefresh={refreshProps?.onRefresh}
							/>
						</Hvc>
					</Hvc>
					<div className='position-relative w-100'>
						<input
							{...props}
							ref={ref as React.LegacyRef<HTMLInputElement> | undefined}
							className={`${error ? 'is-error' : ''} ${isonlyview ? 'isonlyview' : ''}`}
							disabled={props.disabled || isonlyview}
							style={minStyle(minComponent)}
							onFocus={() => setShowOptions(true)}
						/>
						<Hvc view={!!multiSelect && !!selectedItems?.length}>
							<SelectedItems
								items={selectedItems ?? []}
								onRemove={onRemoveItems}
							/>
						</Hvc>
						<Hvc
							removeDOM
							view={!!props.value}
							className='position-absolute cursor-pointer px-2 py-1 rounded bg-white'
							style={{ right: '4px', top: minComponent ? '2.7px' : '9px' }}
							onClick={clear}
						>
							<i className='fas fa-times color-danger text-little' />
						</Hvc>
					</div>
					<Hvc
						removeDOM
						view={showOptions}
					>
						<ul className='search-container rounded'>
							<Hvc
								removeDOM
								view={!selectedItems}
								className='py-1'
							>
								<p className='color-label text-tiny'>No results found</p>
							</Hvc>
							<Hvc
								removeDOM
								view={!!selectedItems}
							>
								{selectedItems?.map((result, index) => (
									<li
										key={index}
										className='text-tiny'
										onMouseDown={() => {
											if (multiSelect) {
												onAddItem(result.value);
											} else {
												searchProps?.setSearchTerm(result.label, result.value);
												setShowOptions(false);
											}
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
			</TypeInputClass>
		);
	}
);

const TypeInputClass = styled.div`
	position: relative;
	input {
		width: 100%;
		height: 3.125rem;
		background: none;
		border: 1px solid #a1a1a1;
		border-radius: 0.1875rem;
		padding: 0 1.24rem;
		box-shadow: none;
		box-sizing: border-box;
		outline: none;
		font-size: 0.8425rem;
		&::placeholder {
			color: #a1a1a1;
			font-size: 0.8125rem;
			font-style: normal;
			font-weight: 300;
			line-height: normal;
		}
		&:focus {
			&.is-error {
				border: 1px solid #f56e9d;
			}
		}
		&.is-error {
			border: 1px solid #f56e9d;
			margin-bottom: 0.81rem;
		}
		&.isonlyview {
			padding-left: 0;
			border: none;
		}
	}
	.search-container {
		position: absolute;
		top: 104%;
		left: 0;
		right: 0;
		border: 1px solid #ccc;
		background-color: #fff;
		list-style: none;
		margin: 0;
		padding: 8px 0;
		max-height: 200px;
		overflow-y: auto;
		z-index: 1000;
		li {
			padding: 8px 16px;
			cursor: pointer;
			&:hover {
				background: #f1f1f1;
				transition: 0.2s ease;
			}
		}
	}
`;
