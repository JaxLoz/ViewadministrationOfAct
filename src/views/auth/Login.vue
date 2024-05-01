<template>
    <div class="bg-[#f9fafb] flex flex-col h-screen items-center justify-center font-sans">
        
        <form class="px-8 py-5 bg-white rounded-md flex flex-col gap-y-4 drop-shadow-lg" submit.prevent="login">
            <div class="text-center">
                <h1 class="text-3xl mb-5" >Login</h1>
            </div>    
            <div class="flex flex-col gap-y-2">
                <label class="text-base font-medium text-gray-900" for="email">Email</label>
                <input class="h-9 w-80 py-2 px-2 rounded-md ring-inset ring-1 ring-gray-300 focus:ring-inset focus:ring-2 focus:ring-[#4f46e5] outline-none" type="email" id="email" v-model="formLogin.email" required>
            </div>

            <div class="flex flex-col gap-y-2">
                <label class="text-base font-medium text-gray-900" for="password">Password</label>
                <input class="h-9 w-80 py-1.5 px-1.5 rounded-md ring-inset ring-1 ring-gray-300 focus:ring-inset focus:ring-2 focus:ring-[#4f46e5] outline-none" type="password" id="password" v-model="formLogin.user_password" required>
            </div>
            <div class="flex flex-row">
            <button class="bg-[#4f46e5] hover:bg-[#6366f1] text-white font-medium py-1.5 px-5 w-80 rounded-md" type="submit">Login</button>
            </div>
            <div class="flex flex-row justify-center gap-x-1" >
            <spam class="block text-sm text-gray-500" >don't have an account yet?</spam>
            <router-link to="/registro" class="block font-semibold text-[#4339ff] hover:text-[#6366f1]" >Register</router-link>
            </div>
        </form>
    </div>
</template>
<script setup>
import { useAuthStore } from "@/stores/auth.js"
import { ref } from "vue"
import router from "@/router/index.js"

const log = useAuthStore();

const formLogin = ref({
    email: "",
    user_password: ""
})

const login = () =>{
    log.loginOfSistem(formLogin.value)
    router.push({name: "adminActs"})
}

</script>

