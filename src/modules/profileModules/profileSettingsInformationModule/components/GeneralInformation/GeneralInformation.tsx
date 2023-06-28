import * as yup from 'yup'
import { SubmitHandler, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import s from './GeneralInformation.module.scss'
import { NextPageWithLayout } from 'pages/_app'
import { Input } from 'components/Input/Input'
import { Button } from 'components/Button/Button'
import {
	ProfileType,
	useCreateProfileMutation,
	useFetchProfileQuery
} from '../../../profileApi/profileApi'
import { TextArea } from '../../../../../components/TextArea/TextArea'
import { en } from '../../../../../locales/en'
import { ru } from '../../../../../locales/ru'
import { useRouter } from 'next/router'

export const GeneralInformation: NextPageWithLayout = () => {
	const { data } = useFetchProfileQuery(null)
	const [createProfile] = useCreateProfileMutation()
	const date = new Date(data?.dateOfBirth as string)
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
			userName: data?.userName,
			firstName: data?.firstName,
			lastName: data?.lastName,
			city: data?.city,
			aboutMe: data?.aboutMe
		},
		resolver: yupResolver(schema)
	})

	const router = useRouter()

	const t = router.locale === 'en' ? en : ru

	const onSubmit: SubmitHandler<ProfileType> = data => createProfile(data)

	return (
		<form className={s.container} onSubmit={handleSubmit(onSubmit)}>
			<Input title={t.userName} register={register} name={'userName'} />
			<Input title={t.firstName} register={register} name={'firstName'} />
			<Input title={t.lastName} register={register} name={'lastName'} />
			<div className={s.calendar}>
				<label>{t.dateOfBirthday}</label>
				<input
					type='date'
					{...register('dateOfBirth')}
					className={s.calendarInput}
					defaultValue={formattedDate}
				/>
			</div>
			<Input title={t.city} register={register} name={'city'} />
			<TextArea title={t.aboutMe} register={register} name='aboutMe' />
			<div className={s.line}></div>
			<div className={s.btn}>
				<Button title={t.saveChanges} />
			</div>
		</form>
	)
}
