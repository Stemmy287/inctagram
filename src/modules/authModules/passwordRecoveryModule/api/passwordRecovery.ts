import {instance} from "@/common/api/common.api";
import {AxiosResponse} from "axios";

export const passwordRecoveryApi = {
  passwordRecoveryApi(data: PasswordRecoveryType) {
    return instance.post<'', AxiosResponse, PasswordRecoveryType>('api/auth/password-recovery', data)
  }
}

//types
export type PasswordRecoveryType = {
  email: string
  recaptcha: string
}