import { Popup } from 'components/Popup/Popup'
import { Notification } from 'components/Notification/Notification'
import { FC } from 'react'

type PropsType = {
	onClosePopupHandler: () => void
	email: string
}

export const PopupSignUp: FC<PropsType> = ({ onClosePopupHandler, email }) => {
	return (
		<Popup onClose={onClosePopupHandler}>
			<Notification
				title='Email sent'
				buttonTitle='OK'
				message={`We have sent a link to confirm your email to ${email}`}
				onClose={onClosePopupHandler}
			/>
		</Popup>
	)
}
