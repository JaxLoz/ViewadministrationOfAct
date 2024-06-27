import { defineStore } from "pinia";
import axios from "@/axios";

export const useNotificationStore = defineStore("notification", {
    state: () => ({
        NotificationOfInvitation: [],
        viewNotification: false
    }),

    actions: {
        async getNotificationOfInvitations(email){
            console.log("email: ", email)
            const response = await axios.get("http://localhost:8000/index.php?controller=invitation&action=getInvitationsByCredentials&email="+email)
            console.log(response.data)
            this.NotificationOfInvitation = response.data.data;
       },

       removeNotificationInvitation(idInvitation){
            const notificationDeleted = this.NotificationOfInvitation.findIndex(notification => {
                return notification.id_invitation == idInvitation;
            })

            this.NotificationOfInvitation.splice(notificationDeleted, 1)
        },

       openNotification(){
           this.viewNotification = true;
       },

       closeNotification(){
           this.viewNotification = false;
       }
    }
})