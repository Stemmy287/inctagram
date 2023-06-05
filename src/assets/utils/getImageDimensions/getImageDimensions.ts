import { SizeType } from '@/modules/postModules/components/crop/CropEasy'

export function getImageDimensions(file: File): Promise<SizeType> {
	return new Promise(resolve => {
		const reader = new FileReader()

		reader.onload = function (e) {
			const img = new Image()

			img.onload = function () {
				resolve({ width: img.width, height: img.height })
			}
			// @ts-ignore
			img.src = e.target.result
		}

		reader.readAsDataURL(file)
	})
}
