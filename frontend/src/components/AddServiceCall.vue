<template>
    <q-card class="add-service-call__form">
        <q-card-section>
            <span class="text-h6">Add service call</span>
        </q-card-section>
        <q-card-section class="q-pt-none">
            <q-form class="q-gutter-md" @submit="onSubmit">
                <q-select
                    filled
                    emit-value
                    map-options
                    lazy-rules
                    hide-bottom-space
                    :rules="[(val) => val.length > 0 || 'Please pick an option.']"
                    v-model="addServiceCall.client"
                    label="Client *"
                    :options="options.clients"
                />
                <q-select
                    emit-value
                    map-options
                    filled
                    lazy-rules
                    hide-bottom-space
                    :rules="[(val) => val.length > 0 || 'Please pick an option.']"
                    v-model="addServiceCall.location"
                    :options="options.addresses"
                    label="Location *"
                />
                <!-- Date -->
                <q-input
                    filled
                    v-model="addServiceCall.date"
                    label="Date *"
                    lazy-rules
                    hide-bottom-space
                    :rules="[
                        (val) =>
                            val.match(
                                /^(?:(?:(?:0?[13578]|1[02])(-)31)\1|(?:(?:0?[1,3-9]|1[0-2])(-)(?:29|30)\2))(?:(?:1[6-9]|[2-9]\d)?\d{2})$|^(?:0?2(-)29\3(?:(?:(?:1[6-9]|[2-9]\d)?(?:0[48]|[2468][048]|[13579][26])|(?:(?:16|[2468][048]|[3579][26])00))))$|^(?:(?:0?[1-9])|(?:1[0-2]))(-)(?:0?[1-9]|1\d|2[0-8])\4(?:(?:1[6-9]|[2-9]\d)?\d{2})$/
                            ) || 'Please enter a valid date, format is MM-DD-YYYY.',
                    ]"
                >
                    <template v-slot:prepend>
                        <q-icon name="event" class="cursor-pointer">
                            <q-popup-proxy cover transition-show="scale" transition-hide="scale">
                                <q-date v-model="addServiceCall.date" mask="MM-DD-YYYY" today-btn>
                                    <div class="row items-center justify-end">
                                        <q-btn v-close-popup label="Close" color="primary" flat />
                                    </div>
                                </q-date>
                            </q-popup-proxy>
                        </q-icon>
                    </template>
                </q-input>
                <!-- Start time -->
                <q-input
                    filled
                    v-model="addServiceCall.start_time"
                    label="Start time *"
                    lazy-rules
                    hide-bottom-space
                    :rules="[
                        (val) =>
                            val.match(/^[0-9]{2}:[0-9]{2}$/) ||
                            'Please enter a valid time, format is HH:mm.',
                    ]"
                >
                    <template v-slot:prepend>
                        <q-icon name="access_time" class="cursor-pointer">
                            <q-popup-proxy cover transition-show="scale" transition-hide="scale">
                                <q-time v-model="addServiceCall.start_time" mask="HH:mm" now-btn>
                                    <div class="row items-center justify-end">
                                        <q-btn v-close-popup label="Close" color="primary" flat />
                                    </div>
                                </q-time>
                            </q-popup-proxy>
                        </q-icon>
                    </template>
                </q-input>
                <!-- Stop time -->
                <q-input
                    filled
                    v-model="addServiceCall.stop_time"
                    label="Stop time *"
                    lazy-rules
                    hide-bottom-space
                    :rules="[
                        (val) =>
                            val.match(/^[0-9]{2}:[0-9]{2}$/) ||
                            'Please enter a valid time, format is HH:mm.',
                    ]"
                >
                    <template v-slot:prepend>
                        <q-icon name="access_time" class="cursor-pointer">
                            <q-popup-proxy cover transition-show="scale" transition-hide="scale">
                                <q-time v-model="addServiceCall.stop_time" mask="HH:mm" now-btn>
                                    <div class="row items-center justify-end">
                                        <q-btn v-close-popup label="Close" color="primary" flat />
                                    </div>
                                </q-time>
                            </q-popup-proxy>
                        </q-icon>
                    </template>
                </q-input>
                <q-input filled v-model="addServiceCall.reason" label="Reason" type="textarea" />
                <q-input
                    filled
                    v-model="addServiceCall.work_performed"
                    label="Work performed"
                    type="textarea"
                />
                <q-select
                    filled
                    emit-value
                    map-options
                    v-model="addServiceCall.material"
                    label="Material"
                    multiple
                    :options="options.materials"
                />
                <div>
                    <q-btn label="Submit" type="submit" color="primary" size="md" />
                </div>
            </q-form>
        </q-card-section>
    </q-card>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
    name: 'AddServiceCall',
});
</script>

<script lang="ts" setup>
import { useCalls } from 'src/stores';
import { storeToRefs } from 'pinia';
import { ref } from 'vue';

const emit = defineEmits(['closeModal']);

const store = useCalls();
await store.getCollections();
const { collections } = storeToRefs(store);

let addServiceCall = ref({
    client: '',
    location: '',
    date: '',
    start_time: '',
    stop_time: '',
    reason: '',
    work_performed: '',
    material: [],
});

// Get list of all relations(collections).
const optionsKeys = Object.keys(collections.value).map((key) => key);
const options = ref({
    clients: [],
    materials: [],
    addresses: [],
});

// Format the collections to be used in the select component.
optionsKeys.forEach((key) => {
    const mappedOptions = new Object();
    mappedOptions[key] = collections.value[key].map(
        (item: { name: string; id: string; address1?: string }) => {
            // Some items lack names, do not send empty names.
            const label = item.name || item.address1 || item.id;
            return {
                label: label,
                value: item.id,
            };
        }
    );

    options.value = { ...options.value, ...mappedOptions };
});

function onSubmit() {
    const payload = addServiceCall.value;

    payload.start_time = new Date(payload.date + ' ' + payload.start_time).toUTCString();
    payload.stop_time = new Date(payload.date + ' ' + payload.stop_time).toUTCString();
    payload.date = new Date(payload.date).toUTCString();
    store.addServiceCall(payload);
    emit('closeModal');
}
</script>

<style lang="scss">
.add-service-call__form {
    min-width: 90vw;

    @media (min-width: $breakpoint-sm-max) {
        min-width: 60vw;
    }
}
</style>
