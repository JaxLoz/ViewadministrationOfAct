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
                    <div class="flex flex-col gap-y-2 ">
                        <!--<label class="flex flex-row justify-start ml-10" for="description-act">Description</label>-->
                        <textarea v-model="infoNewAct.progress" id="description-act" name="descriptionAct" class="h-80 my-8 mx-16 rounded-md px-3 py-2 ring-inset ring-1 ring-gray-300 focus:ring-inset focus:ring-2 focus:ring-[#4f46e5] outline-none" placeholder="Escribe aqui la informacion del acta" required></textarea>
                    </div>

                    <div id="button-content" class="flex flex-row justify-end mx-16 gap-x-10">
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
import { computed, ref } from "vue";
import router from "@/router/index.js";
const session = useSessionStore();
session.loadInfoSessionOfSessionStorage();

const nameAuthor = computed(() => session.firstname + " " + session.lastname);
const useAct = useActsStore();

const infoNewAct = ref({
    id_user: useSessionStore().IdUser,
    title: "",
    place: "",
    start_time: "",
    start_date: "",
    progress: ""
})

const submit = async () => {
    console.log("presionando el pt boton de save en NewActa.vue")

        const idActCreated = await useAct.createAct(infoNewAct.value);
        console.log("se creo el acta con el id: "+idActCreated);

        const idMeetingCreated = await useAct.createMeeting(infoNewAct.value);
        console.log("se creo la reunion con el id: "+ idMeetingCreated);

        const relationMeetingAndAct = await useAct.relationMeetingAndAct(idActCreated, idMeetingCreated);
}

const cancel = () =>{
    router.push({name: "adminActs"});
}

</script>