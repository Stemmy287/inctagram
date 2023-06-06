import React from 'react'
import s from './Notification.module.scss'
import { TitlePopup } from 'components/TitlePopup/TitlePopup'
import { Button } from 'components/Button/Button'

type PropsType = {
	title: string
	buttonTitle: string
	message: string
	onClose: () => void
}

export const Notification = ({ title, buttonTitle, message, onClose }: PropsType) => {
	return (
		<>
			<TitlePopup title={title} onClose={onClose} />
			<div className={s.notification}>
				<span>{message}</span>
				<div className={s.btn}>
					<Button title={buttonTitle} callback={onClose} />
				</div>
			</div>
		</>
	)
}
