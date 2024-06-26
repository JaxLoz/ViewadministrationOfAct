<template>
    <div id="app-layout">
        <NavBar />
        <main>
            <router-view />
        </main>
    </div>
</template>
<script setup>
import NavBar from '@/components/NavBar.vue';
</script>