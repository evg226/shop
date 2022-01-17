import axios from "axios";
const baseURL="http://localhost"


const $host=axios.create({
    baseURL,
    withCredentials:true
});

const $authHost=axios.create({
    baseURL,
    withCredentials:true
});

// const authInterceptor = config => {
//     config.headers.authorization = `Bearer ${localStorage.getItem('token')}`
//     return config
// }
//
// $authHost.interceptors.request.use(authInterceptor)

export const getFormData = object => Object.keys(object).reduce((formData, key) => {
    formData.append(key, object[key]);
    return formData;
}, new FormData());

export {
    $host,
    // $authHost
}

