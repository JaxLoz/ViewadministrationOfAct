import { defineStore } from "pinia";
import axios from "@/axios";

export const useInvitationStore = defineStore("invitation", {
    state: () => ({
        invitations: [],
    }),

    actions:{
        savePersonInvited(person){
            const exist = this.invitations.find(invitation => {
                return invitation.id === person.id;
            })
            if(exist === undefined){
                this.invitations.push(person)
            }
        },

        deletePersonInvited(guest){
            const invitationDeleted = this.invitations.findIndex(invitation => {
                return invitation.id === guest.id;
            })
            this.invitations.splice(invitationDeleted, 1)
        },

       async insertInvitations(idMeeting){
          const response = await axios.post("http://localhost:8000/index.php?controller=invitation&action=insertInvitation", {
                assistance: 0,
                id_meeting: idMeeting,
                invitations: this.invitations
            })
            return response.data.data;
       },

       async sendInvitations(idInvitations){
            const response = await axios.post("http://localhost:8000/index.php?controller=invitation&action=sendInvitationsToMail", {
                ids_invitation: idInvitations
            })
            return response.data.data;
       },

       async confirmInvitation(idInvitation){
            const response = await axios.put("http://localhost:8000/index.php?controller=invitation&action=updateInvitation", {
                id: idInvitation,
                assistance: 1
            })
            return response.data.data;
       },

    }


})