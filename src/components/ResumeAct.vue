<template>
    <div id="main-content" class="w-full max-w-sm flex flex-col gap-y-2 p-4 rounded-lg bg-white shadow-md font-sans">
        <div id="content-header" class="flex justify-between items-center">
            <h1 id="title" class="text-base font-semibold text-gray-800">{{ title }}</h1>
            <span id="info-progress" class="text-xs text-gray-400">{{ thereIsMinutes }}</span>
            <div class="flex gap-x-2">
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
        <p id="info-place" class="text-xs text-gray-500">{{ place }}</p>
        <p id="info-author" v-if="!author.startsWith('undefined') && !author.endsWith('undefined')" class="text-xs text-gray-600">Author: {{ author }}</p>
        <div id="content-date-time" class="flex justify-between text-xs text-gray-500">
            <p id="info-hour">{{ hour }}</p>
            <p id="info-date">{{ date }}</p>
        </div>
    </div>
</template>
<script setup>

import { ref } from 'vue';

// definicion de propiedades del componente
const props = defineProps({
    
    title:{
        type: String,
        required: true,
        default: "Titulo de la reunion"
    },

    author:{
        type: String,
        required: true,
        default: "Nombre del autor"
    },

    place:{
        type: String,
        required: true,
        default: "lugar de la reunion"
    },

    date:{
        type: String,
        required: true,
        default: "YYY-MM-DD"
    },

    hour:{
        type: String,
        required: true,
        default: "HH:MM:SS"
    },

    thereIsMinutes:{
        type: Boolean,
        required: true,
        default: false
    }

})
    
// definicion de eventos del componente

const emit = defineEmits(["updateInfoAct", "deleteInfoAct"]);
</script>