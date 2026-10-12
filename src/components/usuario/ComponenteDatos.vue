<template>
    <!--PC-->
    <CInputGroup size="sm" class="d-none mb-3 d-md-flex">
        <CInputGroupText class="headercolor" as="label">
            <i class="bi bi-person-vcard me-2"></i>{{ idpName }} :
        </CInputGroupText>
        <CFormInput type="text" :value="persona.idp" disabled />
        <CInputGroupText class="headercolor" as="label">ID App : </CInputGroupText>
        <CFormInput type="text" :value="persona.id" disabled />
    </CInputGroup>

    <CInputGroup size="sm" class="d-none mb-3 d-md-flex">
        <CInputGroupText class="headercolor" as="label">
            <i class="bi bi-person me-2"></i>Nombre Completo :
        </CInputGroupText>
        <CFormInput type="text" :value="`${persona.nombre} ${persona?.paterno} ${persona?.materno}`" disabled />
    </CInputGroup>

    <CInputGroup size="sm" class="mb-3 d-none d-md-flex">
        <CInputGroupText class="headercolor" as="label">
            <i class="bi bi-envelope-at me-2"></i>Email :
        </CInputGroupText>
        <CFormInput type="text" :value="persona.email" disabled />
        <CInputGroupText class="headercolor" as="label">
            <i class="bi bi-phone me-2"></i>Celular :
        </CInputGroupText>
        <CFormInput type="text" :value="persona.celular" disabled />
    </CInputGroup>
    <!--PC-->

    <!--Movil-->
    <div class="d-md-none mb-3">
        <CInputGroup size="sm" class="mb-3">
            <CInputGroupText class="headercolor" as="label">
                <i class="bi bi-person-vcard me-2"></i>{{ idpName }} :
            </CInputGroupText>
            <CFormInput type="text" :value="persona.idp" disabled />
        </CInputGroup>

        <CInputGroup size="sm" class="mb-3">
            <CInputGroupText class="headercolor" as="label">ID App : </CInputGroupText>
            <CFormInput type="text" :value="persona.id" disabled />
        </CInputGroup>

        <CInputGroup size="sm" class="mb-3">
            <CFormInput type="text" :value="`${persona.nombre} ${persona?.paterno} ${persona?.materno}`" disabled />
        </CInputGroup>

        <CInputGroup size="sm" class="mb-3">
            <CInputGroupText class="headercolor" as="label">
                <i class="bi bi-envelope-at me-2"></i>Email :
            </CInputGroupText>
            <CFormInput type="text" :value="persona.email" disabled />
        </CInputGroup>
        <CInputGroup size="sm" class="mb-3">
            <CInputGroupText class="headercolor" as="label">
                <i class="bi bi-phone me-2"></i>Celular :
            </CInputGroupText>
            <CFormInput type="text" :value="persona.celular" disabled />
        </CInputGroup>
    </div>
    <!--Movil-->

</template>

<script setup>
const props = defineProps({
    persona: {
        type: Object,
        required: true
    },
    idpName: { type: String, required: true }
})
import 'bootstrap-icons/font/bootstrap-icons.css'
</script>
