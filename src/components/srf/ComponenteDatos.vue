<template>
    <div class="d-md-none mb-3">
        <CInputGroup size="sm" class="mb-3">
            <CInputGroupText class="headercolor" as="label">{{ datos?.idpName }} :
            </CInputGroupText>
            <CFormInput type="text" :value="datos?.idp" disabled />
        </CInputGroup>
        <CInputGroup size="sm" class="mb-3">
            <CInputGroupText class="headercolor" as="label"></CInputGroupText>
            <CFormInput type="text" :value="datos?.nombre" disabled />
        </CInputGroup>
    </div>

    <CInputGroup size="sm" class="mb-3 d-none d-md-flex">
        <CInputGroupText class="headercolor" as="label">Nombre Completo :
        </CInputGroupText>
        <CFormInput type="text" :value="datos.nombre" disabled />
        <CInputGroupText class="headercolor" as="label">{{ datos?.idpName }} :
        </CInputGroupText>
        <CFormInput type="text" :value="datos?.idp" disabled />
    </CInputGroup>

    <CInputGroup size="sm" class="mb-3">
        <CInputGroupText class="headercolor" as="label">Cargo : </CInputGroupText>
        <CFormInput type="text" :value="datos?.cargo" disabled />
    </CInputGroup>

    <CInputGroup size="sm" class="mb-3 d-none d-md-flex">
        <CInputGroupText class="headercolor" as="label">Centro de Costos :
        </CInputGroupText>
        <CFormInput type="text" :value="datos?.centroCostos" disabled />
        <CInputGroupText class="headercolor" as="label">CC : </CInputGroupText>
        <CFormInput type="text" :value="datos?.codigo" disabled />
    </CInputGroup>

    <div class="d-md-none mb-3">
        <CInputGroup size="sm" class="mb-3">
            <CInputGroupText class="headercolor" as="label">C Costos :
            </CInputGroupText>
            <CFormInput type="text" :value="datos?.centroCostos" disabled />

        </CInputGroup>
        <CInputGroup size="sm" class="mb-3">
            <CInputGroupText class="headercolor" as="label">CC : </CInputGroupText>
            <CFormInput type="text" :value="datos?.codigo" disabled />
        </CInputGroup>
    </div>
</template>

<script setup>
const props = defineProps({
    datos: {
        type: Object,
        required: true
    }
})
</script>