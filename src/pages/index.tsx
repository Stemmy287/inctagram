import { getLayout } from '@/components/Layout/BaseLayout/BaseLayout'
import { NextPageWithLayout } from '@/pages/_app'
import { useAppSelector } from '@/assets/hooks/useAppSelector'
import { selectIsInitialized } from '@/modules/app/app.selectors'
import { useRouter } from 'next/router'
import { loggedIn } from '@/modules/authReducer/auth.selectors'

const Home: NextPageWithLayout = () => {

	const isInitialized = useAppSelector(selectIsInitialized)
	const isLoggedIn = useAppSelector(loggedIn)

	const router = useRouter()

	if (isLoggedIn ?? isInitialized) {
		router.push('/profile')
	}
	return (
		<>
			Home
		</>
	)
}

Home.getLayout = getLayout
export default Home

