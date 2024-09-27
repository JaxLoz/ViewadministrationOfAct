<template>
    <div class="w-full max-w-sm p-4 rounded-lg bg-white shadow-md font-sans hover:shadow-lg transition-shadow duration-300">
      <div class="flex justify-between items-start mb-3">
        <h1 class="text-lg font-semibold text-gray-800 flex-grow">{{ title }}</h1>
        <div class="flex items-center space-x-2">
          <span class="flex items-center justify-center w-8 h-8 rounded-full" 
                :class="thereIsMinutes ? 'bg-green-100' : 'bg-red-100'">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" :class="thereIsMinutes ? 'text-green-500' : 'text-red-500'" viewBox="0 0 20 20" fill="currentColor">
              <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z" />
              <path fill-rule="evenodd" d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 4a1 1 0 000 2h.01a1 1 0 100-2H7zm3 0a1 1 0 000 2h3a1 1 0 100-2h-3zm-3 4a1 1 0 100 2h.01a1 1 0 100-2H7zm3 0a1 1 0 100 2h3a1 1 0 100-2h-3z" clip-rule="evenodd" />
            </svg>
          </span>
        </div>
      </div>
      
      <div class="mb-3">
        <p class="text-sm text-gray-600">{{ place }}</p>
        <p class="text-sm text-gray-500">{{ formatDateTime(date, hour) }}</p>
      </div>
      
      <div class="flex justify-between items-center">
        <p v-if="!author.startsWith('undefined') && !author.endsWith('undefined')" class="text-xs text-gray-500">
          Author: {{ author }}
        </p>
        <div class="flex space-x-2">
          <button @click="$emit('updateInfoAct')" class="p-1 rounded hover:bg-gray-100">
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#6b7280" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" class="icon icon-tabler icons-tabler-outline icon-tabler-edit hover:stroke-indigo-500">
              <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
              <path d="M7 7h-1a2 2 0 0 0 -2 2v9a2 2 0 0 0 2 2h9a2 2 0 0 0 2 -2v-1"/>
              <path d="M20.385 6.585a2.1 2.1 0 0 0 -2.97 -2.97l-8.415 8.385v3h3l8.385 -8.415z"/>
              <path d="M16 5l3 3"/>
            </svg>
          </button>
          <button @click="$emit('deleteInfoAct')" class="p-1 rounded hover:bg-gray-100">
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#6b7280" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" class="icon icon-tabler icons-tabler-outline icon-tabler-trash hover:stroke-red-500">
              <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
              <path d="M4 7l16 0"/>
              <path d="M10 11l0 6"/>
              <path d="M14 11l0 6"/>
              <path d="M5 7l1 12a2 2 0 0 0 2 2h8a2 2 0 0 0 2 -2l1 -12"/>
              <path d="M9 7v-3a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v3"/>
            </svg>
          </button>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  
  const props = defineProps({
    title: { type: String, required: true, default: "Titulo de la reunion" },
    author: { type: String, required: true, default: "Nombre del autor" },
    place: { type: String, required: true, default: "lugar de la reunion" },
    date: { type: String, required: true, default: "YYYY-MM-DD" },
    hour: { type: String, required: true, default: "HH:MM:SS" },
    thereIsMinutes: { type: Boolean, required: true, default: false }
  });
  
  const emit = defineEmits(["updateInfoAct", "deleteInfoAct", "viewDetails"]);
  
  const formatDateTime = (date, time) => {
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' };
    const dateTime = new Date(`${date}T${time}`);
    return dateTime.toLocaleDateString('en-US', options);
  };
  </script>