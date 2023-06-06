import React, { PropsWithChildren, ReactElement, useEffect } from 'react'
import { NextPage } from 'next'
import { Layout } from '@/components/Layout/Layout'
import { useMeQuery, useUpdateTokensMutation } from '@/modules/authModules'
import { useAppSelector } from '@/assets/hooks/useAppSelector'
import { selectAppError, selectIsInitialized } from '@/modules/appModules/appSelectors'
import { Preloader } from '@/components/Preloader/Preloader'
import { SnackBar } from '@/components/SnackBar/SnackBar'

export const BaseLayout: NextPage<PropsWithChildren> = ({ children }) => {
	const [updateTokens] = useUpdateTokensMutation()
	const {} = useMeQuery()

	const error = useAppSelector(selectAppError)
	const isInitialized = useAppSelector(selectIsInitialized)

	useEffect(() => {
		// Refresh token every 55 minutes
		setInterval(() => {
			updateTokens()
		}, 55 * 60 * 1000)
	}, [updateTokens])

	return (
		<>
			<Layout>{isInitialized ? children : <Preloader />}</Layout>
			{error && <SnackBar />}
		</>
	)
}

export const getLayout = (page: ReactElement) => <BaseLayout>{page}</BaseLayout>
