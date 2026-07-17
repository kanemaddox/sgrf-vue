<template>
    <CWidgetStatsB class="mb-3" :progress="{ color: 'success', value: 75 }">
        <template #text>{{ props.datos.apellidos }}</template>
        <template #title>{{ props.datos.nombre }}</template>
        <template #value>{{ props.datos.idpName }} : {{ props.datos.idp }}</template>
    </CWidgetStatsB>
</template>

<script setup>
const props = defineProps({
    datos: {
        type: Object,
        required: true
    }
})
</script>