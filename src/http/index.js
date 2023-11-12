import axios from "axios";

const $host = axios.create({
    baseURL: process.env.REACT_APP_API_URL,
    withCredentials: true
})

const $authHost = axios.create({
    baseURL: process.env.REACT_APP_API_URL,
})

const authInterceptor = config => {
    config.headers.authorization = 'Bearer ' + localStorage.getItem('token')
    return config
}

$authHost.interceptors.response.use(
    (response) => {
        return response;
    },
    async (error) => {
        const originalRequest = error.config;

        if (error.response.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;

            const {data} = await $host.post('api/v1/auth/refresh')
            localStorage.setItem('token', data.accessToken)

            originalRequest.headers.authorization = 'Bearer ' + data.accessToken;

            return $host(originalRequest);
        }

        return Promise.reject(error);
    }
)

$authHost.interceptors.request.use(authInterceptor)

export {
    $host,
    $authHost
}