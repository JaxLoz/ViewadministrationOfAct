import { defineStore } from "pinia";
import { useAxios } from "@/composables/useAxios";
import axios from "@/axios";


export const useEmailValidationStore = defineStore("emailValidation", {
    state: () => ({
        idCredentials: 0,
        email: "",
        isEmailValid: false
    }),

    actions: {

        setIdCredentials(id){
            this.idCredentials = id;
        },

        setEmail(email){
            this.email = email;
        },

        async sendEmailVerificationCode(){
            const response = await axios.post("?controller=validationEmail&action=sendValidationCode",{
                email: this.email
            })
        },

        async refreshVerificationCode(){
            console.log("hola")
            const response = await axios.put("?controller=validationEmail&action=refreshVerificationCode",{
                email: this.email
            })
            return response.data.data;
        },

        async emailVerify (email, verificationCode){
            const response = await axios.put("?controller=validationEmail&action=validateEmailVerificationCode",{
                email: email,
                verification_code: verificationCode
            })
            this.isEmailValid = response.data.data;
        },

        uploadEmailSessionStorage(email){
            if(sessionStorage.getItem("validationEmail") === null){
            sessionStorage.setItem("validationEmail", JSON.stringify(email))
            }
        },

        downloadEmailLocalStorage(){
            if(sessionStorage.getItem("validationEmail") != null){
                this.email = JSON.parse(sessionStorage.getItem("validationEmail"))
            }
        }

    }
})