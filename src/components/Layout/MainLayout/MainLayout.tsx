import s from 'components/Layout/MainLayout/MainLayout.module.scss'
import { Navbar } from 'components/Navbar/Navbar'
import { NextPage } from 'next'
import { PropsWithChildren, ReactElement } from 'react'
import { Layout } from '../Layout'

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
