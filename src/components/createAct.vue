<template>
    <div class="flex flex-col gap-y-2 ">
        <textarea v-model="progress"  id="description-act" name="descriptionAct" class="h-80 my-8 mx-16 rounded-md px-3 py-2 ring-inset ring-1 ring-gray-300 focus:ring-inset focus:ring-2 focus:ring-[#4f46e5] outline-none" placeholder="Escribe aqui la informacion del acta" required></textarea>
    </div>
</template>

<script setup>
const progress = defineModel({default: "default"}); //defineModel define la prop y el evento update:modelValue que permite la comunicacion entre el componente padre y el hijo

</script>