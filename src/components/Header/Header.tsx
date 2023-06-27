import React from 'react'
import s from './Header.module.scss'
import russia from '../../../public/icons/FlagRussia.svg'
import unitedKingdom from '../../../public/icons/FlagUnitedKingdom.svg'
import { useAppSelector } from 'assets/hooks/useAppSelector'
import { selectAppStatus, selectIsInitialized } from 'modules/appModules/appSelectors'
import { LoadingLine } from 'components/LoadingLine/LoadingLine'
import { SelectLanguage } from '../SelectLanguage/SelectLanguage'

export const Header = () => {
	const isLoading = useAppSelector(selectAppStatus)
	const isInitialized = useAppSelector(selectIsInitialized)

	const options = [
		{ value: 'Russian',img: russia },
		{ value: 'English',img: unitedKingdom },
	];

	return (
		<div className={s.header}>
			<h1 className={s.title}>Inctagram</h1>
			<SelectLanguage firstItem={options[0]} options={options} onChange={() => {}}/>
			{isLoading === 'loading' && isInitialized && (
					<LoadingLine />
			)}
		</div>
	)
}
