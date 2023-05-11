import React, { PropsWithChildren, ReactElement } from 'react'
import { NextPage } from 'next'
import { Layout } from '@/components/Layout/Layout'
import { useMeQuery } from '@/modules/authModules'
import { useAppSelector } from '@/assets/hooks/useAppSelector'
import { selectIsInitialized } from '@/modules/appModules/appSelectors'
import { Preloader } from '@/components/Preloader/Preloader'

export const BaseLayout: NextPage<PropsWithChildren> = ({ children }) => {
	const {} = useMeQuery()

	const isInitialized = useAppSelector(selectIsInitialized)

	return (
		<Layout>
			{
				isInitialized
					? children
					: <Preloader/>
			}
		</Layout>
	)
}

export const getLayout = (page: ReactElement) => <BaseLayout>{page}</BaseLayout>


