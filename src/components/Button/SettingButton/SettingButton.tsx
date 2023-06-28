import React from 'react'
import s from './SettingButton.module.scss'
import { useRouter } from 'next/router'

type PropsType = {
	title: string
	callback: () => void
}

export const SettingButton = ({title, callback}: PropsType) => {

	const router = useRouter()

	const comparisonTable = {
		'General information': '/profile/settings_information',
		'Devices': '/profile/settings_devices',
		'Account Management': '/profile/settings_management',
		'My payments': '/profile/settings_payments',
	} as {[key: string]: string}

	const comparisonTableRu = {
		'Общая информация': '/profile/settings_information',
		'Устройства': '/profile/settings_devices',
		'Управление Аккаунтом': '/profile/settings_management',
		'Мои платежи': '/profile/settings_payments',
	} as {[key: string]: string}

	const isActive = comparisonTable[title] === router.pathname || comparisonTableRu[title] === router.pathname

	return <button className={isActive ? `${s.button} ${s.active}` : s.button} onClick={callback}>{title}</button>
}







