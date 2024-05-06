<template>
    <div id="main-content" class="w-96 flex flex-col gap-y-5 ring-inset ring-1">
        <div id="content-title">
            <h1 id="title">{{ title }}</h1>
        </div>
        <div id="content-info">
            <p id="info-author">{{ author }}</p>
            <p id="info-date">{{ date }}</p>
            <p id="info-place">{{ place }}</p>
            <p id="info-hour">{{ hour }}</p>
        </div>
    </div>
</template>

<script setup>

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
    }

})
    // definicion de propiedades del componente


</script>