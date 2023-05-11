import { getLayout } from '@/components/Layout/BaseLayout/BaseLayout'
import { NextPageWithLayout } from '@/pages/_app'
import { useAppSelector } from '@/assets/hooks/useAppSelector'
import { useRouter } from 'next/router'
import { loggedIn } from '@/modules/authModules/authReducer/authSelectors'

const Home: NextPageWithLayout = () => {

	const isLoggedIn = useAppSelector(loggedIn)

	const router = useRouter()

	if (isLoggedIn) {
		router.push('/profile')
	} else {
		router.push('/auth/login')
	}
	return (
		<>
			Home
		</>
	)
}

Home.getLayout = getLayout
export default Home

