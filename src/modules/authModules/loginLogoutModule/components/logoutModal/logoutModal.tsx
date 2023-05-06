import { Popup } from '@/components/Popup/Popup'
import { FC } from 'react'
import { TitlePopup } from '@/components/TitlePopup/TitlePopup'
import { Button } from '@/components/Button/Button'
import s from './logoutModal.module.scss'

type PropsType = {
	setIsActive: (isActive: boolean) => void
	email: string,
	name: string
}

export const LogoutModal: FC<PropsType> = ({ setIsActive, name, email }) => {

	const onClosePopupHandler = () => {
		setIsActive(false)
	}

	return (
		<div>
			<Popup onClose={onClosePopupHandler}>
				<TitlePopup title={'Log Out'} onClose={onClosePopupHandler} />
				<div className={s.notification}>
					<span>
						Are you really want to log out of
							your account {email} {name}?
					</span>
					<div className={s.btn}>
						<Button title={'Log Out'} callback={onClosePopupHandler} />
					</div>
				</div>
			</Popup>
		</div>
	)
}