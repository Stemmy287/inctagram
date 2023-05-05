import axios from 'axios'

export const API_URL = 'https://inctagram-api-git-main-shuliakleonid.vercel.app/api/'

export const instance = axios.create({
	baseURL: API_URL,
	withCredentials: true
})

instance.interceptors.request.use((config) => {
	config.headers.Authorization = `Bearer ${localStorage.getItem('token')}`
	return config
})
