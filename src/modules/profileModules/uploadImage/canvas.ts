import { ChangeEvent } from 'react'

const convertFileToBase64 = (file: File, callBack: (value: string) => void) => {
	const reader = new FileReader()
	reader.onloadend = () => {
		const file64 = reader.result as string
		callBack(file64)
	}
	reader.readAsDataURL(file)
}

export const uploadHandler = (
	e: ChangeEvent<HTMLInputElement>,
	setFile: (file: File) => void,
	setAva: (ava: string) => void
) => {
	if (e.target.files && e.target.files.length) {
		const file = e.target.files[0]
		const reader = new FileReader()
		reader.addEventListener('load', e => {
			const img = new Image()
			img.addEventListener('load', () => {
				const canvas = document.createElement('canvas')
				const ctx = canvas.getContext('2d')
				if (ctx) {
					ctx.filter = 'contrast(110%) brightness(110%) sepia(30%) grayscale(100%)'
					ctx.drawImage(img, 0, 0, canvas.width, canvas.height)
					canvas.toBlob(blob => {
						if (blob) {
							const modifiedFile = new File([blob], file.name, { type: 'image/jpeg' })
							convertFileToBase64(modifiedFile, (file64: string) => {
								setAva(file64)
							})
							setFile(modifiedFile)
						}
					})
				}
			})
			img.src = e.target?.result as string
