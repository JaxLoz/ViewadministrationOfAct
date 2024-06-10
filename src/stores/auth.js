import axios from "@/axios"
import {ref, computed} from "vue"
import {defineStore} from "pinia"

export const useAuthStore = defineStore("auth", () =>{

    const user = ref(null);
    const credential = ref(null)

    // registra un nuevo usuario

    const registro = async (form) =>{
        
        const response = await axios.post("?controller=singup&action=registerCredential", {
            email: form.email,
            user_password: form.user_password
        })

        const id_credential = response.data.data.id;
        credential.value = id_credential;
        
        const responseUser = await axios.post("?controller=user&action=registerUser", {
            firstname: form.firstname,
            lastname: form.lastname,
            phone: form.phone,
            id_rol: form.id_rol,
            id_credential: id_credential,// esto ya no se necesita enviar
        })
        
    }

    // comprueba las credendiales del usuario
    const loginOfSistem = async (formLogin) =>{
        const response = await axios.post("?controller=singup&action=login", {
            email: formLogin.email,
            user_password: formLogin.user_password
        })
        sessionStorage.setItem("authenticationToken", JSON.stringify(response.data.data))
        return response.data.data.validateCredentials; // true o false si las credenciales son correctas
    }

    return {credential, user, registro, loginOfSistem}
})