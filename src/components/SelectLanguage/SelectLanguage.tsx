import React, { MouseEvent, useRef, useState } from 'react';
import s from './SelectLanguage.module.scss';
import arrowDown from '../../../public/icons/arrow-ios-Down-outline.svg';
import russian from '../../../public/icons/FlagRussia.svg';
import english from '../../../public/icons/FlagUnitedKingdom.svg';
import { OptionsSelectorType } from './types';
import { useOutsideClick } from '../../assets/hooks/useOutsideClick'
import Image from 'next/image'

type PropsType = {
	firstItem: OptionsSelectorType;
	options: OptionsSelectorType[];
	onChange: (data: OptionsSelectorType) => void;
	disabled?: boolean
};
export const SelectLanguage = ({ firstItem, options, onChange, disabled }: PropsType) => {
	const [isActive, setIsActive] = useState(false);
	const [selected, setSelected] = useState(firstItem);

	const selectRef = useRef<HTMLDivElement>(null);

	useOutsideClick(selectRef, () => setIsActive(false), isActive);

	const onActiveHandler = () => {
		setIsActive(!isActive);
	};
	const onSelectHandler = (e: MouseEvent<HTMLDivElement, globalThis.MouseEvent>) => {
		if (e.currentTarget.textContent) {
			onChange({value: e.currentTarget.textContent});
			setSelected({value: e.currentTarget.textContent});
		}
		setIsActive(false);
	};

	const mappedOptions = options
		.filter(el => el.value !== selected.value)
		.map(option => (
			<div
				key={option.value}
				className={s.option}
				onClick={onSelectHandler}
			>
				<Image className={s.flag} src={option.img || ''} alt='flag' width={24} height={24}/>
				{option.value}
			</div>
		));

	return (
		<div className={s.container} ref={selectRef}>
			<div
				className={isActive ? `${s.select} ${s.active}` : s.select}
				onClick={onActiveHandler}
				data-disabled={disabled}
			>
				<Image src={selected.value === 'Russian' ? russian : english } alt='flag' width={24} height={24}/>
				{selected.value}
				{isActive
					? <Image src={arrowDown} alt='arrow' style={{transform: 'rotate(180deg)'}}/>
					: <Image src={arrowDown} alt='arrow'/>}
			</div>
			{isActive && (
				<div className={isActive ? `${s.optionsList} ${s.activeOptions}` : s.optionsList}>{mappedOptions}</div>
			)}
		</div>
	);
};

