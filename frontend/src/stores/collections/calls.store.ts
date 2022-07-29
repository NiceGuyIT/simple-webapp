import { defineStore } from 'pinia';
import fetchHelper from 'src/mixins/fetchHelper';
import { Notify } from 'quasar';
import decodeRelation from 'src/mixins/decodeRelations';

export const useCalls = defineStore({
    id: 'calls',
    state: () => ({
        calls: {
            items: [],
            page: 0,
            perPage: 0,
            totalItems: 0,
        },
        collections: {
            materials: {},
            addresses: {},
            clients: {},
        },
    }),
    actions: {
        async getCalls() {
            const calls = await fetchHelper({
                method: 'GET',
                url: '/api/collections/service_call/records',
            }).then((res) => res.json());

            for (const item of calls.items) {
                item.material.forEach(async (materialName: string) => {
                    const decodedMat = await decodeRelation('material', materialName);

                    calls.items.forEach((item: { material: Array<''> }) => {
                        item.material.forEach((materialName: '') => {
                            if (materialName === decodedMat.id) {
                                item.material[item.material.indexOf(materialName)] =
                                    decodedMat.name;
                            }
                        });
                    });
                });
            }

            for (const item of calls.items) {
                const decodedLoc = await decodeRelation('address', item.location);

                item.location = `
                ${decodedLoc.name} ${decodedLoc.state}, ${decodedLoc.city}, ${decodedLoc.address1}, ${decodedLoc.address2}
                `;
            }

            for (const item of calls.items) {
                const decodedClient = await decodeRelation('client', item.client);

                item.client = `${decodedClient.name}, ${decodedClient.phone}, ${decodedClient.email}`;
            }

            this.calls = calls;
        },
        async getCollections() {
            const materials = await fetchHelper({
                method: 'GET',
                url: '/api/collections/material/records',
            }).then((res) => res.json());
            this.collections.materials = materials.items;

            const addresses = await fetchHelper({
                method: 'GET',
                url: '/api/collections/address/records',
            }).then((res) => res.json());
            this.collections.addresses = addresses.items;

            const clients = await fetchHelper({
                method: 'GET',
                url: '/api/collections/client/records',
            }).then((res) => res.json());
            this.collections.clients = clients.items;
        },
        async addServiceCall(payload: Record<string, unknown>) {
            await fetchHelper({
                method: 'POST',
                url: '/api/collections/service_call/records',
                body: payload,
            })
                .then((res) => {
                    // If the status is not 200, then throw an error.
                    if (res.status === 200) {
                        Notify.create({
                            color: 'green-4',
                            textColor: 'white',
                            icon: 'cloud_done',
                            message: 'Service call added successfully!',
                        });
                        return res.json();
                    } else {
                        return Promise.reject(
                            'Form could not be send, please check console errors.'
                        );
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
        },
    },
});
