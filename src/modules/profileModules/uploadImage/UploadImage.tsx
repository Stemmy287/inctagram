import React, { ChangeEvent, useRef, useState } from 'react'
import { useUploadImageMutation } from '@/modules/profileModules/uploadImage/uploadImageApi'
import Image from 'next/image'

export const UploadImage = () => {
	const [ava, setAva] = useState('')
	const inputRef = useRef<HTMLInputElement>(null)
	const [uploadImage] = useUploadImageMutation()
	const selectFileHandler = () => {
		inputRef && inputRef.current?.click();
	};

	const uploadHandler = (e: ChangeEvent<HTMLInputElement>) => {
		if (e.target.files && e.target.files.length) {
			const file = e.target.files[0]
			console.log('file: ', file)

			if (file.size < 4000000) {
				convertFileToBase64(file, (file64: string) => {
					console.log('file64: ', file64)
					uploadImage({ file: file64 })
					// setAva(file64)
				})
			} else {
				console.error('Error: ', 'Файл слишком большого размера')
			}

		}
	}

	const convertFileToBase64 = (file: File, callBack: (value: string) => void) => {
		const reader = new FileReader();
		reader.onloadend = () => {
			const file64 = reader.result as string
			callBack(file64)
		}
		reader.readAsDataURL(file)
	}

	return (
		<div>
			{/*<Image src={ava} alt={'ava'} width={300}/>*/}
			{/*<button onClick={selectFileHandler} >upload file</button>*/}
			<input
				// style={{display: 'none'}}
				// ref={inputRef}
				type="file"
				onChange={uploadHandler}
			/>
		</div>
	)
}
