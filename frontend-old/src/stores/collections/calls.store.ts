import { defineStore } from 'pinia';
import { LocalStorage } from 'quasar';
const baseUrl = 'http://localhost:8090';

export const useCalls = defineStore({
    id: 'calls',
    state: () => ({
        calls: {},
        user: LocalStorage.getItem('user') || {},
    }),
    actions: {
        async getCalls() {
            const calls = await fetch(`${baseUrl}/api/collections/service_call/records`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Admin ${this.user.token}`,
                },
            });
        },
    },
});
