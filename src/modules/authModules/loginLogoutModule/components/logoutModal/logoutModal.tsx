import { Popup } from '@/components/Popup/Popup'
import { FC } from 'react'
import { TitlePopup } from '@/components/TitlePopup/TitlePopup'
import { Button } from '@/components/Button/Button'
import s from './logoutModal.module.scss'
import { useLogoutMutation } from '@/modules/authModules'
import { useRouter } from 'next/router'

type PropsType = {
	email: string,
	name: string
	setIsActive: (isActive: boolean) => void
}

export const LogoutModal: FC<PropsType> = ({setIsActive, name, email }) => {

	const [logout, { isSuccess }] = useLogoutMutation()
	const router = useRouter()

	const onClosePopupHandler = () => {
		setIsActive(false)
	}

	if (isSuccess) {
		router.push('/login')
	}

	return (
		<Popup onClose={onClosePopupHandler}>
			<TitlePopup title={'Log Out'} onClose={onClosePopupHandler} />
			<div className={s.notification}>
					<span>
						Are you really want to log out of
							your account {email} {name}?
					</span>
				<div className={s.logout}>
					<div className={s.btn}>
						<Button title={'Log Out'} callback={() => logout()} />
					</div>
					<div className={s.btn}>
						<Button title={'No'} callback={onClosePopupHandler} />
					</div>
				</div>
			</div>
		</Popup>
	)
}