import * as yup from 'yup'
import { SubmitHandler, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import s from './GeneralInformation.module.scss'
import { NextPageWithLayout } from 'pages/_app'
import { Input } from 'components/Input/Input'
import { Button } from 'components/Button/Button'
import { ProfileType, useCreateProfileMutation } from '../../../profileApi/profileApi'
import { useAppSelector } from '../../../../../assets/hooks/useAppSelector'
import { selectUser } from '../../../profileReducer/profileReducer-selector'
import { TextArea } from '../../../../../components/TextArea/TextArea'

export const GeneralInformation: NextPageWithLayout = () => {
	const user = useAppSelector(selectUser)
	const [createProfile] = useCreateProfileMutation()

	const date = new Date(user?.dateOfBirth as string)
	const formattedDate =
		date.getFullYear() +
		'-' +
		('0' + (date.getMonth() + 1)).slice(-2) +
		'-' +
		('0' + date.getDate()).slice(-2)

	const schema = yup.object().shape({
		userName: yup.string().required('field required'),
		firstName: yup.string().required('enter firstname'),
		lastName: yup.string().required('enter lastname'),
		city: yup.string().required('enter city'),
		aboutMe: yup.string().required('add about me'),
		dateOfBirth: yup.string().required('add date of birth')
	})

	const { register, handleSubmit } = useForm<ProfileType>({
		defaultValues: {
			userName: user?.userName,
			firstName: user?.firstName,
			lastName: user?.lastName,
			city: user?.city,
			aboutMe: user?.aboutMe
		},
		resolver: yupResolver(schema)
	})

	const onSubmit: SubmitHandler<ProfileType> = async data => {
		await createProfile(data)
		// useFetchProfileQuery(null)
	}

	return (
		<form className={s.container} onSubmit={handleSubmit(onSubmit)}>
			<Input title='Username' register={register} name={'userName'} />
			<Input title='First Name' register={register} name={'firstName'} />
			<Input title='Last Name' register={register} name={'lastName'} />
			<div className={s.calendar}>
				<label>Date of birthday</label>
				<input
					type='date'
					{...register('dateOfBirth')}
					className={s.calendarInput}
					defaultValue={formattedDate}
				/>
			</div>
			<Input title='City' register={register} name={'city'} />
			<TextArea title='About me' register={register} name='aboutMe' />
			<div className={s.line}></div>
			<div className={s.btn}>
				<Button title='Save Changes' />
			</div>
		</form>
	)
}