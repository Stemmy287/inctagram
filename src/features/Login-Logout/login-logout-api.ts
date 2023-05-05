import { instance } from '@/common/api/common.api'
import { AxiosResponse } from 'axios'

export const loginLogoutApi = {
	login(arg: LoginParamsType) {
		return instance.post<AxiosResponse<LoginUpdateResponseType>>('login', arg)
	},
	logout() {
		return instance.post('logout')
	},
	me() {
		return instance.get<AxiosResponse<MeResponseType>>('me')
	},
	updateTokens() {
		return instance.post<AxiosResponse<LoginUpdateResponseType>>('update-token')
	}
}

type LoginParamsType = {
	email: string
	password: string
}

type LoginUpdateResponseType = {
	accessToken: string
}

type MeResponseType = {
	userId: number
	userName: string
	email: string
}