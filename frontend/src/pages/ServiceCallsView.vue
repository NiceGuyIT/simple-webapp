<template>
    <div :class="$q.screen.lt.md ? 'q-px-sm' : 'q-px-xl q-py-lg'">
        <suspense>
            <service-calls-table />
        </suspense>
    </div>
</template>

<script setup lang="ts">
import { useQuasar } from 'quasar';
import ServiceCallsTable from 'src/components/ServiceCallsTable.vue';

const $q = useQuasar();
</script>
