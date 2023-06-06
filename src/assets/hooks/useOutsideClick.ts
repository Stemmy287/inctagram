import { RefObject } from 'react'
import useEventListener from './useEventListener'

type Handler = (event: MouseEvent) => void

function useOnClickOutside<T extends HTMLElement = HTMLElement>(
	ref: RefObject<T>,
	handler: Handler,
	id: string,
	mouseEvent: 'mousedown' | 'mouseup' = 'mousedown'
): void {
	useEventListener(mouseEvent, event => {
		const el = ref?.current

		// Do nothing if clicking ref's element or descendent elements
		if (!el || el.contains(event.target as Node)) {
			return
		}

		// Check if the click was on the modal button
		const modalButton = document.querySelector(`#${id}`)
		if (modalButton && modalButton.contains(event.target as Node)) {
			return
		}

		handler(event)
	})
}

export default useOnClickOutside
