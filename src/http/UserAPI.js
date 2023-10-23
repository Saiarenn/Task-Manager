import { $host } from "./index";
import jwt_decode from "jwt-decode";

export const registration = async (firstName, lastName, email, password) => {
    const { data } = await $host.post('api/v1/auth/signup', { firstName, lastName, email, password })
    localStorage.setItem('token', data.token)
    return jwt_decode(data.token)
}
export const login = async (email, password) => {
    const { data } = await $host.post('api/v1/auth/signin', { email, password })
    localStorage.setItem('token', data.token)
    return jwt_decode(data.token)
}

