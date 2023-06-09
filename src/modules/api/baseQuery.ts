import { fetchBaseQuery } from '@reduxjs/toolkit/dist/query/react'
import { AppRootStateType } from 'store/store'

export const baseQuery = fetchBaseQuery({
	baseUrl: process.env.NEXT_PUBLIC_API_URL,
	credentials: 'include',
	prepareHeaders: (headers, { getState }) => {
		const token = (getState() as AppRootStateType).authReducer.token || localStorage.getItem('token')
		if (token) {
			headers.set('Authorization', `Bearer ${token}`)
		}
		return headers
	}
})
