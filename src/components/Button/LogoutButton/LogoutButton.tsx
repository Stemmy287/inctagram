import { useState } from 'react'
import s from 'components/Button/LogoutButton/LogoutButton.module.scss'
import Image from 'next/image'
import logoutIcon from '/public/icons/logout.svg'
import { LogoutModal } from 'modules/authModules/loginLogoutModule/components/logoutModal/logoutModal'
import { useRouter } from 'next/router'
import { en } from '../../../locales/en'
import { ru } from '../../../locales/ru'

export const LogoutButton = () => {
	const [isActive, setIsActive] = useState(false)

	const router = useRouter()

	const t = router.locale === 'en' ? en : ru

	return (
		<>
			{!isActive ? (
				<button className={s.btn} onClick={() => setIsActive(true)}>
					<Image className={s.icon} src={logoutIcon} alt={'logout'} />
					<div className={s.title}>{t.logout}</div>
				</button>
			) : (
				<LogoutModal setIsActive={setIsActive} />
			)}
		</>
	)
}
