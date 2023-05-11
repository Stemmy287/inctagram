import React from 'react'
import s from './Header.module.scss'
import { LoadingLine } from '@/components/LoadingLine/LoadingLine'
import { selectAppStatus } from '@/modules/appModules'
import { useAppSelector } from '@/assets/hooks/useAppSelector'

export const Header = () => {
	const isLoading = useAppSelector(selectAppStatus)

	return (
		<header className={s.header}>
			<h1 className={s.title}>Inctagram</h1>
			{isLoading === 'loading' && (
				<div className={s.loading}>
					<LoadingLine />
				</div>
			)}
		</header>
	)
}
