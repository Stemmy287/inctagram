import { NextPageWithLayout } from '@/pages/_app'
import { Input } from '@/components/Input/Input'
import * as yup from 'yup'
import { Controller, SubmitHandler, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import s from '@/modules/profileModules/createProfile/EditGeneralInformation.module.scss'
import { Button } from '@/components/Button/Button'
import { ProfileType, useCreateProfileMutation } from '@/modules/profileModules/createProfile/createProfileApi'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'

export const GeneralInformation: NextPageWithLayout = () => {
	const [createProfile, { data, isLoading }] = useCreateProfileMutation()

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
		handleSubmit,
		formState: { errors }
	} = useForm<ProfileType>({
		resolver: yupResolver(schema)
	})
	const onSubmit: SubmitHandler<ProfileType> = async data => {
		createProfile(data)
	}
	return (
		<div>
			<form className={s.container} onSubmit={handleSubmit(onSubmit)}>
				<Input title='Username' register={register} name={'username'} />
				<Input title='First Name' register={register} name={'firstname'} />
				<Input title='Last Name' register={register} name={'lastname'} />
				<label>Date of birth</label>
				<Controller
					name='dateOfBirth'
					control={control}
					render={({ field: { onChange, value } }) => (
						<DatePicker
							wrapperClassName={s.datepicker}
							showIcon selected={value} onChange={onChange} />
					)}
				/>

				<Input title='City' register={register} name={'city'} />
				<label>About me</label>
				<textarea placeholder='Textarea' {...register('aboutMe')} rows={4} />
				<Button title='Save Changes' />
			</form>
		</div>
	)
}
