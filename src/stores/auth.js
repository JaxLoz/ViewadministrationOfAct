import axios from "@/axios"
import {ref, computed} from "vue"
import {defineStore} from "pinia"

export const useAuthStore = defineStore("auth", () =>{

    const user = ref(null);

    const registro = async (form) =>{
        
        const response = await axios.post("?controller=singup&action=registerCredential", {
            email: form.email,
            user_password: form.user_password
        })

        const id_credential = response.data.data.id;
        
        const responseUser = await axios.post("?controller=user&action=registerUser", {
            firstname: form.firstname,
            lastname: form.lastname,
            phone: form.phone,
            id_rol: form.id_rol,
            id_credential: id_credential,
        })
        
    }

    const loginOfSistem = async (formLogin) =>{
        const response = await axios.post("?controller=singup&action=login", {
            email: formLogin.email,
            user_password: formLogin.user_password
        })
        return response.data.status_code
    }

    return {user, registro, loginOfSistem}
})