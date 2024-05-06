<template>
    <div>
        <h1>Inicios de sesion exitoso {{ userName }}!</h1>
    </div>
    <div id="content-resumeActs">
        <ResumeAct
        
        v-for="infAct in act.acts" :key="infAct.id"
        :title="infAct.title"
        :author="infAct.firstname+' '+infAct.lastname"
        :date="infAct.star_date"
        :hour="infAct.star_time"
        :place="infAct.place"

        />
    </div>
    <div>
        <button @click="createNewAct">+ New act</button>
    </div>
</template>

<script setup>
import ResumeAct from "@/components/ResumeAct.vue";
import router from "@/router";
import { useStorePrueba } from "@/stores/pruebas.js";
import { useSessionStore } from "@/stores/session.js";
import { useActsStore} from "@/stores/acts.js";
import { computed, onMounted } from "vue";


const session = useSessionStore();
const act = useActsStore();

session.loadInfoSessionOfSessionStorage();
const userName = computed(() => session.firstname);

const createNewAct = () => {
    router.push({name: 'createNewAct'});
}

onMounted( async () =>{
        await act.getAllInfoActs(session.IdUser);
        console.log(act.acts)
    }  
);

</script>