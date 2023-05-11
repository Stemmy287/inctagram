import React, { PropsWithChildren, ReactElement } from 'react'
import { NextPage } from 'next'
import { Layout } from '@/components/Layout/Layout'
import { useMeQuery } from '@/modules/authModules'
import { useAppSelector } from '@/assets/hooks/useAppSelector'
import { selectIsInitialized } from '@/modules/app/app.selectors'

export const BaseLayout: NextPage<PropsWithChildren> = ({ children }) => {
	const {} = useMeQuery()

	const isInitialized = useAppSelector(selectIsInitialized)

	return (
		<Layout>
			{
				isInitialized
					? children
					: <h2>Initialized...</h2>
			}
		</Layout>
	)
}

export const getLayout = (page: ReactElement) => <BaseLayout>{page}</BaseLayout>


