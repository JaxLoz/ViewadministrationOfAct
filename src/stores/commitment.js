import { defineStore } from "pinia";
import axios from "@/axios";

export const useCommitmentStore = defineStore("commitment", {

    state: () => ({
        commiments: [],
        commimmentsPrepared: [],
        commitmentUpdate: null,
        commitmentForUpdate: null,
        updateMode: false
    }),

    actions:{

        async insertCommitment(){
            const commitmentsForInsert = this.commimmentsPrepared.map(commitment => {
                const {manager, ...commitmentData} = commitment; // desestructuramos el array de commimmentsPrepared para obtener solo los datos necesarios para la base de datos
                return commitmentData;
            });
             
            const response = await axios.post("http://localhost:8000/index.php?controller=commiment&action=insertCommitment", {
                commitments: commitmentsForInsert
            })
            return response.data.data;
        },
        
        async inserteRelationCommitmentAndAct(idActa, idCommitments){
            const response = await axios.post("http://localhost:8000/index.php?controller=actOnCommit&action=insertActAndCommitment", {
                idActa: idActa,
                idCommitments: idCommitments
            })
            return response.data.data;
        },

        async insertRelationCredentialAndCommitment(idsCommitment){
            const managers = this.commimmentsPrepared.map(commitment => {
                return commitment.manager
            })
            console.log(managers);
            const response = await axios.post("http://localhost:8000/index.php?controller=cretAndCommit&action=insertCredentialAndCommitment", {
                idsCommitment: idsCommitment,
                infManagers: managers
            })
            return response.data.data;
        },

        async getCommitmentsByIdAct(idAct){
            const response = await axios.get("http://localhost:8000/index.php?controller=commiment&action=getActCommitments&idAct="+idAct);
            console.log(response.data.data);
            return response.data.data;
        },

        async deleteCommitment(idAct){
            const commitmentsOfAct = await this.getCommitmentsByIdAct(idAct);
            console.log(commitmentsOfAct);
            commitmentsOfAct.forEach(async commitment => {
                console.log(commitment.id);
                const response = await axios.delete("http://localhost:8000/index.php?controller=commiment&action=removeCommitmentByIdAct&id="+commitment.id);
                console.log(response.data.data);
            })
        },

        async getManagersByIdCommitment(infCommitment){
            const Ids = infCommitment.map(commitment => commitment.id);
            const response = await axios.post("http://localhost:8000/index.php?controller=cretAndCommit&action=getManagerByIdCredential",{
                idsCommitment: Ids
            });
            console.log(response.data.data);
            return response.data.data;
        },

        async updateStatusCommitment(){
            const idsCommitment = this.commiments.map(commitment => commitment.id);
            const infStatuses = this.commiments.map(commitment => commitment.status);
            const response = await axios.put("http://localhost:8000/index.php?controller=commiment&action=updateCommitment", {
                ids: idsCommitment,
                statuses: infStatuses
            })
            console.log(response.data.data);
        },

        buildingStructureCommitmentAndSave(commitments, Infmanagers){
            const commitmentsMade = commitments.map(commitment => {
                commitment.manager = Infmanagers.managers.flatMap(element => 
                    element.filter(manager => manager.id_commitment == commitment.id)
                );
                return commitment;
            });
            console.log(commitmentsMade);
            this.commiments = commitmentsMade;
        },

        // se arma el objeto listo para la base de datos y se gurda en el array de commimmentsPreparede
        saveCommimentPrepared(title, description){
            
            if(this.commimmentsPrepared.length === 0){
                this.commimmentsPrepared.push({
                    id: 0, // id que servira para saber la posicion del objeto en el array sin tener que usar metodos sobre el array para obtenerla (es irrelevante para la base de datos)
                    name: title,
                    status: 0,
                    description: description,
                    manager: []
                })
            }else {

                const lastId = this.commimmentsPrepared[this.commimmentsPrepared.length -1].id;
                this.commimmentsPrepared.push({
                    id: lastId + 1,
                    name: title,
                    status: 0,
                    description: description,
                    manager: []
                })
            }
        },

        deleteCommimentPrepared(idCommitmentPrepared){
            const commitmentDeleted = this.commimmentsPrepared.findIndex(commitment => {
                return commitment.id == idCommitmentPrepared; 
            })
            this.commimmentsPrepared.splice(commitmentDeleted, 1);
        },

        loadUpdateCommitmentPrepared(idCommitmentPrepared){
            const infoCommitmentUpdated = this.commimmentsPrepared.find(commitment => {
                return commitment.id == idCommitmentPrepared
            })
            this.commitmentUpdate = infoCommitmentUpdated;
        },

        updateCommitmentPrepared(newTitle, newDescription){
            const idCommitmentUpdated = this.commimmentsPrepared.findIndex(commitment => {
                return commitment.id == this.commitmentUpdate.id;
            })

            this.commimmentsPrepared[idCommitmentUpdated].name = newTitle;
            this.commimmentsPrepared[idCommitmentUpdated].description = newDescription;
            this.commitmentUpdate = null;
            this.disableCommitmentUpdateMode();
        },

        updateCommitmentPreparedCancel(){
            this.commitmentUpdate = null;
            this.disableCommitmentUpdateMode();
        },

        saveManagerCommitmentPrepared(idCommitmentPrepared, manager){
            
            this.commimmentsPrepared[idCommitmentPrepared].manager.push(manager);
            console.log(this.commimmentsPrepared[idCommitmentPrepared]);
        },

        enableCommitmentUpdateMode(){
            this.updateMode = true;
        },

        saveCommitmetForUpdate(infoCommitment){
            this.commitmentForUpdate = infoCommitment;
        },

        disableCommitmentUpdateMode(){
            this.updateMode = false;
        }
            
    }

});