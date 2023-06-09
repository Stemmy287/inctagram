import * as yup from 'yup'
import { SubmitHandler, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import s from './GeneralInformation.module.scss'
import { NextPageWithLayout } from 'pages/_app'
import { Input } from 'components/Input/Input'
import { Button } from 'components/Button/Button'
import { ProfileType, useCreateProfileMutation } from '../../profileApi/profileApi'
import { useAppSelector } from '../../../../assets/hooks/useAppSelector'
import { selectUser } from '../../profileReducer/profileReducer-selector'

export const GeneralInformation: NextPageWithLayout = () => {
	const user = useAppSelector(selectUser)

	const [createProfile] = useCreateProfileMutation()

	const defaultDate = user?.dateOfBirth
		? new Date(user.dateOfBirth).toISOString().split('T')[0]
		: undefined

	const schema = yup.object().shape({
		userName: yup.string().required('field required'),
		firstName: yup.string().required('enter firstname'),
		lastName: yup.string().required('enter lastname'),
		city: yup.string().required('enter city'),
		aboutMe: yup.string().required('add about me'),
		dateOfBirth: yup.string().required('add date of birth')
	})

	const {
		register,
		handleSubmit
	} = useForm<ProfileType>({
		defaultValues: {
			userName: user?.userName,
			firstName: user?.firstName,
			lastName: user?.lastName,
			city: user?.city,
			aboutMe: user?.aboutMe
		},
		resolver: yupResolver(schema)
	})

	const onSubmit: SubmitHandler<ProfileType> = data => {
		createProfile(data)
	}

	return (
		<div>
			<form className={s.container} onSubmit={handleSubmit(onSubmit)}>
				<Input title='Username' register={register} name={'userName'} />
				<Input title='First Name' register={register} name={'firstName'} />
				<Input title='Last Name' register={register} name={'lastName'} />
				<label>Date of birth</label>
				<div className={s.calendar}>
					<input
						type='date'
						{...register('dateOfBirth')}
						defaultValue={defaultDate}
						className={s.calendarInput}
					/>
				</div>
				<Input title='City' register={register} name={'city'} />
				<label>About me</label>
				<textarea placeholder='Textarea' {...register('aboutMe')} rows={4} />
				<div className={s.btn}>
					<Button title='Save Changes' />
				</div>
			</form>
		</div>
	)
}
