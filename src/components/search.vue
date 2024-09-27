<template>
    <div id="search-content" class="max-w-2xl mx-auto mt-8">
      <div id="invitations-section" class="relative">
        <div class="mb-1">
          <input 
            @input="searchPeople" 
            v-model="search" 
            type="text" 
            placeholder="Search people to invite..." 
            class="w-full py-2 px-4 rounded-md ring-1 ring-gray-300 focus:ring-2 focus:ring-[#4f46e5] outline-none shadow-sm"
          >
        </div>
        
        <ul class="absolute w-full bg-white mt-1 rounded-md shadow-lg max-h-60 overflow-auto">
          <li 
            v-for="user in userStore.usersSearched" 
            :key="user.id" 
            class="flex items-center justify-between p-3 hover:bg-gray-100 cursor-pointer"
          >
            <div>
              <span class="font-medium">{{ user.firstname + ' ' + user.lastname }}</span>
              <span class="text-sm text-gray-500 ml-2">{{ user.email }}</span>
            </div>
            <button 
              type="button" 
              @click="addUser(user)"
              class="text-gray-400 hover:text-[#4f46e5] transition-colors duration-200"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="icon icon-tabler icons-tabler-outline icon-tabler-user-plus">
                <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                <path d="M8 7a4 4 0 1 0 8 0a4 4 0 0 0 -8 0" />
                <path d="M16 19h6" />
                <path d="M19 16v6" />
                <path d="M6 21v-2a4 4 0 0 1 4 -4h4" />
              </svg>
            </button> 
          </li>
        </ul>
      </div>
    </div>
  </template>
<script setup>

import { useUserStore } from '@/stores/user.js';
import { useInvitationStore } from "@/stores/invitation.js";
import { useAssignmentStore } from '@/stores/assignment';
import { useCommitmentStore } from '@/stores/commitment';
import { computed, onMounted, ref } from 'vue';

const userStore = useUserStore();
const invitationStore = useInvitationStore();
const assignmentStore = useAssignmentStore();
const commitmentStore = useCommitmentStore();

const search = ref('');

const searchPeople = () => {
    userStore.searchPersone(search.value);
}

const addUser = (guest) => {

  if(assignmentStore.showAssigmentModal){
    if(assignmentStore.infoCommitment != null){
      commitmentStore.saveManagerCommitmentPrepared(assignmentStore.infoCommitment.id, guest);
    }
  }else{
    invitationStore.savePersonInvited(guest);
  }


}


</script>