import Axios from "axios"

const axios = Axios.create({
    baseURL: "http://localhost:8000/index.php",
    headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
    }
})

axios.interceptors.request.use(config => {
    const authenticationToken = JSON.parse(sessionStorage.getItem("authenticationToken"));
    
    if (authenticationToken !== null){
        const token = authenticationToken ? authenticationToken.token : null;
        
        if(token){
            config.headers.Authorization = 'Bearer' + token;
        }
    }

    return config;
})


export default axios; 