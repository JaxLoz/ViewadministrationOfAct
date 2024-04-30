<template>
    <div>
        <h1>Login</h1>
        <form @submit.prevent="login">
            <div>
                <label for="email">Email:</label>
                <input type="email" id="email" v-model="formLogin.email" required>
            </div>
            <div>
                <label for="password">Password:</label>
                <input type="password" id="password" v-model="formLogin.user_password" required>
            </div>
            <button type="submit">Login</button>
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

