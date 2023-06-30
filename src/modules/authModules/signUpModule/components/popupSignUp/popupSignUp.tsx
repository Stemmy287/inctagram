import { Popup } from 'components/Popup/Popup'
import { Notification } from 'components/Notification/Notification'
import { FC } from 'react'
import { useRouter } from 'next/router'
import { en } from '../../../../../locales/en'
import { ru } from '../../../../../locales/ru'

type PropsType = {
	onClosePopupHandler: () => void
	email: string
}

export const PopupSignUp: FC<PropsType> = ({ onClosePopupHandler, email }) => {

	const router = useRouter()

	const t = router.locale === 'en' ? en : ru

	return (
		<Popup onClose={onClosePopupHandler}>
			<Notification
				title={t.emailSent}
				buttonTitle={t.ok}
				message={`${t.emailConfirm} ${email}`}
				onClose={onClosePopupHandler}
			/>
		</Popup>
	)
}
