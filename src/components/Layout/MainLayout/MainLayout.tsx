import React, { PropsWithChildren, ReactElement, useEffect } from 'react'
import { NextPage } from 'next'
import s from '@/components/Layout/MainLayout/MainLayout.module.scss'
import { Layout } from '@/components/Layout/Layout'
import { Navbar } from '@/components/Navbar/Navbar'
import { useAppSelector } from '@/assets/hooks/useAppSelector'
import { loggedIn } from '@/modules/authModules'
import { useRouter } from 'next/router'
import { SnackBar } from '@/components/SnackBar/SnackBar'

export const MainLayout: NextPage<PropsWithChildren> = ({ children }) => {
	const isLoggedIn = useAppSelector(loggedIn)
	const error = useAppSelector(state => state.app.error)

	const router = useRouter()

	useEffect(() => {
		if (!isLoggedIn) {
			router.push('/auth/login')
		}
	}, [isLoggedIn, router])

	return (
		<>
			<Layout>
				<div className={s.main}>
					<Navbar />
					<div className={s.contentBox}>{children}</div>
				</div>
			</Layout>
			{error && <SnackBar />}
		</>
	)
}

export const getLayoutM = (page: ReactElement) => <MainLayout>{page}</MainLayout>
