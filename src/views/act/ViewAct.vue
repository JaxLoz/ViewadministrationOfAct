<template>
    <div class="max-w-4xl mx-auto pt-16 pb-12 font-sans">
      <div class="text-center mb-10">
        <h1 class="text-3xl font-bold text-gray-800">Meeting Minutes</h1>
        <div class="mt-2 text-sm text-gray-500">
          <span>Created by {{ nameAuthor }}</span>
        </div>
      </div>
  
      <div class="bg-white shadow overflow-hidden sm:rounded-lg">
        <div class="px-4 py-5 sm:px-6">
          <h3 class="text-lg leading-6 font-medium text-gray-900">{{ meetingInfo.title }}</h3>
          <p class="mt-1 max-w-2xl text-sm text-gray-500">Meeting details and information</p>
        </div>
        <div class="border-t border-gray-200">
          <dl>
            <div class="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt class="text-sm font-medium text-gray-500">Place</dt>
              <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{{ meetingInfo.place }}</dd>
            </div>
            <div class="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt class="text-sm font-medium text-gray-500">Date</dt>
              <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{{ meetingInfo.start_date }}</dd>
            </div>
            <div class="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt class="text-sm font-medium text-gray-500">Time</dt>
              <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{{ meetingInfo.start_time }}</dd>
            </div>
            <div class="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt class="text-sm font-medium text-gray-500">Progress</dt>
              <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{{ meetingInfo.progress }}</dd>
            </div>
          </dl>
        </div>
      </div>
  
      <div v-if="meetingInfo.id_act" class="mt-8">
        <h2 class="text-2xl font-semibold text-gray-800 mb-4">Commitments</h2>
        <div v-for="commitment in commitments" :key="commitment.id" class="bg-white shadow overflow-hidden sm:rounded-lg mb-4">
          <div class="px-4 py-5 sm:px-6">
            <h3 class="text-lg leading-6 font-medium text-gray-900">{{ commitment.title }}</h3>
            <p class="mt-1 max-w-2xl text-sm text-gray-500">{{ commitment.description }}</p>
          </div>
          <div class="border-t border-gray-200 px-4 py-5 sm:p-0">
            <dl class="sm:divide-y sm:divide-gray-200">
              <div class="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt class="text-sm font-medium text-gray-500">Status</dt>
                <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{{ commitment.status }}</dd>
              </div>
              <div class="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt class="text-sm font-medium text-gray-500">Assigned To</dt>
                <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                  {{ commitment.assignedTo.join(', ') }}
                </dd>
              </div>
            </dl>
          </div>
        </div>
      </div>
  
      <div class="mt-8">
        <h2 class="text-2xl font-semibold text-gray-800 mb-4">Attendees</h2>
        <ul class="bg-white shadow overflow-hidden sm:rounded-md">
          <li v-for="guest in attendees" :key="guest.id" class="px-4 py-4 sm:px-6">
            <div class="flex items-center justify-between">
              <p class="text-sm font-medium text-indigo-600 truncate">
                {{ guest.firstname }} {{ guest.lastname }}
              </p>
              <div class="ml-2 flex-shrink-0 flex">
                <p class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full"
                   :class="guest.assistance ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'">
                  {{ guest.assistance ? 'Attended' : 'Did not attend' }}
                </p>
              </div>
            </div>
            <div class="mt-2 sm:flex sm:justify-between">
              <div class="sm:flex">
                <p class="flex items-center text-sm text-gray-500">
                  {{ guest.email }}
                </p>
              </div>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, computed, onMounted } from 'vue';
  import { useSessionStore } from "@/stores/session.js";
  import { useActsStore } from "@/stores/acts.js";
  import { useCommitmentStore } from "@/stores/commitment.js";
  import { useInvitationStore } from "@/stores/invitation.js";
  
  const session = useSessionStore();
  const useAct = useActsStore();
  const commitmentStore = useCommitmentStore();
  const invitationStore = useInvitationStore();
  
  const nameAuthor = computed(() => session.firstname + " " + session.lastname);
  const meetingInfo = ref({});
  const commitments = ref([]);
  const attendees = ref([]);
  
  onMounted(async () => {
    session.loadInfoSessionOfSessionStorage();
    const meetingId = /* Get the meeting ID from route params or store */;
    
    // Fetch meeting info
    meetingInfo.value = await useAct.getMeetingInfo(meetingId);
    
    // Fetch commitments if there's an associated act
    if (meetingInfo.value.id_act) {
      const commitmentIds = await commitmentStore.getCommitmentsByIdAct(meetingInfo.value.id_act);
      commitments.value = await commitmentStore.getCommitmentDetails(commitmentIds);
    }
    
    // Fetch attendees
    attendees.value = await invitationStore.getInfoGuests(meetingId);
  });
  </script>