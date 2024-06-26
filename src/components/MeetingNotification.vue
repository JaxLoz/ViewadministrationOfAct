<template>
    <div class="bg-white p-4 rounded-lg shadow-lg flex flex-col w-80 space-y-4">
      <div class="flex-1">
        <div class="text-sm text-gray-500 flex justify-between items-center">
          <span>Invitacion a reunión</span>
        </div>
        <p class="mt-1 text-lg font-medium text-gray-900">{{ meetingName }}</p>
        <p class="mt-1 text-sm text-gray-600">Lugar: {{ meetingPlace }}</p>
        <p class="mt-1 text-sm text-gray-600"> Fecha: {{ meetingDate+' '+meetingTime }}</p>
        <div class="mt-4 flex justify-between items-center">
            <button @click="$emit('acceptMeeting')" class="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50">
            Aceptar
          </button>
          <button @click="$emit('rejectMeeting')" class="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50">
            Rechazar
          </button>
        </div>
      </div>
    </div>
</template>
<script setup>


const props = defineProps({
  meetingName: {
    type: String,
    required: true,
    default: 'Nombre de la reunión',
  },

    meetingPlace: {
        type: String,
        required: true,
        default: 'Lugar de la reunión',
    },

    meetingDate: {
        type: String,
        required: true,
        default: 'Fecha de la reunión',
    },

    meetingTime: {
        type: String,
        required: true,
        default: 'Hora de la reunión',
    },    
});

const emit = defineEmits(['acceptMeeting', 'rejectMeeting']);
</script>