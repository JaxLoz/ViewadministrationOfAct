import { defineStore } from "pinia";
import axios from "@/axios";
import {reactive} from "vue";

export const useActsStore = defineStore("acts", {

    state: () => ({
        acts : null,
        actIdInserted: null,
        meetingInserted: null,
        idMeetingAndAct: null,
        updateInfoActAndMeeting: null,
        actionButtonUpdate: false
    }),

    actions: {
        async createAct(data){
            const responseAct = await axios.post("?controller=act&action=createAct" , {
                progress: data.progress,
                id_user: data.id_user
            });

            this.actIdInserted = responseAct.data.data.id;
            return responseAct.data.data.id;
        },

        async createMeeting(data){
            const responseMeeting = await axios.post("?controller=meeting&action=createMeeting",{
                title: data.title,
                place: data.place,
                star_time: data.start_time,
                star_date: data.start_date
            })
            this.meetingInserted = responseMeeting.data.data.id;
            return responseMeeting.data.data.id;
        },

        async relationMeetingAndAct (idAct, idMeeting){
            const responseRelation = await axios.post("?controller=meetAndAct&action=createMeetAndAct",{
              id_meeting: idMeeting,
              id_act: idAct  
            })
            console.log("id de la relacion de act y meeting " + responseRelation)
        },

        async getAllInfoActs(idUser){
            const responseActs = await axios.get("?controller=act&action=getAllInfoActsByUser&id="+idUser);
            console.log(responseActs);
            this.acts = responseActs.data.data;
        },

        loadInfoForUpdateToSessionStorage(actMeetingObjet){
          
            const infoForUpdate = {
                activeButtonUpdate: true,
                infToUpdate: actMeetingObjet
            }
            sessionStorage.setItem("infoActToUpdate", JSON.stringify(infoForUpdate))
            console.log(actMeetingObjet);
        },

        async updateInfoAct(infoActUpdate){
            const responseUpdate = await axios.put("?controller=act&action=updateAct",{
                id: this.updateInfoActAndMeeting.id_act,
                progress: infoActUpdate.progress
            })
            console.log("ejecutando la actualizacion de act")
            console.log(responseUpdate)
        },

        async updateInfoMeeting (infoMeetingUpdate){
            const responseUpdate = await axios.put("?controller=meeting&action=updateMeeting",{
                id: this.updateInfoActAndMeeting.id_meeting,
                title: infoMeetingUpdate.title,
                place: infoMeetingUpdate.place,
                star_time: infoMeetingUpdate.start_time,
                star_date: infoMeetingUpdate.start_date
            })
            console.log("ejecutano la actualziacin de meeting")
            console.log(responseUpdate);
        }
    }
});