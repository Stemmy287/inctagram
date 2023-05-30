import React from 'react'
import s from './SocialInfo.module.scss'

type PropsType = {
	count: string
	title: string
}

export const SocialInfo = ({count, title}: PropsType) => {
	return (
		<div className={s.container}>
			<span className={s.count}>{count}</span>
			<span>{title}</span>
		</div>
	)
}
