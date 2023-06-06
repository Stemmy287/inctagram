import { NextPageWithLayout } from '@/pages/_app'
import { Input } from '@/components/Input/Input'
import * as yup from 'yup'
import { Controller, SubmitHandler, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import s from '@/modules/profileModules/createProfile/EditGeneralInformation.module.scss'
import { Button } from '@/components/Button/Button'
import {
	ProfileType,
	useCreateProfileMutation,
	useGetUserQuery
} from '@/modules/profileModules/createProfile/createProfileApi'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'

export const GeneralInformation: NextPageWithLayout = () => {
	const [createProfile] = useCreateProfileMutation()
	const { data: profileData } = useGetUserQuery()
	// const profileData = useAppSelector(state => state.createProfileReducer.profileData)

	const schema = yup.object().shape({
		userName: yup.string().required('field required'),
		firstName: yup.string().required('enter firstname'),
		lastName: yup.string().required('enter lastname'),
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
		defaultValues: {
			userName: profileData?.userName ?? '',
			firstName: profileData?.firstName ?? '',
			lastName: profileData?.lastName ?? '',
			city: profileData?.city ?? '',
			aboutMe: profileData?.aboutMe ?? ''
			// dateOfBirth: profileData?.dateOfBirth as unknown as Date
		},
		resolver: yupResolver(schema)
	})
	const onSubmit: SubmitHandler<ProfileType> = async data => {
		await createProfile(data)
	}
	return (
		<div>
			<form className={s.container} onSubmit={handleSubmit(onSubmit)}>
				<Input title='Username' register={register} name={'userName'} />
				<Input title='First Name' register={register} name={'firstName'} />
				<Input title='Last Name' register={register} name={'lastName'} />
				<label>Date of birth</label>
				<Controller
					name='dateOfBirth'
					control={control}
					render={({ field: { onChange, value } }) => (
						<DatePicker
							wrapperClassName={s.datepicker}
							showIcon
							selected={value}
							onChange={onChange}
							value={profileData?.dateOfBirth}
						/>
					)}
				/>

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
