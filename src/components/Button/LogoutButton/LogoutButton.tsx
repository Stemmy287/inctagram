import { useState } from 'react'
import s from '@/components/Button/LogoutButton/LogoutButton.module.scss'
import Image from 'next/image'
import logoutIcon from '/public/icons/logout.svg'
import { LogoutModal } from 'modules/authModules/loginLogoutModule/components/logoutModal/logoutModal'

export const LogoutButton = () => {
	const [isActive, setIsActive] = useState(false)

	return (
		<>
			{!isActive ? (
				<button className={s.btn} onClick={() => setIsActive(true)}>
					<Image className={s.icon} src={logoutIcon} alt={'logout'} />
					<div className={s.title}>Log Out</div>
				</button>
			) : (
				<LogoutModal setIsActive={setIsActive} />
			)}
		</>
	)
}