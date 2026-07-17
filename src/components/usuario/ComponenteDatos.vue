<template>

    <CInputGroup size="sm" class="mb-3 d-none d-md-flex">
        <CInputGroupText class="headercolor" as="label">{{ idpName }} : </CInputGroupText>
        <CFormInput type="text" :value="persona.idp" disabled />
        <CInputGroupText class="headercolor" as="label">ID App : </CInputGroupText>
        <CFormInput type="text" :value="persona.id" disabled />
    </CInputGroup>

    <CInputGroup size="sm" class="mb-3 d-none d-md-flex">
        <CInputGroupText class="headercolor" as="label">Nombre Completo : </CInputGroupText>
        <CFormInput type="text" :value="`${persona.nombre} ${persona?.paterno} ${persona?.materno}`" disabled />
    </CInputGroup>

    <CInputGroup size="sm" class="mb-3 d-none d-md-flex">
        <CInputGroupText class="headercolor" as="label">Email : </CInputGroupText>
        <CFormInput type="text" :value="persona.email" disabled />
        <CInputGroupText class="headercolor" as="label">Celular : </CInputGroupText>
        <CFormInput type="text" :value="persona.celular" disabled />
    </CInputGroup>


    <div class="d-md-none mb-3">
        <CInputGroup size="sm" class="mb-3">
            <CInputGroupText class="headercolor" as="label">{{ idpName }} : </CInputGroupText>
            <CFormInput type="text" :value="persona.idp" disabled />
        </CInputGroup>

        <CInputGroup size="sm" class="mb-3">
            <CInputGroupText class="headercolor" as="label">ID App : </CInputGroupText>
            <CFormInput type="text" :value="persona.id" disabled />
        </CInputGroup>

        <CInputGroup size="sm" class="mb-3">
            <CInputGroupText class="headercolor" as="label"></CInputGroupText>
            <CFormInput type="text" :value="`${persona.nombre} ${persona?.paterno} ${persona?.materno}`" disabled />
        </CInputGroup>

        <CInputGroup size="sm" class="mb-3">
            <CInputGroupText class="headercolor" as="label">Email : </CInputGroupText>
            <CFormInput type="text" :value="persona.email" disabled />
        </CInputGroup>
        <CInputGroup size="sm" class="mb-3">
            <CInputGroupText class="headercolor" as="label">Celular : </CInputGroupText>
            <CFormInput type="text" :value="persona.celular" disabled />
        </CInputGroup>
    </div>

</template>

<script setup>
const props = defineProps({
    persona: {
        type: Object,
        required: true
    },
    idpName: { type: String, required: true }
})
</script>
