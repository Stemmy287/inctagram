import { useEffect } from 'react'
import { useRouter } from 'next/router'
import { useAppSelector } from '@/assets/hooks/useAppSelector'
import { loggedIn } from '@/modules/authModules/authReducer/authSelectors'
import { useGetUserQuery } from '@/modules/profileModules/createProfile/createProfileApi'
import { ProfileSettings } from '@/modules/profileModules/createProfile/ProfileSettings/ProfileSettings'
import { getLayoutI } from '@/components/Layout/InfoLayout/InfoLayout'

const Profile = () => {

	const {} = useGetUserQuery()

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

Profile.getLayout = getLayoutI
export default Profile