import React, { PropsWithChildren, ReactElement, useEffect } from 'react'
import { NextPage } from 'next'
import s from './MainLayout.module.scss'
import { useAppSelector } from '../../../assets/hooks/useAppSelector'
import { loggedIn } from '../../../modules/authModules'
import { useRouter } from 'next/router'
import { Navbar } from '../../Navbar/Navbar'
import { SnackBar } from '../../SnackBar/SnackBar'
import { Header } from '../../Header/Header'
import { selectAppError } from '../../../modules/appModules'


export const MainLayout: NextPage<PropsWithChildren> = ({ children }) => {

	const isLoggedIn = useAppSelector(loggedIn)
	const error = useAppSelector(selectAppError)

	const router = useRouter()

	useEffect(() => {
		if (!isLoggedIn) {
			router.push('/auth/login')
		}
	}, [isLoggedIn, router])

	return (
		<div className={s.container}>
			<Header/>
				<div className={s.main}>
					<Navbar />
					<div className={s.contentBox}>{children}</div>
				</div>
			{error && <SnackBar />}
		</div>
	)
}

export const getLayoutM = (page: ReactElement) => <MainLayout>{page}</MainLayout>