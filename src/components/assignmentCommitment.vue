<template>
  <Teleport to="body">
    <div class="fixed inset-0 bg-[#424242] bg-opacity-50 flex items-center justify-center z-50" @click.self="disableAssigmentModal">
      <div class="flex flex-col items-center justify-center font-sans p-4 sm:p-8 w-[95%] max-w-4xl h-[90vh] backdrop-blur-2xl rounded-lg">
        <div class="w-full h-full bg-white shadow overflow-hidden sm:rounded-lg flex flex-col">
          <div class="flex-grow overflow-y-auto">
            
            <search v-if="!act.actionButtonUpdate" class="sticky top-0 z-10 bg-white p-4" />

            <div class="overflow-y-auto">
              <h3 class="px-4 py-3 bg-gray-50 text-sm font-medium text-gray-700">responsible for the commitment:</h3>
              <ul v-if="!act.actionButtonUpdate" class="divide-y divide-gray-200">
                <li v-for="infManager in commitmentStore.commimmentsPrepared[assignment.infoCommitment.id].manager" :key="infManager.id"  class="flex items-center justify-between px-4 py-3 hover:bg-gray-50">
                  <div>
                    <p class="text-sm font-medium text-gray-900">{{ infManager.firstname+'  '+infManager.lastname }}</p>
                    <p class="text-sm text-gray-500">{{ infManager.email }}</p>
                  </div>
                  <button @click="deleteAssigment(assignment)" class="text-red-600 hover:text-red-800">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path fill-rule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clip-rule="evenodd" />
                    </svg>
                  </button>
                </li>
              </ul>

              <ul v-else class="divide-y divide-gray-200">
                <li v-for="manager in commitmentStore.commitmentForUpdate.manager" :key="manager.id_credential"  class="flex items-center justify-between px-4 py-3 hover:bg-gray-50">
                  <div>
                    <p class="text-sm font-medium text-gray-900">{{ manager.firstname+'  '+manager.lastname }}</p>
                    <p class="text-sm text-gray-500">{{ manager.email }}</p>
                  </div>
                  <button v-if="!act.actionButtonUpdate" @click="deleteAssigment(assignment)" class="text-red-600 hover:text-red-800">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path fill-rule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clip-rule="evenodd" />
                    </svg>
                  </button>
                </li>
              </ul>

            </div>
          </div>
        </div>
      </div>
    </div>
  </Teleport>
</template>

<script setup>
import { useAssignmentStore } from "@/stores/assignment.js";
import { useCommitmentStore } from "@/stores/commitment";
import { useActsStore } from "@/stores/acts.js";
import search from "@/components/search.vue";

const assignment = useAssignmentStore();
const commitmentStore = useCommitmentStore();
const act = useActsStore();

const disableAssigmentModal = () => {
  assignment.disableAssigmentModal();
}

const deleteAssigment = (guest) => {
  assignment.deleteAssigment(guest);
}
</script>