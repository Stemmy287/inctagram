import React, { PropsWithChildren } from 'react'
import s from './CommonWrapper.module.scss'
import { NextPage } from 'next'

type PropsType = {
	title?: string
}

export const CommonWrapper: NextPage<PropsType & PropsWithChildren> = ({title, children}) => {
	return (
		<div>
			{title && <span className={s.title}>{title}</span>}
			<div className={s.container}>
				{children}
			</div>
		</div>
	)
}

