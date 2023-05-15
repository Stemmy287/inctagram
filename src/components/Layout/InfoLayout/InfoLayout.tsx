import React, { PropsWithChildren, ReactElement } from 'react'
import { NextPage } from 'next'
import s from '@/components/Layout/InfoLayout/InfoLayout.module.scss'
import { Layout } from '@/components/Layout/Layout'
import { useMeQuery } from '@/modules/authModules'
import { useAppSelector } from '@/assets/hooks/useAppSelector'
import { selectIsInitialized } from '@/modules/appModules/appSelectors'
import { Preloader } from '@/components/Preloader/Preloader'

export const InfoLayout: NextPage<PropsWithChildren> = ({ children }) => {
    const {} = useMeQuery()

    const isInitialized = useAppSelector(selectIsInitialized)

    return (
        <Layout>
            {
                isInitialized
                    ? <div className={s.content}>{children}</div>
                    : <Preloader/>
            }
        </Layout>
    )
}

export const getLayoutI = (page: ReactElement) => <InfoLayout>{page}</InfoLayout>


