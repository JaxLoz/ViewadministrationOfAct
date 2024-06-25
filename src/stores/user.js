import { defineStore } from 'pinia'
import axios from '@/axios'

export const useUserStore = defineStore('user', {
    state: () => ({
        users: [],
        usersSearched: []
    }),

    actions: {
        async getUsers() {
            try{
                const response = await axios.get("http://localhost:8000/index.php?controller=user&action=getUserWithEmail")
                console.log(response.data.data)
                this.users = response.data.data
            }catch(error){
                console.log(error)
            }
            
        },
        
        searchPersone(namePerson){
            if(this.users !== undefined && namePerson !== ""){
                const search = this.users.filter(user => {
                   return user.firstname.toLowerCase().includes(namePerson.toLowerCase()) || user.lastname.toLowerCase().includes(namePerson.toLowerCase()) || user.email.toLowerCase().includes(namePerson.toLowerCase())
                })
                console.log(search)
                this.usersSearched = search
            }else{
                this.usersSearched = []
            }

            
        }
    }
})