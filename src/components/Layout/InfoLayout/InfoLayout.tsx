import React, { PropsWithChildren, ReactElement } from 'react'
import { NextPage } from 'next'
import s from '../InfoLayout/InfoLayout.module.scss'
import { useAppSelector } from 'assets/hooks/useAppSelector'
import { useMeQuery } from 'modules/authModules/authApi/authApi'
import { selectIsInitialized } from 'modules/appModules/appSelectors'
import { Preloader } from 'components/Preloader/Preloader'

export const InfoLayout: NextPage<PropsWithChildren> = ({ children }) => {
	const {} = useMeQuery()

	const isInitialized = useAppSelector(selectIsInitialized)

	return (
		<>{ isInitialized ? <div className={s.content}>{children}</div> : <Preloader /> }</>
	)
}

export const getLayoutI = (page: ReactElement) => <InfoLayout>{page}</InfoLayout>


