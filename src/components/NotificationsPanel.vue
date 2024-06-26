<template>
    <Teleport to="body">
        <div class="absolute top-16 right-4 bg-white shadow-lg rounded-lg p-4 w-90">
          <h3 class="text-lg font-semibold mb-2">Notificaciones</h3>
          <div>
            <MeetingNotification 
            v-if="notification.NotificationOfInvitation.length > 0"
            v-for="invitation in notification.NotificationOfInvitation"
            :key="invitation.id_invitation"
            :meetingName="invitation.title"
            :meetingPlace="invitation.place"
            :meetingDate="invitation.star_date"
            :meetingTime="invitation.star_time"
            @acceptMeeting="acceptMeetingInvitation(invitation.id_invitation)"
            @rejectMeeting="rejectMeetingInvitation(invitation.id_invitation)"
            />
          </div>
        </div>
    </Teleport>
</template>
<script setup>
import MeetingNotification from '@/components/MeetingNotification.vue';
import { useNotificationStore } from '@/stores/notification';
import { useInvitationStore } from '@/stores/invitation';

const notification = useNotificationStore();
const invitation = useInvitationStore();

const acceptMeetingInvitation = (idInvitation) =>{
    invitation.confirmInvitation(idInvitation);
    notification.removeNotificationInvitation(idInvitation);
}

const rejectMeetingInvitation = (idInvitation) =>{
    notification.removeNotificationInvitation(idInvitation);
}


</script>