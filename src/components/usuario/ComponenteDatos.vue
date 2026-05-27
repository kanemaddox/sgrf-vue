<template>
    <CInputGroup size="sm" class="mb-3">
        <CInputGroupText class="headercolor" as="label">IDP </CInputGroupText>
        <CFormInput type="text" :value="persona.idp" disabled />
        <CInputGroupText class="headercolor" as="label">ID App </CInputGroupText>
        <CFormInput type="text" :value="persona.id" disabled />
    </CInputGroup>

    <CInputGroup size="sm" class="mb-3">
        <CInputGroupText class="headercolor" as="label">Nombre Completo </CInputGroupText>
        <CFormInput type="text" :value="`${persona.nombre} ${persona?.paterno} ${persona?.materno}`" disabled />
    </CInputGroup>

    <CInputGroup size="sm" class="mb-3">
        <CInputGroupText class="headercolor" as="label">Email </CInputGroupText>
        <CFormInput type="text" :value="persona.email" disabled />
        <CInputGroupText class="headercolor" as="label">Celular</CInputGroupText>
        <CFormInput type="text" :value="persona.celular" disabled />
    </CInputGroup>
</template>

<script setup>
const props = defineProps({
    persona: {
        type: Object,
        required: true
    }
})
</script>