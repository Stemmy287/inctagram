import React, { ChangeEvent, useState } from 'react'
import s from './ProfileSettingManagement.module.scss'
import { SettingsNavBar } from '../../../../../components/SettingsNavBar/SettingsNavBar'
import { CommonWrapper } from '../../../../../components/CommonWrapper/CommonWrapper'
import { CurrentSubscription } from '../CurrentSubscription/CurrentSubscription'
import { Radio } from '../../../../../components/RadioButton/Radio'
import { PaymentButton } from '../PaymentButton/PaymentButton'
import paypal from '../../../../../../public/images/paypal.png'
import stripe from '../../../../../../public/images/stripe.png'
import { Checkbox } from '../../../../../components/Checkbox/Checkbox'
import { Popup } from '../../../../../components/Popup/Popup'
import { Notification } from '../../../../../components/Notification/Notification'

export const ProfileSettingManagement = () => {

	const optionsType = [
		{ value: 'Personal', title: 'Personal', disabled: false },
		{ value: 'Business', title: 'Business' }
	]

	const optionsChangeSub = [
		{ value: '$10', title: '$10 per 1 Day' },
		{ value: '$50', title: '$50 per 7 Day' },
		{ value: '$100', title: '$100 per month' }
	]

	const [valueType, setValueType] = useState('Personal')
	const [valueChangeSub, setValueChangeSub] = useState('$10')
	const [valueCheckbox, setValueCheckbox] = useState(false)
	const [isActive, setIsActive] = useState(false)

	const onChangeType = (value: string) => {
		setValueType(value)
	}

	const onChangeSub = (value: string) => {
		setValueChangeSub(value)
	}

	const onChangeChecked = (e: ChangeEvent<HTMLInputElement>) => {
		setValueCheckbox(e.currentTarget.checked)
	}

	const onClose = () => {
		setIsActive(false)
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
				<Checkbox title='Auto-Renewal' onChange={onChangeChecked} checked={valueCheckbox} />
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
				<div className={s.paymentSystems}>
					<PaymentButton img={paypal} />Or<PaymentButton img={stripe} />
				</div>
			</div>
			{isActive && <Popup onClose={onClose}>
				<div className={s.notification}>
					<Notification
						title='Success'
						buttonTitle='OK'
						bigButton
						message='Payment was successful!'
						onClose={onClose}
					/>
				</div>
			</Popup>}
		</div>
	)
}

