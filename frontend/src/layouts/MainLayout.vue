<script lang="ts" setup>
import { useAuth } from 'src/stores';

function logout() {
    const authStore = useAuth();

    return authStore.logout();
}
</script>

<template>
    <q-layout view="hHh lpR fFf" class="bg-grey-1">
        <q-header
            elevated
            class="text-white"
            height-hint="64"
            :class="$q.screen.lt.md ? 'q-px-sm' : 'q-px-lg'"
        >
            <q-toolbar>
                <q-space />
                <div class="q-gutter-sm row items-center no-wrap">
                    <q-btn flat icon="logout" class="text-white" label="Logout" @click="logout()" />
                </div>
            </q-toolbar>
        </q-header>

        <q-page-container>
            <router-view />
        </q-page-container>
    </q-layout>
</template>
