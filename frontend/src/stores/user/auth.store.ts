import { defineStore } from 'pinia';
import { Notify, LocalStorage } from 'quasar';
import fetchHelper from 'src/mixins/fetchHelper';

export const useAuth = defineStore({
    id: 'auth',
    state: () => ({
        user: {
            token: LocalStorage.getItem('token'),
        },
        returnUrl: null,
    }),
    actions: {
        /**
         * Login the user.
         * @param email The email of the user.
         * @param password The password of the user.
         */
        async login(email: string, password: string) {
            const user = await fetchHelper({
                method: 'POST',
                body: { email, password },
                url: '/api/admins/auth-via-email',
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

            console.log(user);

            // Redirect the user to the previous path or to the dashboard home.
            this.router.push({
                path: this.returnUrl || '/',
            });
        },
        logout() {
            // Empty the user object in the store.
            this.user = {
                token: '',
            };
            LocalStorage.remove('token');
            Notify.create({
                color: 'green-4',
                textColor: 'white',
                icon: 'cloud_done',
                message: 'Logged out successfully!',
            });
            this.router.push({
                path: '/login',
            });
        },
    },
});
