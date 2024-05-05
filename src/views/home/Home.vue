<template>
    <div>
        <h1>Inicios de sesion exitoso {{ userName }}!</h1>
    </div>
    <div>
        <button @click="createNewAct">+ New act</button>
    </div>
</template>
<script setup>
import router from "@/router";
import { useStorePrueba } from "@/stores/pruebas.js";
import { useSessionStore } from "@/stores/session.js";
import { computed } from "vue";


const session = useSessionStore();

session.loadInfoSessionOfSessionStorage();
const userName = computed(() => session.firstname);

const createNewAct = () => {
    router.push({name: 'createNewAct'});
}
</script>