<template>
  <div class="bg-[#f9fafb] h-screen flex flex-col items-center justify-center" >
    <div class="bg-white px-8 pt-10 pb-5 drop-shadow-lg rounded-md flex flex-col items-center justify-center gap-y-5" >
      
      <div class="text-center flex flex-col gap-y-2">
        <h1 class="block text-3xl font-semibold" >Register</h1>
        <p class="block text-sm text-gray-500" >get your account</p>
      </div>
    
      <div>  
      <form @submit.prevent="submit" class="flex flex-col justify-center content-center">
        <div class="flex flex-col h-20">
          <label class="text-base font-medium text-gray-900" for="primerNombre">Primer Nombre:</label>
          <input class="h-9 w-80 py-2 px-2 rounded-md ring-inset ring-1 ring-gray-300 focus:ring-inset focus:ring-2 focus:ring-[#4f46e5] outline-none" v-model="formRegister.firstname" type="text" id="primerNombre" name="primerNombre" required><br><br>
        </div>
        
        <div class="flex flex-col gap-y-2 h-20">
        <label class="text-base font-medium text-gray-900" for="segundoNombre">Segundo Nombre:</label>
        <input class="h-9 w-80 py-2 px-2 rounded-md ring-inset ring-1 ring-gray-300 focus:ring-inset focus:ring-2 focus:ring-[#4f46e5] outline-none" v-model="formRegister.lastname" type="text" id="segundoNombre" name="segundoNombre"><br><br>
        </div>

        <div class="flex flex-col gap-y-2 h-20">
        <label class="text-base font-medium text-gray-900" for="telefono">Teléfono:</label>
        <input class="h-9 w-80 py-2 px-2 rounded-md ring-inset ring-1 ring-gray-300 focus:ring-inset focus:ring-2 focus:ring-[#4f46e5] outline-none" v-model="formRegister.phone" type="tel" id="telefono" name="telefono" pattern="[0-9]{10}" required><br><br>
        </div>
        
        <div class="flex flex-col gap-y-2 h-20">
          <label class="text-base font-medium text-gray-900" for="email">Email:</label>
          <input class="h-9 w-80 py-2 px-2 rounded-md ring-inset ring-1 ring-gray-300 focus:ring-inset focus:ring-2 focus:ring-[#4f46e5] outline-none" v-model="formRegister.email" type="email" id="email" name="email"><br><br>
        </div>
        
        <div class="flex flex-col gap-y-2 h-20">
          <label class="text-base font-medium text-gray-900" for="password">Password:</label>
          <input class="h-9 w-80 py-2 px-2 rounded-md ring-inset ring-1 ring-gray-300 focus:ring-inset focus:ring-2 focus:ring-[#4f46e5] outline-none" v-model="formRegister.user_password" type="password" id="password" name="password" required><br><br>
        </div>
        
        <div class="flex flex-col gap-y-2 h-20">
        <label class="text-base font-medium text-gray-900" for="rol">Rol:</label>
        
        <select class=" h-9 w-80 py-1 px-2 rounded-md ring-inset ring-1 ring-gray-300 focus:ring-inset focus:ring-2 focus:ring-[#4f46e5] outline-none" v-model="formRegister.id_rol" id="rol" name="rol" required placeholder="Select rol">
          <option value="2">Host</option>
          <option value="3">Publisher</option>
          <option value="1">Default</option>
        </select><br><br>
        </div>

        <div class="mb-4">
          <input class="bg-[#4f46e5] hover:bg-[#6366f1] text-white font-medium py-1.5 px-5 w-80 rounded-md" type="submit" value="Register">
        </div>

        <div class="flex flex-row justify-center items-center gap-x-1" >
          <p class="block text-sm text-gray-500" >Already have an account?</p>
          <router-link to="/login" class="block font-semibold text-[#4339ff] hover:text-[#6366f1]" >Login</router-link>
        </div>
      </form>
  </div>
  </div>
  </div>
  </template>
<script setup>
import { useAuthStore } from "@/stores/auth.js"
import {ref} from "vue"
import router from "@/router/index.js"


const auth = useAuthStore();

    const formRegister = ref({
        firstname: "",
        lastname: "",
        phone: "",
        id_rol: 0,
        id_credential: 0,
        email: "",
        user_password: ""
    })

    const submit = () => {
        auth.registro(formRegister.value);
        router.push({name: 'formLogin'});
    }
</script>