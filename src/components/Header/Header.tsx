import React from 'react'
import s from './Header.module.scss'
import { useAppSelector } from 'assets/hooks/useAppSelector'
import { selectAppStatus, selectIsInitialized } from 'modules/appModules/appSelectors'
import { LoadingLine } from 'components/LoadingLine/LoadingLine'
import { LogoutButton } from 'components/Button/LogoutButton/LogoutButton'
import { loggedIn } from 'modules/authModules/authReducer/authSelectors'

export const Header = () => {
	const isLoading = useAppSelector(selectAppStatus)
	const isInitialized = useAppSelector(selectIsInitialized)
	const isLoggedIn = useAppSelector(loggedIn)

	return (
		<div className={s.header}>
			<h1 className={s.title}>Inctagram</h1>
			{isLoading === 'loading' && isInitialized && (
					<LoadingLine />
			)}
			{isLoggedIn && ( // вставить нужное условие (типа isSettings)
				<div className={s.outButton}>
					<LogoutButton />
				</div>
			)}
		</div>
	)
}
