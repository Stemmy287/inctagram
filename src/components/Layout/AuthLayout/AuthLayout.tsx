import React, { PropsWithChildren, ReactElement } from 'react'
import { NextPage } from 'next'
import { Preloader } from 'components/Preloader/Preloader'
import { useMeQuery } from 'modules/authModules/authApi/authApi'
import { useAppSelector } from 'assets/hooks/useAppSelector'
import { selectAppError, selectIsInitialized } from 'modules/appModules/appSelectors'
import { SnackBar } from 'components/SnackBar/SnackBar'
import s from './AuthLayout.module.scss'
import { Header } from '../../Header/Header'

export const AuthLayout: NextPage<PropsWithChildren> = ({ children }) => {
	const {} = useMeQuery()

	const error = useAppSelector(selectAppError)
	const isInitialized = useAppSelector(selectIsInitialized)

	return (
		<>
			<div className={s.container}>
				<Header />
				<div className={s.main}>{isInitialized ? children : <Preloader />}</div>
			</div>
			{error && <SnackBar />}
		</>
	)
}

export const getAuthLayout = (page: ReactElement) => <AuthLayout>{page}</AuthLayout>
