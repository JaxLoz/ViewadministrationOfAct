<template>
    <div id="main-content" class="w-96 flex flex-col gap-y-5 py-2 rounded-md bg-[#f9fafb] drop-shadow font-sans">
        <div id="content-title" class="flex flex-row justify-between px-2">
            <h1 id="title">{{ title }}</h1>
            <p id="info-place">{{ place }}</p>
            <span id="info-progress">{{ thereIsMinutes }}</span>
        </div>
        <div id="content-info" class="flex flex-row justify-center">
            <p id="info-author" v-if="!author.startsWith('undefined') && !author.endsWith('undefined')">Author: {{ author }}</p>
        </div>
        <div id="content-buttons" class="flex flex-row gap-x-2 justify-around">
            <p id="info-hour" class="text-sm text-gray-500">{{ hour }}</p>
            <p id="info-date" class="text-sm text-gray-500">{{ date }}</p>
            <button @click="emit('updateInfoAct')">
                <svg  xmlns="http://www.w3.org/2000/svg"  width="18"  height="18"  viewBox="0 0 24 24"  fill="none"  
                    stroke="#6b7280"  stroke-width="1.5"  stroke-linecap="round"  stroke-linejoin="round"  class="icon icon-tabler icons-tabler-outline icon-tabler-edit hover:stroke-[#6366f1]">
                    <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                    <path d="M7 7h-1a2 2 0 0 0 -2 2v9a2 2 0 0 0 2 2h9a2 2 0 0 0 2 -2v-1" />
                    <path d="M20.385 6.585a2.1 2.1 0 0 0 -2.97 -2.97l-8.415 8.385v3h3l8.385 -8.415z" />
                    <path d="M16 5l3 3" />
                </svg>
            </button>

            <button @click="emit('deleteInfoAct')">
                <svg  xmlns="http://www.w3.org/2000/svg"  width="18"  height="18"  viewBox="0 0 24 24"  fill="none"  stroke="#6b7280"  stroke-width="1.5"  
                stroke-linecap="round"  stroke-linejoin="round"  class="icon icon-tabler icons-tabler-outline icon-tabler-trash hover:stroke-[#ad2020]">
                <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                <path d="M4 7l16 0" /><path d="M10 11l0 6" />
                <path d="M14 11l0 6" /><path d="M5 7l1 12a2 2 0 0 0 2 2h8a2 2 0 0 0 2 -2l1 -12" />
                <path d="M9 7v-3a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v3" />
                </svg>
            </button>
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