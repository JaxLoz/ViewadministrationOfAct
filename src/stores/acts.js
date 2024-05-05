import { defineStore } from "pinia";
import axios from "@/axios";

export const useActsStore = defineStore("acts", {

    state: () => ({
        acts : null,
        actIdInserted: null,
        meetingInserted: null,
        idMeetingAndAct: null
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
        }
    }
});