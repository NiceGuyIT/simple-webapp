<script setup lang="ts">
import { LocalStorage } from 'quasar';
import { useAuth } from 'src/stores';
const authStore = useAuth();

// Update the user's data in local storage whenever the state changes.
authStore.$subscribe((mutation, state) => {
    LocalStorage.set('token', state.user.token);
});
</script>

<template>
    <router-view />
</template>
