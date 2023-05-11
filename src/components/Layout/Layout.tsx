import React, { PropsWithChildren } from 'react'
import { NextPage } from 'next'
import { Header } from '@/components/Header/Header'
import s from './Layout.module.scss'

export const Layout: NextPage<PropsWithChildren> = ({ children }) => {


	return (
		<div className={s.container}>
			<Header />
			<div className={s.main}>{children}</div>
		</div>
	)
}

