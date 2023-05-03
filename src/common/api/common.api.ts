import axios from "axios";

export const instance = axios.create({
    baseURL: 'https://inctagram-api-git-main-shuliakleonid.vercel.app/',
    withCredentials: true,
})