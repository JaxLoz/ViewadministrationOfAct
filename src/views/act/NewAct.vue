<template>
    <div id="content-infMeeting" class="content-wrapper max-w-4xl mx-auto pt-16 pb-12 font-sans">
      <div id="title-infMeeting" class="text-center mb-10">
        <h1 class="text-3xl font-bold text-gray-800">Meeting Information</h1>
        <div id="infoAuthor" class="mt-2 text-sm text-gray-500">
          <span>Created by </span>
          <span class="font-medium hover:text-indigo-600 cursor-pointer">{{ nameAuthor }}</span>
        </div>
      </div>
  
      <form id="form-infMeeting" @submit.prevent="submit" class="space-y-8">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div class="space-y-2">
            <label class="block text-sm font-medium text-gray-700" for="title">Name of the meeting</label>
            <input v-model="infoNewAct.title" type="text" id="title" name="title" class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500">
          </div>
          <div class="space-y-2">
            <label class="block text-sm font-medium text-gray-700" for="place">Place</label>
            <input v-model="infoNewAct.place" type="text" id="place" name="place" class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500">
          </div>
          <div class="space-y-2">
            <label class="block text-sm font-medium text-gray-700" for="start-time">Start time</label>
            <input v-model="infoNewAct.start_time" type="time" id="start-time" name="start-time" class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500">
          </div>
          <div class="space-y-2">
            <label class="block text-sm font-medium text-gray-700" for="start-date">Start date</label>
            <input v-model="infoNewAct.start_date" type="date" id="start-date" name="start-date" class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500">
          </div>
        </div>
  
        <div v-if="!useAct.actionButtonUpdate" class="flex items-center justify-end space-x-2">
          <input type="checkbox" v-model="addAct" id="add-act" class="rounded text-indigo-600 focus:ring-indigo-500">
          <label for="add-act" class="text-sm font-medium text-gray-700">Add act</label>
        </div>
  
        <createAct v-if="useAct.actionButtonUpdate || (!useAct.actionButtonUpdate && addAct)" v-model="infoNewAct.progress" />
  
        <div id="invitations-section" class="space-y-6">
          <h2 class="text-2xl font-semibold text-gray-800">Invitations</h2>
          <search />
          
          <div v-if="invitationStore.invitations.length > 0" class="bg-white shadow overflow-hidden sm:rounded-md">
            <h3 class="px-4 py-3 bg-gray-50 text-sm font-medium text-gray-700">Invitations:</h3>
            <ul class="divide-y divide-gray-200">
              <li v-for="guest in invitationStore.invitations" :key="guest.id" class="flex items-center justify-between px-4 py-3 hover:bg-gray-50">
                <div>
                  <p class="text-sm font-medium text-gray-900">{{ guest.firstname + ' ' + guest.lastname }}</p>
                  <p class="text-sm text-gray-500">{{ guest.email }}</p>
                </div>
                <button @click="deleteGuest(guest)" class="text-red-600 hover:text-red-800">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fill-rule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clip-rule="evenodd" />
                  </svg>
                </button>
              </li>
            </ul>
          </div>
  
          <div v-if="useAct.actionButtonUpdate" class="bg-white shadow overflow-hidden sm:rounded-md">
            <h3 class="px-4 py-3 bg-gray-50 text-sm font-medium text-gray-700">Guest list:</h3>
            <ul v-if="invitationStore.infoGuests.length > 0" class="divide-y divide-gray-200">
              <li v-for="guest in invitationStore.infoGuests" :key="guest.id" class="flex items-center justify-between px-4 py-3">
                <div>
                  <p class="text-sm font-medium text-gray-900">{{ guest.firstname + ' ' + guest.lastname }}</p>
                  <p class="text-sm text-gray-500">{{ guest.email }}</p>
                </div>
                <span :class="guest.assistance == 1 ? 'text-green-600' : 'text-red-600'" class="text-sm font-medium">
                  {{ guest.assistance == 1 ? 'Invitation accepted' : 'Invitation not accepted' }}
                </span>
              </li>
            </ul>
            <p v-else class="px-4 py-3 text-sm text-gray-500">There are no requests for invitations</p>
          </div>
        </div>
  
        <div class="flex justify-end space-x-4">
          <button type="submit" class="px-4 py-2 bg-indigo-600 text-white font-medium rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
            Save
          </button>
          <button @click.prevent="cancel()" class="px-4 py-2 bg-red-600 text-white font-medium rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500">
            Cancel
          </button>
        </div>
      </form>
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
import { info } from "autoprefixer";


const session = useSessionStore();
const useAct = useActsStore();
const userStore = useUserStore();
const invitationStore = useInvitationStore();
const infoMeetingUpdate = computed(() => useAct.updateInfoActAndMeeting);

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

            if(invitationStore.invitations.length > 0 && useAct.updateInfoActAndMeeting.id_meeting != undefined){
                const idInvitation = await invitationStore.insertInvitations(useAct.updateInfoActAndMeeting.id_meeting);
                console.log("se insertaron las invitaciones con el id: "+idInvitation);
                const sendEmailsInvitations = await invitationStore.sendInvitations(idInvitation)
                console.log("Correo enviado: "+sendEmailsInvitations);
            }

            console.log("presionando el pt boton de update en NewActa.vue")
            invitationStore.cleanInvitationsInfoStore();

        }else{ // si esta en modo crear
            
            console.log("presionando el pt boton de save en NewActa.vue")
            
            const idMeetingCreated = await useAct.createMeeting(infoNewAct.value);
            console.log("se creo la reunion con el id: "+ idMeetingCreated);

            if(invitationStore.invitations.length > 0 && idMeetingCreated != undefined){
                const idInvitation = await invitationStore.insertInvitations(idMeetingCreated);
                console.log("se insertaron las invitaciones con el id: "+idInvitation);
                const sendEmailsInvitations = await invitationStore.sendInvitations(idInvitation)
                console.log("Correo enviado: "+sendEmailsInvitations);
            }
            
            if(addAct.value){
                const idActCreated = await useAct.createAct(infoNewAct.value);
                console.log("se creo el acta con el id: "+idActCreated);   
                
                const relationMeetingAndAct = await useAct.relationMeetingAndAct(idActCreated, idMeetingCreated);
            }

            invitationStore.cleanInvitationsInfoStore();
        }
}

const cancel = () =>{
    router.push({name: "adminActs"});
    invitationStore.cleanInvitationsInfoStore();
}

onBeforeUnmount( () =>{
    useAct.$reset(); // reseteamos los valores del state de del store useActStore cuando antes que el compoente se desmonte de la intancia vue
    const existInfoToUpate = sessionStorage.getItem("infoActToUpdate");
    
    if(existInfoToUpate != null){
        sessionStorage.removeItem("infoActToUpdate");
    }
});


/* verificamos al montar el componente si existe informacion para actualizar, o sea, si se monto el componente para actualziarlo
o para crar un acta y reunion nuevas. Si es para actualizar al momento el evento del boton actuazliar de home.vue debio crear una item en 
sessionStorage que contenga esa informacion a actualizar para cargarla en el state de useActStore. En caso de que se haya montado 
para crear entonces no debe haber ese item en el sessionStorage  y se carga la pagina con esl state en null lista para crear una nueva
acta*/

onMounted( async () =>{
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

        // cargar la inforamacio de solicitudes de invitacin enviadas
        await invitationStore.getInfoGuests(useAct.updateInfoActAndMeeting.id_meeting); 
    }

});
</script>