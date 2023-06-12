import { Area } from 'react-easy-crop'
import { SizeType } from 'modules/postModules/components/crop/CropEasy'

export const createImage = (url: string): Promise<HTMLImageElement> =>
	new Promise((resolve, reject) => {
		const image = new Image()
		image.addEventListener('load', () => resolve(image))
		image.addEventListener('error', error => reject(error))
		image.setAttribute('crossOrigin', 'anonymous') // needed to avoid cross-origin issues on CodeSandbox
		image.src = url
	})

export function getRadianAngle(degreeValue: number): number {
	return (degreeValue * Math.PI) / 180
}

/**
 * Returns the new bounding area of a rotated rectangle.
 */
export function rotateSize(width: number, height: number): SizeType {
	return {
		width,
		height
	}
}

export default async function getCroppedImg(
	imageSrc: string,
	pixelCrop: Area | null,
	flip = { horizontal: false, vertical: false }
): Promise<{ file: Blob; url: string } | null> {
	const image = await createImage(imageSrc)
	const canvas = document.createElement('canvas')
	const ctx = canvas.getContext('2d')

	if (!ctx) {
		return null
	}

	// calculate bounding box of the rotated image
	const { width: bBoxWidth, height: bBoxHeight } = rotateSize(image.width, image.height)

	// set canvas size to match the bounding box
	canvas.width = bBoxWidth
	canvas.height = bBoxHeight

	// translate canvas context to a central location to allow rotating and flipping around the center
	ctx.translate(bBoxWidth / 2, bBoxHeight / 2)
	ctx.scale(flip.horizontal ? -1 : 1, flip.vertical ? -1 : 1)
	ctx.translate(-image.width / 2, -image.height / 2)

	// draw rotated image
	ctx.drawImage(image, 0, 0)

	// croppedAreaPixels values are bounding box relative
	// extract the cropped image using these values
	// @ts-ignore
	const data = ctx.getImageData(pixelCrop.x, pixelCrop.y, pixelCrop.width, pixelCrop.height)

	// set canvas width to final desired crop size - this will clear existing context
	// @ts-ignore
	canvas.width = pixelCrop.width
	// @ts-ignore
	canvas.height = pixelCrop.height

	// paste generated rotate image at the top left corner
	ctx.putImageData(data, 0, 0)

	// As Base64 string
	// return canvas.toDataURL('image/jpeg');

	// As a blob
	return new Promise<{ file: Blob; url: string }>((resolve, reject) => {
		canvas.toBlob(blob => {
			if (!blob) {
				reject(new Error('Failed to create a blob'))
				return
			}
			const file = new File([blob], 'cropped.jpeg', { type: blob.type })
			resolve({ file: file, url: URL.createObjectURL(file) })
		}, 'image/jpeg')
	})
}
