import React from 'react'
import { SettingButton } from '../Button/SettingButton/SettingButton'
import { useRouter } from 'next/router'
import { en } from '../../locales/en'
import { ru } from '../../locales/ru'

export const SettingsNavBar = () => {

	const router = useRouter()

	const pushRouter = (path: string) => {
		router.push(path)
	}

	const t = router.locale === 'en' ? en : ru

	const arrBtns = [
		{title: t.generalInformation, callback: () => {pushRouter('/profile/settings_information')}},
		{title: t.devices, callback: () => {pushRouter('/profile/settings_devices')}},
		{title: t.accountManagement, callback: () => {pushRouter('/profile/settings_management')}},
		{title: t.myPayments, callback: () => {pushRouter('/profile/settings_payments')}},
	]

	return (
		<>
			{arrBtns.map(({title, callback}, i) => <SettingButton key={i} title={title} callback={callback}/>)}
		</>
	)
}

