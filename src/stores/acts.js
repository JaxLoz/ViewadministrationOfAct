import { defineStore } from "pinia";
import axios from "@/axios";
import {useAxios} from "@/composables/useAxios";

export const useActsStore = defineStore("acts", {

    state: () => ({
        acts : null,
        actIdInserted: null,
        meetingInserted: null,
        idMeetingAndAct: null,
        updateInfoActAndMeeting: [],
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

        // metodo que se encarga de obtener la informacion de las reuniones y actos de un usuario
        async getAllInfoActs(idUser){
            console.log(idUser)
            const meetingWithAct = await this.getMeetingWithActs(idUser);
            const meetingWithOutAct = await this.getMeetingWithOutAct(idUser);
            const allMeetings = meetingWithOutAct.concat(meetingWithAct);
            
            this.acts = allMeetings; 

            //const responseActs = await axios.get("?controller=act&action=getAllInfoActsByUser&id="+idUser);
            //this.acts = responseActs.data.data;
        },

        async getMeetingWithOutAct(idUser){
            try{
                const responseMeetingWithOutAct = await useAxios().get("?controller=meeting&action=getMeetingsWithOutActs&id="+idUser);
                console.log(responseMeetingWithOutAct.data.data)
                return responseMeetingWithOutAct.data.data;
            }catch{
            }
        },

        async getMeetingWithActs(idUser){
            try{
                const responseActs = await useAxios().get("?controller=act&action=getAllInfoActsByUser&id="+idUser);
                console.log(responseActs.data.data)
                return responseActs.data.data;
            }catch{
                
            }

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
        },

        async deleteActAndMeeting(infoForDelete){
            // para el caso en el que haya un acta en la reunion
            if(infoForDelete.id_act === undefined || infoForDelete.id_meeting === undefined){
                const responseMeetinDelete = await this.deleteMeeting(infoForDelete.id);
                if(responseMeetinDelete){
                    console.log("se elimino la reunion correctamente")
                }
            // para el caso en el que no haya un acta en la reunion
            }else if ("id_act" in infoForDelete || "id_meeting" in infoForDelete) {
                
                const responseActandMeetinDelete = await axios.delete("?controller=meetAndAct&action=removeMeetAndActByIds&idAct="+infoForDelete.id_act+"&idMeeting="+infoForDelete.id_meeting);
                
                if(responseActandMeetinDelete.data.data == true){
                    console.log("se elimino correctamente la relacion de act y meeting")
                    await this.deleteAct(infoForDelete.id_act);
                    await this.deleteMeeting(infoForDelete.id_meeting);
                }
            } 

        },

        async deleteMeeting(infoMeetingDelete){
            const responseMeetingDelete = await axios.delete("?controller=meeting&action=removeMeeting&id="+infoMeetingDelete);
            return responseMeetingDelete.data;
        },

        async deleteAct(infoActDelete){
            const responseActDelete = await axios.delete("?controller=act&action=removeAct&id="+infoActDelete);
        }
    }
});