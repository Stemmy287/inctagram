import { Popup } from 'components/Popup/Popup'
import { FC } from 'react'
import { TitlePopup } from 'components/TitlePopup/TitlePopup'
import { Button } from 'components/Button/Button'
import s from './logoutModal.module.scss'
import { useRouter } from 'next/router'
import { useLogoutMutation } from 'modules/authModules/authApi/authApi'
import { useFetchProfileQuery } from '../../../../profileModules/profileApi/profileApi'
import { en } from '../../../../../locales/en'
import { ru } from '../../../../../locales/ru'

type PropsType = {
	setIsActive: (isActive: boolean) => void
}

export const LogoutModal: FC<PropsType> = ({ setIsActive }) => {
	const [logout, { isSuccess }] = useLogoutMutation()
	const { data } = useFetchProfileQuery(null)
	const router = useRouter()

	const onClosePopupHandler = () => {
		setIsActive(false)
	}

	if (isSuccess) {
		router.push('/auth/login')
	}

	const t = router.locale === 'en' ? en : ru

	return (
		<Popup onClose={onClosePopupHandler}>
			<TitlePopup title={t.logout} onClose={onClosePopupHandler} />
			<div className={s.notification}>
				<span>{t.confirmLogout} {data?.userName}?</span>
				<div className={s.logout}>
					<div className={s.btn}>
						<Button title={t.logout} callback={() => logout()} />
					</div>
					<div className={s.btn}>
						<Button title={t.no} callback={onClosePopupHandler} />
					</div>
				</div>
			</div>
		</Popup>
	)
}
