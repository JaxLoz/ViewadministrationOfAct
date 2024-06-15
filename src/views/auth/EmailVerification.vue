<template>
  <div class="bg-[#f9fafb] flex flex-col h-screen items-center justify-center font-sans">
    <form class="px-8 pt-9 pb-5 bg-white rounded-md flex flex-col gap-y-4 drop-shadow-lg" @submit.prevent="verifyCode">
      <div class="text-center">
        <h1 class="text-3xl mb-5 font-semibold">Email Verification</h1>
        <p class="text-gray-600">Enter the verification code sent to your email.</p>
      </div>
      <div class="flex flex-col gap-y-2 items-center">
        <input v-model="verificationCode" class=" text-center h-10 w-40 py-2 px-2 rounded-md ring-inset ring-1 ring-gray-300 focus:ring-inset focus:ring-2 focus:ring-[#4f46e5] outline-none" type="text" id="verification-code" required placeholder="xxxxxx">
      </div>
      <div class="flex flex-row justify-center gap-x-2">
        <button class="bg-[#4f46e5] hover:bg-[#6366f1] text-white font-medium py-1.5 px-5 w-40 rounded-md" type="submit">Verify</button>
      </div>
      <div class="flex flex-row justify-center gap-x-1 items-baseline mt-3">
        <p class="block text-sm text-gray-500">Did you not receive the mail?</p>
        <button @click="resendCode" type="button" class="block font-semibold text-[#4339ff] hover:text-[#6366f1]">Resend Code</button>
      </div>
    </form>
  </div>
</template>

<script setup>

import { useAuthStore } from '@/stores/auth';
import { useEmailValidationStore } from "@/stores/mailValidation";
import { computed, onMounted, ref } from 'vue';
import router from "@/router/index.js";

const user = useAuthStore();
const emailValidation = useEmailValidationStore();
const verificationCode = ref("");
const isVerified = computed( () => emailValidation.isEmailValid);

const email = computed(() => emailValidation.email)

const verifyCode = async () => {
  await emailValidation.emailVerify(email.value, verificationCode.value);
  console.log(isVerified.value)

  if(isVerified.value) {
    router.push({name: 'formLogin'});
  }
};

const resendCode = async () => {
  const response = await emailValidation.refreshVerificationCode();
  console.log(response)
  if(response){
    await emailValidation.sendEmailVerificationCode();
  }
}

onMounted(async () => {
  console.log(email.value)

  if(sessionStorage.getItem("validationEmail") != null && email.value == ""){
    emailValidation.downloadEmailLocalStorage();
  }

  if(email.value != ""){
    
    await emailValidation.sendEmailVerificationCode(email.value)
  }
}) 

</script>


