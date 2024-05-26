<template>
    <div class="flex flex-row justify-between gap-y-5 px-5">
        <h1>Inicios de sesion exitoso {{ userName }}!</h1>
        <button @click="createNewAct">+ New act</button>
        <button @click="logOut">LogOut</button>
    </div class="">
        <div id="content-resumeActs" class="flex flex-col items-center gap-y-5">
            <ResumeAct
            
            v-for="infAct in act.acts" :key="infAct.id ? infAct.id : infAct.id_meeeting"
            :title="infAct.title"
            :author="infAct.firstname+' '+infAct.lastname"
            :date="infAct.star_date"
            :hour="infAct.star_time"
            :place="infAct.place"
            :thereIsMinutes="infAct.id_act != undefined ? true : false"
            @updateInfoAct="updatePage(infAct)"
            @deleteInfoAct="deleteAct(infAct)"
            />
            
        </div>
    <div>
       
    </div>
</template>

<script setup>
import ResumeAct from "@/components/ResumeAct.vue";
import router from "@/router";
import { useStorePrueba } from "@/stores/pruebas.js";
import { useSessionStore } from "@/stores/session.js";
import { useActsStore} from "@/stores/acts.js";
import { computed, onMounted } from "vue";
import { ref } from "vue";

const thereIsAct = ref(null);
const session = useSessionStore();
const act = useActsStore();

session.loadInfoSessionOfSessionStorage();
const userName = computed(() => session.firstname);

const createNewAct = () => {
    router.push({name: 'createNewAct'});
}

onMounted( async () =>{
        console.log(session.IdUser)
        await act.getAllInfoActs(session.IdUser);
    }  
);

const updatePage = (actMeetingInfo) =>{
    act.loadInfoForUpdateToSessionStorage(actMeetingInfo);
    router.push({name: 'createNewAct'})
}

const deleteAct = async (actMeetingInfo) =>{
    console.log(actMeetingInfo)
    await act.deleteActAndMeeting(actMeetingInfo);
    await act.getAllInfoActs(session.IdUser);
    
} 

const logOut = () =>{
    router.push({name: 'formLogin'})
}

</script>