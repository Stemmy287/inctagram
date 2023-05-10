import React from 'react'
import s from './ResendLink.module.scss'
import { Button } from '@/components/Button/Button'
import timeImage from '../../../public/images/rafiki.png'
import Image from 'next/image'

type PropsType = {
	title: string
	buttonTitle: string
	callback: () => void
	isLoading?: boolean
}

export const ResendLink = ({ title, buttonTitle, callback, isLoading }: PropsType) => {
	return (
		<div className={s.container}>
			<div className={s.content}>
				<h1>Email verification link {title}</h1>
				<span>Looks like the verification link has expired. Not to worry, we can send the link again</span>
				<Button title={buttonTitle} callback={callback} disabled={isLoading} />
			</div>
			<Image src={timeImage} alt={'Time img'} />
		</div>
	)
}
