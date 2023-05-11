import { getLayout } from '@/components/Layout/BaseLayout/BaseLayout'
import { LogoutModal } from '@/modules/authModules/loginLogoutModule/components/logoutModal/logoutModal'
import { useState } from 'react'
import { useRouter } from 'next/router'
import { useAppSelector } from '@/assets/hooks/useAppSelector'
import { loggedIn } from '@/modules/authModules/authReducer/authSelectors'

const Profile = () => {

	const isLoggedIn = useAppSelector(loggedIn)

	const router = useRouter()

	if (!isLoggedIn) {
		router.push('auth/login')
	}

	const [isActive, setIsActive] = useState(true)

	return (
		<div>
			Profile
			{isActive && <LogoutModal setIsActive={setIsActive}/>}
		</div>
	)
}

Profile.getLayout = getLayout
export default Profile