import React, { PropsWithChildren, ReactElement } from 'react'
import { NextPage } from 'next'
import s from '@/components/Layout/MainLayout/MainLayout.module.scss'
import { Layout } from 'components/Layout/Layout'
import { Navbar } from 'components/Navbar/Navbar'

export const MainLayout: NextPage<PropsWithChildren> = ({ children }) => {
	return (
		<Layout>
			<div className={s.main}>
				<Navbar />
				<div className={s.contentBox}>{children}</div>
			</div>
		</Layout>
	)
}

export const getLayoutM = (page: ReactElement) => <MainLayout>{page}</MainLayout>