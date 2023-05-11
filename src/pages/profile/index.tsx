import { getLayout } from '@/components/Layout/BaseLayout/BaseLayout'
import { LogoutModal } from '@/modules/authModules/loginLogoutModule/components/logoutModal/logoutModal'
import { useState } from 'react'
import { useRouter } from 'next/router'
import { useAppSelector } from '@/assets/hooks/useAppSelector'
import { loggedIn } from '@/modules/authReducer/auth.selectors'

const Profile = () => {

	const isLoggedIn = useAppSelector(loggedIn)

	const router = useRouter()

	if (!isLoggedIn) {
		router.push('/login')
	}

	const [isActive, setIsActive] = useState(true)

	return (
		<div>
			Profile
			{
				isActive && <LogoutModal setIsActive={setIsActive} name={'paha'} email={'paasd@ma.ru'} />
			}
		</div>

	)
}

Profile.getLayout = getLayout
export default Profile