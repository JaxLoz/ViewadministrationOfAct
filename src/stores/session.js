import { defineStore } from "pinia";
import axios from "@/axios";
import { onMounted } from "vue";
import router from "@/router";

export const useSessionStore = defineStore("session", {
    // Define el estado inicial del store
    state: () => ({
      IdUser: null,
      firstname: null,
      lastname: null,
      phone: null,
      email: null,
      rol: null,
      isAuthentication: false
    }),

    actions: {
      
      // recupero la informacion del usuario que se logueo y la guardo en el estado del store y en el sessionStorage
    async LoginUser(formLogin) {
            const response = await axios.post("?controller=singup&action=getInfoUserByCredentials", {
                email: formLogin.email
            })
            this.loadInfoSessionInState(response); // carga la información de la sesión en el estado

            const user = {
              IdUser: this.IdUser,
              firstname: this.firstname,
              lastname: this.lastname,
              phone: this.phone,
              email: this.email,
              rol: this.rol,
              isAuthentication: this.isAuthentication
            };

            sessionStorage.setItem("sessionForm", JSON.stringify(user)); // guardo la info en el sessionStorage
        },
      

    LogoutUser() {
        this.IdUser = null;
        this.firstname = null;
        this.lastname = null;
        this.phone = null;
        this.email = null;
        this.rol = null;
        this.isAuthentication = false;
        },

    loadInfoSessionInState (response){
        this.IdUser = response.data.data.id;
        this.firstname = response.data.data.firstname;
        this.lastname = response.data.data.lastname;
        this.phone = response.data.data.phone;
        this.email = response.data.data.email;
        this.rol = response.data.data.user_rol;
        this.isAuthentication = true;
    },

    loadInfoSessionOfSessionStorage(){
      onMounted (() =>{
        const infoSession = sessionStorage.getItem("sessionForm");
    
        if(infoSession === null){
          router.push("/login");
        }else{

          const infoUser = JSON.parse(infoSession);
          this.IdUser = infoUser.IdUser;
          this.firstname = infoUser.firstname;
          this.lastname = infoUser.lastname;
          this.phone = infoUser.phone;
          this.email = infoUser.email;
          this.rol = infoUser.rol;
          this.isAuthentication = infoUser.isAuthentication;
        }



      })
    }
  }  
});
