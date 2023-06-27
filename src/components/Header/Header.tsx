import React from 'react'
import s from './Header.module.scss'
import russia from '../../../public/icons/FlagRussia.svg'
import unitedKingdom from '../../../public/icons/FlagUnitedKingdom.svg'
import { useAppSelector } from 'assets/hooks/useAppSelector'
import { selectAppStatus, selectIsInitialized } from 'modules/appModules/appSelectors'
import { LoadingLine } from 'components/LoadingLine/LoadingLine'
import { SelectLanguage } from '../SelectLanguage/SelectLanguage'
import { OptionsSelectorType } from '../SelectLanguage/types'
import { useRouter } from 'next/router'

export const Header = () => {
	const isLoading = useAppSelector(selectAppStatus)
	const isInitialized = useAppSelector(selectIsInitialized)

	const options = [
		{ value: 'English',img: unitedKingdom },
		{ value: 'Russian',img: russia }
	];

	const {push} = useRouter()

	const onSelectLanguage = (select: OptionsSelectorType) => {
		const locale = select.value === 'English' ? 'en' : 'ru'
		push('/', '/', { locale })
	}

	return (
		<div className={s.header}>
			<h1 className={s.title}>Inctagram</h1>
			<SelectLanguage firstItem={options[0]} options={options} onChange={onSelectLanguage}/>
			{isLoading === 'loading' && isInitialized && (
					<LoadingLine />
			)}
		</div>
	)
}
