import { getLayout } from '@/components/Layout/BaseLayout/BaseLayout'
import { NextPageWithLayout } from '@/pages/_app'
import { useAppSelector } from '@/assets/hooks/useAppSelector'
import { useRouter } from 'next/router'
import { loggedIn } from '@/modules/authModules/authReducer/authSelectors'
import { useEffect } from 'react'

const Home: NextPageWithLayout = () => {

	const isLoggedIn = useAppSelector(loggedIn)
	const router = useRouter()

	useEffect(() => {
		if (isLoggedIn) {
			router.push('/profile')
		} else {
			router.push('/auth/login')
		}
	}, [isLoggedIn, router])

	return (
		<>
			Home
		</>
	)
}

Home.getLayout = getLayout
export default Home

