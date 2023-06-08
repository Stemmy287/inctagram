import React, { PropsWithChildren, ReactElement, useEffect } from 'react'
import { NextPage } from 'next'
import { Preloader } from 'components/Preloader/Preloader'
import { useMeQuery } from 'modules/authModules/authApi/authApi'
import { useAppSelector } from 'assets/hooks/useAppSelector'
import { selectAppError, selectIsInitialized } from 'modules/appModules/appSelectors'
import { Layout } from 'components/Layout/Layout'
import { SnackBar } from 'components/SnackBar/SnackBar'

export const BaseLayout: NextPage<PropsWithChildren> = ({ children }) => {
	const {} = useMeQuery()

	const error = useAppSelector(selectAppError)
	const isInitialized = useAppSelector(selectIsInitialized)

	return (
		<>
			<Layout>{isInitialized ? children : <Preloader />}</Layout>
			{error && <SnackBar />}
		</>
	)
}

export const getLayout = (page: ReactElement) => <BaseLayout>{page}</BaseLayout>
