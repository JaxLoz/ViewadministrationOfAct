import { defineStore } from "pinia";
import { useAxios } from "@/composables/useAxios";
import axios from "@/axios";

export const useEmailValidatinStore = defineStore("emailValidation", {
    state: () => ({
        idCredentials: 0,
        email: null,
        isEmailValid: false
    }),

    actions: {
        async emailVerify (idCredential, verificationCode){
            const response = await axios.put("?controller=validationEmail&action=validateEmailVerificationCode",{
                id: idCredential,
                verification_code: verificationCode
            })
            this.isEmailValid = response.data.data;
        }
    }
})