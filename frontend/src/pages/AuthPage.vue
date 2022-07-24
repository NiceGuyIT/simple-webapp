<template>
    <q-layout>
        <q-page-container>
            <div class="auth-page-form">
                <div>
                    <h1 class="text-h3">Login</h1>
                </div>
                <q-card-section>
                    <q-form class="q-gutter-md full-width" @submit="onSubmit">
                        <q-input
                            filled
                            label="Username *"
                            v-model="email"
                            bottom-slots
                            lazy-rules
                            :rules="[(val) => (val && val.length > 0) || 'Field is required']"
                        >
                            <template v-slot:hint>Enter your dashboard username.</template>
                        </q-input>

                        <q-input
                            type="password"
                            filled
                            label="Password *"
                            v-model="password"
                            bottom-slots
                            lazy-rules
                            :rules="[(val) => (val && val.length > 0) || 'Field is required']"
                        >
                            <template v-slot:hint>Enter your dashboard password.</template>
                        </q-input>

                        <div>
                            <q-btn
                                label="Login"
                                class="full-width"
                                size="lg"
                                type="submit"
                                color="primary"
                            />
                        </div>
                    </q-form>
                </q-card-section>
            </div>
        </q-page-container>
    </q-layout>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { useAuth } from 'src/stores';

const email = ref('');
const password = ref('');

function onSubmit() {
    const authStore = useAuth();

    return authStore.login(email.value, password.value);
}
</script>

<style lang="scss" scoped>
.auth-page-form {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100vh;
    width: 100%;

    .q-card__section {
        min-width: 40vh;
    }
}
</style>
