import React from 'react'
import s from './CurrentSubscription.module.scss'

type PropsType = {
	title: string
	date: string
}

export const CurrentSubscription = ({title, date}: PropsType) => {
	return (
		<div className={s.container}>
			<span>{title}</span>
			<span>{date}</span>
		</div>
	)
}

