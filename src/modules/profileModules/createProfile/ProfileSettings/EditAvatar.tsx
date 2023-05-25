import React, { useEffect, useState } from 'react'
import defaultAva from '../../../../../public/images/defaultPhoto.png'
import Image from 'next/image'
import { Button } from '@/components/Button/Button'
import { AddAvatar } from '@/modules/profileModules/uploadImage/AddAvatar'
import { useGetUserQuery } from '@/modules/profileModules/createProfile/createProfileApi'

export const EditAvatar = () => {
	const {data} = useGetUserQuery()
	const newAva = data?.avatars[1].url
	console.log(newAva)

	const [ava, setAva] = useState<any>(defaultAva)
	const [openModal, setOpenModal] = useState(false)
	const onClose = () => {
		setOpenModal(!openModal)
	}
	// useEffect(()=> {
	// 	if (data) {
	// 		setAva(newAva)
	// 	}
	// },[newAva])
	return (
		<div style={{width:300}}>
			<Image
				src={ava}
				alt="ava"
				width='300'
				height='300'
			/>
			{/*<Button title={'AAA'} callback={()=>setAva(newAva)}/>*/}
			<label>

			</label>
			<Button
				callback={onClose}
				title='Add a profile photo'/>
			{openModal && <AddAvatar onClose={onClose}/>}
		</div>
	)
}