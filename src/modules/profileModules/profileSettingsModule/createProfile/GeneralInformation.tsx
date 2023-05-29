import { NextPageWithLayout } from '@/pages/_app'
import { Input } from '@/components/Input/Input'
import * as yup from 'yup'
import { Controller, SubmitHandler, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import s from '@/modules/authModules/loginLogoutModule/components/Login/Login.module.scss'
import { Button } from '@/components/Button/Button'
import {
	ProfileType,
	useCreateProfileMutation
} from '@/modules/profileModules/profileSettingsModule/createProfile/createProfileApi'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'

export const GeneralInformation: NextPageWithLayout = () => {


	const [createProfile] = useCreateProfileMutation()

	const schema = yup.object().shape({
		username: yup.string().required('field required'),
		firstname: yup.string().required('enter firstname'),
		lastname: yup.string().required('enter lastname'),
		city: yup.string().required('enter city'),
		aboutMe: yup.string().required('add about me'),
		dateOfBirth: yup.string().required('add date of birth')
	})
	const {
		control,
		register,
		handleSubmit
	} = useForm<ProfileType>({
		resolver: yupResolver(schema)
	})
	const onSubmit: SubmitHandler<ProfileType> = async data => {
		createProfile(data)
	}
	return (
		<div>
			<form className={s.container} onSubmit={handleSubmit(onSubmit)}>
				<Input
					title='Username'
					register={register}
					name={'username'}
				/>
				<Input
					title='First Name'
					register={register}
					name={'firstname'}
				/>
				<Input
					title='Last Name'
					register={register}
					name={'lastname'}
				/>
				<label>Date of birthday</label>
				<Controller
					name='dateOfBirth'
					control={control}
					render={({ field: { onChange, value } }) => (
						<DatePicker
							showIcon={true}
							selected={value}
							onChange={onChange}
						/>
					)}
				/>

				<Input
					title='City'
					register={register}
					name={'city'}
				/>

				<textarea
					{...register('aboutMe')} rows={10} />
				<Button title='Submit' />
			</form>

		</div>
	)
}