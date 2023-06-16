import React, { useState } from 'react'
import s from './ProfileSettingManagement.module.scss'
import { SettingsNavBar } from '../../../../../components/SettingsNavBar/SettingsNavBar'
import { CommonWrapper } from '../../../../../components/CommonWrapper/CommonWrapper'
import { CurrentSubscription } from '../CurrentSubscription/CurrentSubscription'
import { Radio } from '../../../../../components/RadioButton/Radio'

export const ProfileSettingManagement = () => {

	const optionsType = [
		{value: 'Personal', title: 'Personal', disabled: false},
		{value: 'Business', title: 'Business'}
	]

	const optionsChangeSub = [
		{value: '$10', title: '$10 per 1 Day'},
		{value: '$50', title: '$50 per 7 Day'},
		{value: '$100', title: '$100 per month'}
	]

	const [valueType, setValueType] = useState('Personal')
	const [valueChangeSub, setValueChangeSub] = useState('$50')

	const onChangeType = (value: string) => {
		setValueType(value)
	}

	const onChangeSub = (value: string) => {
		setValueChangeSub(value)
	}

	return (
		<div className={s.container}>
			<SettingsNavBar />
			<div className={s.contentWrapper}>
				<CommonWrapper title='Current Subscription'>
					<div className={s.currentSubscription}>
						<CurrentSubscription title='Expire at' date='12.12.2022' />
						<CurrentSubscription title='Next payment' date='13.02.2023' />
					</div>
				</CommonWrapper>
				<CommonWrapper title='Account type'>
					<Radio
						options={optionsType}
						value={valueType}
						name='Account type'
						onChange={onChangeType}
					/>
				</CommonWrapper>
				<CommonWrapper title='Change your subscription'>
					<Radio
						options={optionsChangeSub}
						value={valueChangeSub}
						name='Current Subscription'
						onChange={onChangeSub}
					/>
				</CommonWrapper>
			</div>
		</div>
	)
}

