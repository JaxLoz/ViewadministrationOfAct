<template>
     <form @submit.prevent="submit">
    <label for="primerNombre">Primer Nombre:</label>
    <input v-model="formRegister.firstname" type="text" id="primerNombre" name="primerNombre" required><br><br>

    <label for="segundoNombre">Segundo Nombre:</label>
    <input v-model="formRegister.lastname" type="text" id="segundoNombre" name="segundoNombre"><br><br>

    <label for="telefono">Teléfono:</label>
    <input v-model="formRegister.phone" type="tel" id="telefono" name="telefono" pattern="[0-9]{10}" required><br><br>

    <label for="email">Email:</label>
    <input v-model="formRegister.email" type="email" id="email" name="email"><br><br>

    <label for="password">Password:</label>
    <input v-model="formRegister.user_password" type="password" id="password" name="password" required><br><br>

    <label for="rol">Rol:</label>

    <select v-model="formRegister.id_rol" id="rol" name="rol" required>
      <option value="2">Host</option>
      <option value="3">Publisher</option>
      <option value="1">Default</option>
    </select><br><br>

    <input type="submit" value="Registrarse">
  </form>
</template>
<script setup>
import { useAuthStore } from "@/stores/auth.js"
import {ref} from "vue"


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
    }
</script>