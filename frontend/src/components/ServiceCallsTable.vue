<template>
    <div class="view-calls">
        <q-table
            title="Service calls"
            row-key="name"
            :pagination="initialPagination"
            :columns="columns"
            grid-header
            :filter="searchFilter"
            :rows="rows"
            :grid="gridLayout"
        >
            <template v-slot:top-right>
                <div class="layout-toggle flex items-center">
                    <span>Grid layout</span>
                    <q-toggle
                        v-model="gridLayout"
                        checked-icon="check"
                        color="green"
                        unchecked-icon="clear"
                    />
                </div>
                <q-input
                    filled
                    dense
                    v-model="searchFilter"
                    placeholder="Search"
                    class="table-search-box"
                >
                    <template v-slot:append>
                        <q-icon name="search" size="sm" />
                    </template>
                </q-input>
                <q-btn
                    round
                    color="primary"
                    icon="add"
                    class="add-service-call"
                    size="md"
                    @click="showAddModal = true"
                />
            </template>
        </q-table>
        <q-dialog v-model="showAddModal">
            <add-service-call @closeModal="onSubmit()" />
        </q-dialog>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
    name: 'ServiceCallsTable',
});
</script>

<script setup lang="ts">
import AddServiceCall from './AddServiceCall.vue';
import { useCalls } from 'src/stores';
import { storeToRefs } from 'pinia';
import { ref } from 'vue';

const store = useCalls();
let { calls } = storeToRefs(store);
await store.getCalls();

const searchFilter = ref('');
const gridLayout = ref(true);

let showAddModal = ref(false);

const columns = [
    {
        name: 'client',
        label: 'Client',
        align: 'left',
        field: 'client',
        sortable: true,
    },
    {
        name: 'location',
        label: 'Location',
        align: 'left',
        field: 'location',
        sortable: true,
    },
    {
        name: 'date',
        label: 'Date',
        align: 'left',
        field: 'date',
        sortable: true,
        format: (val: string) => new Date(val).toLocaleDateString(),
    },
    {
        name: 'start_time',
        label: 'Start time',
        align: 'left',
        field: 'start_time',
        sortable: true,
        format: (val: string) => new Date(val).toLocaleTimeString('en-US').replace(/:00/, ''),
    },
    {
        name: 'stop_time',
        label: 'Stop time',
        align: 'left',
        field: 'stop_time',
        sortable: true,
        format: (val: string) => new Date(val).toLocaleTimeString('en-US').replace(/:00/, ''),
    },
    {
        name: 'reason',
        label: 'Reason',
        align: 'left',
        field: 'reason',
        sortable: true,
    },
    {
        name: 'work_performed',
        label: 'Work performed',
        align: 'left',
        field: 'work_performed',
        sortable: true,
    },
    {
        name: 'material',
        label: 'Materials',
        align: 'left',
        field: 'material',
        sortable: true,
        // Add comma separated list of materials
        format: (val: Array<''>) =>
            val.map((material: string) => material.replace(/_/g, ' ')).join(', '),
    },
];

const rows = calls.value.items.map(
    (call: {
        client: string;
        location: string;
        date: string;
        start_time: string;
        stop_time: string;
        reason: string;
        material: string;
        work_performed: string;
    }) => ({
        client: call.client,
        location: call.location,
        date: call.date,
        start_time: call.start_time,
        stop_time: call.stop_time,
        reason: call.reason,
        material: call.material,
        work_performed: call.work_performed,
    })
);

async function onSubmit() {
    await store.getCalls();
    showAddModal.value = false;
    window.location.reload();
}

const initialPagination = {
    sortBy: 'desc',
    descending: false,
    page: 1,
    rowsPerPage: 10,
};
</script>

<style lang="scss">
.view-calls {
    .q-table__control {
        display: flex;
        align-items: center;

        .add-service-call {
            margin-left: 1rem;
        }

        .q-table__title {
            font-size: 2rem;
        }
    }

    .q-table__grid-item {
        @media (min-width: $breakpoint-md-max) {
            width: 33.3333%;
        }
    }

    .q-table__grid-item-card {
        height: 100%;

        .q-table__grid-item-title {
            font-size: 1rem;
        }
    }
}
</style>
