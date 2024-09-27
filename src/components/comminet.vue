<template>
    <div class="flex items-center justify-between p-4 bg-white rounded-lg shadow gap-3">
  <div>
    <h3 class="text-lg font-semibold text-gray-800">{{ props.title }}</h3>
    <p class="text-sm text-gray-500">{{ props.description }}</p>
  </div>
  <div class="flex items-center space-x-4 ">
    <span v-if="act.actionButtonUpdate && props.objetCommitment.status == 1" class="px-2 py-1 text-sm font-medium text-green-700 bg-green-100 rounded-full">
      Complete
    </span>
    <span v-if="act.actionButtonUpdate && props.objetCommitment.status == 0" class="px-2 py-1 text-sm font-medium text-red-700 bg-red-100 rounded-full">
      Incomplete
    </span>
    <div v-if="act.actionButtonUpdate" class="relative">
      <select 
        class="appearance-none bg-gray-100 border border-gray-300 text-gray-700 py-2 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
        v-model="props.objetCommitment.status"
      >
        <option value="1">Complete</option>
        <option value="0">Incomplete</option>
      </select>
      <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
        <svg class="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
          <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/>
        </svg>
      </div>
    </div>
    <button @click.prevent="enableAssignment(props.objetCommitment)" class="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
      assign responsible
    </button>
    <button v-if="!act.actionButtonUpdate" @click.prevent="$emit('updateCommitmentPrepared')" class="text-blue-600 hover:text-blue-800 p-1 rounded">
      <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <path d="M7 7h-1a2 2 0 0 0 -2 2v9a2 2 0 0 0 2 2h9a2 2 0 0 0 2 -2v-1"/>
        <path d="M20.385 6.585a2.1 2.1 0 0 0 -2.97 -2.97l-8.415 8.385v3h3l8.385 -8.415z"/>
        <path d="M16 5l3 3"/>
      </svg>
    </button>
    <button v-if="!act.actionButtonUpdate" @click.prevent="$emit('deleteCommitmentPrepared')" :class="{'text-gray-600' : commitment.updateMode, 'text-red-600 hover:text-red-800': !commitment.updateMode}" :disabled="commitment.updateMode">
      <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
      <path fill-rule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clip-rule="evenodd" />
      </svg>
    </button>
  </div>
</div>
</template>
<script setup> 
import { useActsStore } from '@/stores/acts.js';
import  { useAssignmentStore } from "@/stores/assignment.js";
import { useCommitmentStore } from '@/stores/commitment';

const act = useActsStore();
const assignment = useAssignmentStore();
const commitment = useCommitmentStore();

const enableAssignment = (commitmentInfo) => {
  console.log(commitmentInfo);
  if(act.actionButtonUpdate){
    commitment.saveCommitmetForUpdate(commitmentInfo);
  }else{
    assignment.saveInfoCommitmentCurrent(commitmentInfo)
  }
  assignment.enableAssigmentModal();
  console.log(commitmentInfo);
}

const updateStatus = () => {
  console.log(props.objetCommitment);
}

const props = defineProps({
  title:{
    type: String,
    required: true,
    default: "Titulo de la reunion"
  },

  description:{
    type: String,
    required: true,
    default: "Descripcion de la reunion"
  },

  objetCommitment:{
    type: Object,
    required: true,
    default: () => ({})
  
  }
})

const emit = defineEmits(['deleteCommitmentPrepared', 'updateCommitmentPrepared']);

</script>