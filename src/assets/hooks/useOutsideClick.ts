import { RefObject, useEffect } from 'react';

export const useOutsideClick = (elementRef: RefObject<HTMLElement>, callback: () => void, isActive: boolean) => {
	useEffect(() => {
		if (!isActive) return;
		const onClickHandler = (e: Event) => {
			if (elementRef.current && !elementRef.current.contains(e.target as Node)) {
				callback();
			}
		};
		document.addEventListener('click', onClickHandler);
		return () => {
			document.removeEventListener('click', onClickHandler);
		};
	}, [isActive, callback, elementRef]);
};