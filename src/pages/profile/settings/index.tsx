import { useAppSelector } from 'assets/hooks/useAppSelector'
import { getLayoutM } from 'components/Layout/MainLayout/MainLayout'
import { loggedIn } from 'modules/authModules'
import { ProfileSettings } from 'modules/profileModules/components/ProfileSettings/ProfileSettings'
import { useRouter } from 'next/router'
import { useEffect } from 'react'

const Profile = () => {
	const isLoggedIn = useAppSelector(loggedIn)

	const router = useRouter()

	useEffect(() => {
		if (!isLoggedIn) {
			router.push('/auth/login')
		}
	}, [isLoggedIn, router])

	return (
		<div>
			<ProfileSettings />
		</div>
	)
}

Profile.getLayout = getLayoutM
export default Profile
