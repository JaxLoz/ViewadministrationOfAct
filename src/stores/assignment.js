import { defineStore } from "pinia";
import axios from "@/axios";

export const useAssignmentStore = defineStore("assigment", {
    state: () => ({
        assigments: [],
        infoCommitment: null,
        showAssigmentModal: false
    }),

    actions: {

        saveInfoCommitmentCurrent(commitment){
            this.infoCommitment = commitment;
        },

        saveAssigment(user){
            const exist = this.assigments.find(assigment => {
                assigment.id = user.id;
            })

            if(exist === undefined){
                this.assigments.push(user);
            }
        },

        deleteAssigment(user){
            const assigmentDeleted = this.assigments.findIndex(assigment => {
                return assigment.id == user.id;
            })
            this.assigments.splice(assigmentDeleted, 1);
        },

        enableAssigmentModal(){
            this.showAssigmentModal = true;
        },

        disableAssigmentModal(){
            this.showAssigmentModal = false;
        },
    }
    
})