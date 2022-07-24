import { defineStore } from 'pinia';
import { Notify } from 'quasar';

const baseUrl = 'http://localhost:8090';

export const useAuth = defineStore({
    id: 'auth',
    state: () => ({
        user: {},
        returnUrl: null,
    }),
    actions: {
        async login(email: string, password: string) {
            const user = await fetch(`${baseUrl}/api/admins/auth-via-email`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            })
                .then((res) => {
                    // If the status is not 200, then throw an error.
                    if (res.status === 200) {
                        Notify.create({
                            color: 'green-4',
                            textColor: 'white',
                            icon: 'cloud_done',
                            message: 'Login successful!',
                        });
                        return res.json();
                    } else {
                        return Promise.reject('Invalid email or password!');
                    }
                })
                .catch((error) => {
                    const errorMessage =
                        error.length > 0
                            ? error
                            : 'Server is currently down, please try again later!';
                    Notify.create({
                        color: 'red-4',
                        textColor: 'white',
                        icon: 'error',
                        message: errorMessage,
                    });
                    throw error;
                });

            // Update state for the user, localStorage will be updated in App.vue
            this.user = user;

            // Redirect the user to the previous path or to the dashboard home.
            this.router.push({
                path: this.returnUrl || '/',
            });
        },
        logout() {
            this.user = '';
            localStorage.removeItem('user');
            this.router.push({
                path: '/logout',
            });
        },
    },
});
