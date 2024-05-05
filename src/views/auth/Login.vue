<template>
    <div class="bg-[#f9fafb] flex flex-col h-screen items-center justify-center font-sans">
        
        <form class="px-8 pt-9 pb-5 bg-white rounded-md flex flex-col gap-y-4 drop-shadow-lg" @submit.prevent="login">
            <div class="text-center">
                <h1 class="text-3xl mb-5 font-semibold" >Login</h1>
            </div>    
            <div class="flex flex-col gap-y-2">
                <label class="text-base font-medium text-gray-900" for="email">Email address</label>
                <input class="h-9 w-80 py-2 px-2 rounded-md ring-inset ring-1 ring-gray-300 focus:ring-inset focus:ring-2 focus:ring-[#4f46e5] outline-none invalid:border-pink-500 invalid:text-pink-600
                     focus:invalid:border-pink-500 focus:invalid:ring-pink-500" type="email" id="email" v-model="formLogin.email" required>
            </div>

            <div class="flex flex-col gap-y-2">
                <label class="text-base font-medium text-gray-900" for="password">Password</label>
                <input class="h-9 w-80 py-1.5 px-1.5 rounded-md ring-inset ring-1 ring-gray-300 focus:ring-inset focus:ring-2 focus:ring-[#4f46e5] outline-none" type="password" id="password" v-model="formLogin.user_password" required>
            </div>

            <div class="flex flex-row">
            <button class="bg-[#4f46e5] hover:bg-[#6366f1] text-white font-medium py-1.5 px-5 w-80 rounded-md" type="submit">Login</button>
            </div>
            <div class="flex flex-row justify-center gap-x-1 items-baseline mt-3" >
            <p class="block text-sm text-gray-500" >don't have an account yet?</p>
            <router-link to="/registro" class="block font-semibold text-[#4339ff] hover:text-[#6366f1]" >Register now</router-link>
            </div>
        </form>
    </div>
</template>
<script setup>
import { useAuthStore } from "@/stores/auth.js"
import {useSessionStore} from "@/stores/session.js"
import { ref } from "vue"
import router from "@/router/index.js"

const log = useAuthStore();
const session = useSessionStore();

const formLogin = ref({
    email: "",
    user_password: ""
})

const login = async () =>{
    
    const response = await log.loginOfSistem(formLogin.value)   
        
    if(response === 200){
        session.LoginUser(formLogin.value)
        router.push({name: "adminActs"})
    } 
}

</script>

