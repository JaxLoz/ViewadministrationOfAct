<template>
    <div id="search-content">
        <div id="invitations-section" class="mt-8 mx-16">
            <div class="flex items-center mb-4">
                <input @input="searchPeople" v-model="search" type="text" placeholder="Search people to invite..." class="h-9 w-3/6 py-2 px-2 rounded-md ring-inset ring-1 ring-gray-300 focus:ring-inset focus:ring-2 focus:ring-[#4f46e5] outline-none mr-2">
            </div>
        </div>

        <ul>
            <li v-for="user in userStore.usersSearched" :key="user.id" class="flex flex-row">
                <span>{{ user.firstname+' '+user.lastname }}</span>
                <button type="button" @click="sendInvitation(user)">
                    <svg  xmlns="http://www.w3.org/2000/svg"  width="24"  height="24"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  stroke-width="2"  stroke-linecap="round"  stroke-linejoin="round"  class="icon icon-tabler icons-tabler-outline icon-tabler-user-plus"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M8 7a4 4 0 1 0 8 0a4 4 0 0 0 -8 0" /><path d="M16 19h6" /><path d="M19 16v6" /><path d="M6 21v-2a4 4 0 0 1 4 -4h4" /></svg>
                </button> 
            </li>
        </ul>
    </div>
    
    
</template>
<script setup>

import { useUserStore } from '@/stores/user.js';
import { useInvitationStore } from "@/stores/invitation.js";
import { computed, ref } from 'vue';

const userStore = useUserStore();
const invitationStore = useInvitationStore();

const search = ref('');

const searchPeople = () => {
    userStore.searchPersone(search.value);
}

const sendInvitation = (guest) => {
    invitationStore.savePersonInvited(guest);
}


</script>