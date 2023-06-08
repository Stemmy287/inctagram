import React, { PropsWithChildren } from 'react'
import s from './Popup.module.scss'
import { NextPage } from 'next'

type PropsType = {
	onClose: () => void
}

export const Popup: NextPage<PropsType & PropsWithChildren> = ({ children, onClose }) => {
	return (
		<div className={s.modal} onClick={onClose}>
			<div className={s.content} onClick={e => e.stopPropagation()}>
				{children}
			</div>
		</div>
	)
}
