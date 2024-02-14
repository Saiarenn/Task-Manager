import { $host } from "./index";
import jwt_decode from "jwt-decode";

export const registration = async (firstName, lastName, email, password) => {
    const { data } = await $host.post('api/v1/auth/signup', { firstName, lastName, email, password })
    localStorage.setItem('token', data.accessToken)
    return jwt_decode(data.accessToken)
}

export const login = async (email, password) => {
    const { data } = await $host.post('api/v1/auth/signin', { email, password })
    localStorage.setItem('token', data.accessToken)
    return jwt_decode(data.accessToken)
}

// export const refresh = async () => {
//     const { data } = await $host.post('api/v1/auth/refresh', {
//         refreshToken: localStorage.getItem('refresh'),
//     })
//     localStorage.setItem('token', data.accessToken)
//     return jwt_decode(data.accessToken)
// }

