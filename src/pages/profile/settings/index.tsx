import { useEffect } from 'react'
import { useRouter } from 'next/router'
import { useAppSelector } from '@/assets/hooks/useAppSelector'
import { loggedIn } from '@/modules/authModules/authReducer/authSelectors'
import { getLayoutM } from '@/components/Layout/MainLayout/MainLayout'
import { ProfileSettings } from '@/modules/profileModules/createProfile/ProfileSettings/ProfileSettings'

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
