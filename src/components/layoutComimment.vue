<template>
    <div v-if="!act.actionButtonUpdate" class="grid grid-cols-1 gap-6">
      <h2 class="text-2xl font-semibold text-gray-800">Commiments</h2>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div class="space-y-2">
            <label class="block text-sm font-medium text-gray-700" for="title">title</label>
            <input v-model="title" type="text" id="title" name="title" class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500">
        </div>
        <div class="space-y-2">
            <label class="block text-sm font-medium text-gray-700" for="place">Description</label>
            <input v-model="description" type="text" id="place" name="place" class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500">
        </div>
      </div>
      <div class="flex flex-row justify-end gap-x-5">
          <button @click.prevent="setCommitmentPrepared(title, description)" class="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
            {{ !commitment.updateMode ? 'Add commitment' : 'Update commitment'}}
          </button>
          <button v-if="commitment.updateMode == true" @click.prevent="updateCommitmentPreparedCancel" class="px-4 py-2 bg-red-600 text-white font-medium rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500">
            Cancel
          </button>
        </div>
    </div>

    <div id="commiment-section" class="space-y-6">
          
          <div v-if="!act.actionButtonUpdate && commitment.commimmentsPrepared.length > 0"  class="bg-white shadow overflow-hidden sm:rounded-md">
            <h3 class="px-4 py-3 bg-gray-50 text-sm font-medium text-gray-700">Commiments:</h3>
            <ul class="divide-y divide-gray-200">
              <li class="flex items-center justify-between px-4 py-3 hover:bg-gray-50">
                <div class="w-full">
                  <comminet v-for="commiment in commitment.commimmentsPrepared" :key="commiment.id"
                    :title="commiment.name"
                    :description="commiment.description"
                    :objetCommitment="commiment"
                    @deleteCommitmentPrepared="deleteCommitmentPrepared(commiment.id)"
                    @updateCommitmentPrepared="updateCommitmentPrepared(commiment.id)"
                  />
                </div>
              </li>
            </ul>
          </div>
  
          <div v-if="act.actionButtonUpdate && commitment.commiments.length > 0" class="bg-white shadow overflow-hidden sm:rounded-md">
            <h3 class="px-4 py-3 bg-gray-50 text-sm font-medium text-gray-700">Commiments list:</h3>
            <ul class="divide-y divide-gray-200">
              <li  class="flex items-center justify-between px-4 py-3">
                <div class="w-full">
                  <comminet v-for="commiment in commitment.commiments" :key="commiment.id"
                      :title="commiment.name"
                      :description="commiment.description"
                      :objetCommitment="commiment"
                      @deleteCommitmentPrepared="deleteCommitmentPrepared(commiment.id)"
                      @updateCommitmentPrepared="updateCommitmentPrepared(commiment.id)"
                    />
                </div>
              </li>
            </ul>
            <p class="px-4 py-3 text-sm text-gray-500">There are no commiments</p>
          </div>
        </div>
</template>
<script setup>
import comminet from '@/components/comminet.vue';
import { useCommitmentStore } from '@/stores/commitment.js'
import { useActsStore } from '@/stores/acts.js'

const commitment = useCommitmentStore();
const act = useActsStore();

const title = defineModel('title',{default: "title"});
const description = defineModel('description',{default: "description"});

const setCommitmentPrepared = (titleCommitment, descriptionCommitment) => {
  
  if(commitment.updateMode){
    commitment.updateCommitmentPrepared(title.value, description.value);
  }else{
    
    if(titleCommitment != '' || descriptionCommitment != ''){
      commitment.saveCommimentPrepared(titleCommitment, descriptionCommitment); 
    }
    
  }
  
  title.value = '';
  description.value = '';
}

const deleteCommitmentPrepared = (idCommitmentPrepared) => {
  commitment.deleteCommimentPrepared(idCommitmentPrepared);
}

const updateCommitmentPrepared = (idCommitmentPrepared) => {
  commitment.enableCommitmentUpdateMode();
  commitment.loadUpdateCommitmentPrepared(idCommitmentPrepared);

  if(commitment.updateMode){
  title.value = commitment.commitmentUpdate.name;
  description.value = commitment.commitmentUpdate.description;
  }
}

const updateCommitmentPreparedCancel = () => {
  commitment.updateCommitmentPreparedCancel();
  title.value = '';
  description.value = '';
}


</script>