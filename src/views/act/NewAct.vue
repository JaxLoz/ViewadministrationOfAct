<template>
    <div id="content-infMeeting" class="w-full h-full flex flex-col gap-y-6 font-sans">

        <div id="title-infMeeting" class="w-full flex flex-col items-center gap-y-3">
            <h1 class="mt-5 font-bold text-3xl" >Meeting information</h1>
            <div id="infoAuthor" class="flex flex-row items-center gap-x-1">
            <span class="text-xs text-gray-500">created by</span>
            <span class="text-sm text-gray-500 hover:underline hover:decoration-2 hover:decoration-indigo-500">{{ nameAuthor }}</span>
            </div>
        </div>

        <div id="content-form" class="w-full h-full flex flex-col items-center">
            <div id="contentform-infMeeting" class="w-full flex flex-col" >

                <form id="form-infMeeting" @submit.prevent="submit" class="w-full h-full">
                    <div class="grid grid-rows-2 grid-cols-2 gap-y-8 justify-items-center">
                        
                        <div class="flex flex-col gap-y-2" >
                            <label class="block" for="title">Name of de meeting</label>
                            <input v-model="infoNewAct.title" type="text" id="title" name="title" class="h-9 w-80 py-2 px-2 rounded-md ring-inset ring-1 ring-gray-300 focus:ring-inset focus:ring-2 focus:ring-[#4f46e5] outline-none" required>
                        </div>

                        <div class="flex flex-col gap-y-2">
                            <label class="block" for="place">Place</label>
                            <input v-model="infoNewAct.place" type="text" id="place" name="place" class="h-9 w-80 py-2 px-2 rounded-md ring-inset ring-1 ring-gray-300 focus:ring-inset focus:ring-2 focus:ring-[#4f46e5] outline-none" required>
                        </div>

                        <div class="flex flex-col gap-y-2">
                            <label class="block" for="start-time">Start time</label>
                            <input v-model="infoNewAct.start_time" type="time" id="start-time" name="date" class="h-9 w-80 py-2 px-2 rounded-md ring-inset ring-1 ring-gray-300 focus:ring-inset focus:ring-2 focus:ring-[#4f46e5] outline-none" required>
                        </div>

                        <div class="flex flex-col gap-y-2">
                            <label class="block" for="start-date">Start date</label>
                            <input v-model="infoNewAct.start_date" type="date" id="start-date" name="date" class="h-9 w-80 py-2 px-2 rounded-md ring-inset ring-1 ring-gray-300 focus:ring-inset focus:ring-2 focus:ring-[#4f46e5] outline-none" required>
                        </div>
                    </div>

                    <div id="content-check" class="flex flex-row-reverse justify-end gap-x-2 mx-16 mt-5" v-if="!useAct.actionButtonUpdate">
                        <label class="" for="progress">Add act</label>
                        <input type="checkbox" v-model="addAct">
                    </div> 
                    
                    <createAct v-if="useAct.actionButtonUpdate || !useAct.actionButtonUpdate && addAct" v-model="infoNewAct.progress" />

                    <div id="invitations-section" class="mt-8 mx-16">
                        <h2 class="text-xl font-semibold mb-4">Invitations</h2>
                        <search />
                        <div>
                            <h3 class="font-semibold mb-2">Invited People:</h3>
                            <ul class="bg-gray-100 rounded-md p-2">
                                <li v-if="invitationStore.invitations.length === 0">
                                    <span class="text-gray-500">No people invited yet</span>
                                </li>
                                <li v-else-if="invitationStore.invitations.length > 0"
                                v-for="guest in invitationStore.invitations"
                                :key="guest.id"
                                class="flex justify-between items-center py-1 px-5">
                                    <span>{{ guest.firstname+' '+guest.lastname }}</span>
                                    <span>{{ guest.email }}</span>
                                    <button @click="deleteGuest(guest)" class="text-red-500 hover:underline">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#6b7280" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" class="icon icon-tabler icons-tabler-outline icon-tabler-trash hover:stroke-red-500">
                                            <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                                            <path d="M4 7l16 0"/>
                                            <path d="M10 11l0 6"/>
                                            <path d="M14 11l0 6"/>
                                            <path d="M5 7l1 12a2 2 0 0 0 2 2h8a2 2 0 0 0 2 -2l1 -12"/>
                                            <path d="M9 7v-3a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v3"/>
                                        </svg>
                                    </button>
                                </li>
                            </ul>
                        </div>
                    </div>

                    <div id="button-content" class="flex flex-row justify-end mx-16 gap-x-5 mt-8">
                        <input class="bg-[#4f46e5] hover:bg-[#6366f1] text-white font-medium py-2 px-5  rounded-md" id="button-save" type="submit" value="Save">
                        <button class="bg-[#c83e3e] hover:bg-[#f06363] text-white font-medium py-2 px-5  rounded-md" id="button-cancel" @click.prevent="cancel()">Cancel</button>
                    </div>
                </form>
            </div>

        </div>

    </div>
</template>

<script setup>
import { useSessionStore } from "@/stores/session.js";
import { useActsStore } from "@/stores/acts.js";
import { useUserStore } from "@/stores/user";
import { useInvitationStore } from "@/stores/invitation.js";
import { computed,onBeforeUnmount, onMounted, ref } from "vue";
import router from "@/router/index.js";
import createAct from "@/components/createAct.vue";
import search from "@/components/search.vue";


const session = useSessionStore();
const useAct = useActsStore();
const userStore = useUserStore();
const invitationStore = useInvitationStore();

const nameAuthor = computed(() => session.firstname + " " + session.lastname);
const addAct = ref(false);

const infoNewAct = ref({
    id_user: useSessionStore().IdUser,
    title: "",
    place: "",
    start_time: "",
    start_date: "",
    progress: ""
})

session.loadInfoSessionOfSessionStorage();

const deleteGuest = (guest) => {
    invitationStore.deletePersonInvited(guest);
}

const submit = async () => {
    
    // su esta en modo actualizar
        if(useAct.actionButtonUpdate){
            
            if (infoNewAct.value.title != useAct.updateInfoActAndMeeting.title 
                || infoNewAct.value.place != useAct.updateInfoActAndMeeting.place 
                || infoNewAct.value.start_time != useAct.updateInfoActAndMeeting.star_time 
                || infoNewAct.value.start_date != useAct.updateInfoActAndMeeting.star_date 
                || infoNewAct.value.progress != useAct.updateInfoActAndMeeting.progress) {

                console.log("Se actualizaran los campos meeting");
                useAct.updateInfoMeeting(infoNewAct.value);
            }
            
            if(infoNewAct.value.progress != useAct.updateInfoActAndMeeting.progress && useAct.updateInfoActAndMeeting.id_act != undefined){
                console.log("Se actualizaran los campos de actas");
                useAct.updateInfoAct(infoNewAct.value);
            }
            
            if("id_act" in useAct.updateInfoActAndMeeting === false){
                const idNewAct = await useAct.createAct(infoNewAct.value);
                console.log("se creo el acta con el id: "+idNewAct);
                useAct.relationMeetingAndAct(idNewAct, useAct.updateInfoActAndMeeting.id);
                console.log("el acta deberia de crearse y relacionarse ya que no esta creada para esta reunion");
            }
            console.log("presionando el pt boton de update en NewActa.vue")
            

        }else{ // si esta en modo crear
            
            console.log("presionando el pt boton de save en NewActa.vue")
            
            const idMeetingCreated = await useAct.createMeeting(infoNewAct.value);
            console.log("se creo la reunion con el id: "+ idMeetingCreated);

            if(invitationStore.invitations.length > 0 && idMeetingCreated != undefined){
                invitationStore.insertInvitations(idMeetingCreated);
            }
            
            if(addAct.value){
                const idActCreated = await useAct.createAct(infoNewAct.value);
                console.log("se creo el acta con el id: "+idActCreated);   
                
                const relationMeetingAndAct = await useAct.relationMeetingAndAct(idActCreated, idMeetingCreated);
            }

        }
}

const cancel = () =>{
    router.push({name: "adminActs"});
}

onBeforeUnmount( () =>{
    useAct.$reset(); // reseteamos los valores del state de del store useActStore cuando antes que el compoente se desmonte de la intancia vue
    const existInfoToUpate = sessionStorage.getItem("infoActToUpdate");
    
    if(existInfoToUpate != null){
        sessionStorage.removeItem("infoActToUpdate");
    }
});


/* verificamos al montar el componente si existe informacion para actualizar, o sea, si se monto el componente para actualziarlo
o para recar un acta nuevo. Si es para actualizar al momento el evento del boton actuazliar de home.vue debio crear una item en 
sessionStorage que contenga esa informacion a actualizar para cargarla en el state de useActStore. En caso de que se haya montado 
para crear entonces no debe haber ese item en el sessionStorage  y se carga la pagina con esl state en null lista para crear una nueva
acta*/

onMounted( () =>{
    userStore.getUsers();
    const existInfoToUpate = sessionStorage.getItem("infoActToUpdate");
    
    if(existInfoToUpate != null){
        const infoActToUpdate = JSON.parse(existInfoToUpate);
        useAct.updateInfoActAndMeeting = infoActToUpdate.infToUpdate;
        useAct.actionButtonUpdate = true;

        // carga de datos a los impusts del formulario
        infoNewAct.value.title = useAct.updateInfoActAndMeeting.title;
        infoNewAct.value.place = useAct.updateInfoActAndMeeting.place;
        infoNewAct.value.start_time = useAct.updateInfoActAndMeeting.star_time;
        infoNewAct.value.start_date = useAct.updateInfoActAndMeeting.star_date;
        infoNewAct.value.progress = useAct.updateInfoActAndMeeting.progress;
    }

});
</script>