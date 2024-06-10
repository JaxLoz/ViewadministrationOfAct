import Axios from "axios"

const axios = Axios.create({
    baseURL: "http://localhost:8000/index.php",
    headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
    }
})


export default axios; 