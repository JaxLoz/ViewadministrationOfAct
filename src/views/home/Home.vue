<template>
        <div id="content-resumeActs" class="content-wrapper pt-16 h-full flex flex-col items-center gap-y-5">
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
import { computed, onMounted, ref } from "vue";


import { useSessionStore } from "@/stores/session.js";
import { useActsStore} from "@/stores/acts.js";
import { useNotificationStore } from "@/stores/notification";
import { useInvitationStore } from "@/stores/invitation";
import { useCommitmentStore } from "@/stores/commitment";

const thereIsAct = ref(null);

const session = useSessionStore();
const act = useActsStore();
const notification = useNotificationStore();
const invitation = useInvitationStore();
const commitment = useCommitmentStore();

session.loadInfoSessionOfSessionStorage();
const email = computed(() => session.email);

const createNewAct = () => {
    router.push({name: 'createNewAct'});
}

onMounted( async () =>{
        console.log(session.IdUser)
        await act.getAllInfoActs(session.IdUser);
        notification.getNotificationOfInvitations(email.value);
    }  
);

const updatePage = (actMeetingInfo) =>{
    act.loadInfoForUpdateToSessionStorage(actMeetingInfo);
    router.push({name: 'createNewAct'})
}

const deleteAct = async (actMeetingInfo) =>{
    console.log(actMeetingInfo)
    await commitment.deleteCommitment(actMeetingInfo.id_act);
    await invitation.deleteInvitationByMeetingId(actMeetingInfo.id_meeting);
    await act.deleteActAndMeeting(actMeetingInfo);
    await act.getAllInfoActs(session.IdUser);
} 

const logOut = () =>{
    router.push({name: 'formLogin'})
}

</script>