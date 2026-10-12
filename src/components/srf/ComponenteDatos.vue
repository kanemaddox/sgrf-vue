<template>
    <div class="d-md-none mb-3">
        <CInputGroup size="sm" class="mb-3">
            <CInputGroupText class="headercolor" as="label">
                <i class="bi bi-person-vcard me-2"></i>{{ datos?.idpName }} :
            </CInputGroupText>
            <CFormInput type="text" :value="datos?.idp" disabled />
        </CInputGroup>
        <CInputGroup size="sm" class="mb-3">
            <CFormInput type="text" :value="datos?.nombre" disabled />
        </CInputGroup>
    </div>

    <CInputGroup size="sm" class="mb-3 d-none d-md-flex">
        <CInputGroupText class="headercolor" as="label">
            <i class="bi bi-person me-2"></i>Nombre Completo :
        </CInputGroupText>
        <CFormInput type="text" :value="datos.nombre" disabled />
        <CInputGroupText class="headercolor" as="label">
            <i class="bi bi-person-vcard me-2"></i>{{ datos?.idpName }} :
        </CInputGroupText>
        <CFormInput type="text" :value="datos?.idp" disabled />
    </CInputGroup>

    <CInputGroup size="sm" class="mb-3">
        <CInputGroupText class="headercolor" as="label">
            <i class="bi bi-person-badge-fill me-2"></i>Cargo : 
        </CInputGroupText>
        <CFormInput type="text" :value="datos?.cargo" disabled />
    </CInputGroup>

    <CInputGroup size="sm" class="mb-3 d-none d-md-flex">
        <CInputGroupText class="headercolor" as="label">
            <i class="bi bi-person-rolodex me-2"></i>Centro de Costos :
        </CInputGroupText>
        <CFormInput type="text" :value="datos?.centroCostos" disabled />
        <CInputGroupText class="headercolor" as="label">
            <i class="bi bi-braces me-2"></i>CC : 
        </CInputGroupText>
        <CFormInput type="text" :value="datos?.codigo" disabled />
    </CInputGroup>

    <div class="d-md-none mb-3">
        <CInputGroup size="sm" class="mb-3">
            <CInputGroupText class="headercolor" as="label">
                <i class="bi bi-person-rolodex me-2"></i>C Costos :
            </CInputGroupText>
            <CFormInput type="text" :value="datos?.centroCostos" disabled />

        </CInputGroup>
        <CInputGroup size="sm" class="mb-3">
            <CInputGroupText class="headercolor" as="label">
                <i class="bi bi-braces me-2"></i>CC : </CInputGroupText>
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
import 'bootstrap-icons/font/bootstrap-icons.css'
</script>