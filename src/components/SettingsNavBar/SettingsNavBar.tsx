import React from 'react'
import { SettingButton } from '../Button/SettingButton/SettingButton'
import { useRouter } from 'next/router'

export const SettingsNavBar = () => {

	const router = useRouter()

	const pushRouter = (path: string) => {
		router.push(path)
	}

	const arrBtns = [
		{title: 'General information', callback: () => {pushRouter('/profile/settings_information')}},
		{title: 'Devices', callback: () => {pushRouter('/profile/settings_devices')}},
		{title: 'Account Management', callback: () => {pushRouter('/profile/settings_management')}},
		{title: 'My payments', callback: () => {pushRouter('/profile/settings_payments')}},
	]

	return (
		<>
			{arrBtns.map(({title, callback}, i) => <SettingButton key={i} title={title} callback={callback}/>)}
		</>
	)
}

