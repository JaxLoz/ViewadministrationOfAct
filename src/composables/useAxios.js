import axios from "@/axios";
import router from "@/router";
import { ref } from "vue";

export function useAxios(){
    
    const error = ref(null);

    axios.interceptors.request.use(config => {
        const authenticationToken = JSON.parse(sessionStorage.getItem("authenticationToken"));
        if(authenticationToken !== null){
            const token = authenticationToken ? authenticationToken.token : null;
            if(token){
                config.headers.Authorization = "Bearer " + token;
            }
        }
        return config;
    })

    axios.interceptors.response.use(response => {
        return response; // si el response.status esta en el rango de 2xx
    }, async ResponseError => {
        if(ResponseError.response){
            switch(ResponseError.response.status){
                case 400:
                    error.value = "Bad request";
                    break;
                case 401:
                    error.value = "Token expired or invalid token";
                    handleAuthentication();
                    break;
                case 403:
                    error.value = "Access denied for this resource"
                    break;
                case 404:
                    error.value = "The resource does not exist";
                    break;
                case 500:
                    error.value = "Server Error";
                    break;
                default:
                    error.value = "Unknown error";
                    break;
            }
        }
    })

    function handleAuthentication(){
        router.push("/login")
    }

    function get(url){
        return axios.get(url)
    }

    function put(url, data){
        return axios.put(url, data)
    }

    return {
        error,
        get,
        put
    }
}