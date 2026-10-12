<template>

    <CInputGroup size="sm" class="mb-3">
        <CInputGroupText class="headercolor" as="label">
            A / G :
        </CInputGroupText>
        <CFormInput type="text" v-model="datos.actividad" disabled/>
    </CInputGroup>

    <!-- Movile-->
    <div class="d-md-none mb-3">
        <CInputGroup size="sm" class="mb-3">
            <CInputGroupText class="headercolor" as="label">Del : </CInputGroupText>
            <CFormInput type="date" v-model="datos.del" disabled/>

            <CInputGroupText class="headercolor" as="label">Al : </CInputGroupText>
            <CFormInput type="date" v-model="datos.al" disabled/>
        </CInputGroup>
        <CInputGroup size="sm" class="mb-3">
            <CInputGroupText class="headercolor" as="label">
                <i class="bi bi-calendar-date me-2"></i>Total Dias :
            </CInputGroupText>
            <CFormInput type="text" :value="getDias(datos.del, datos.al)" disabled />
        </CInputGroup>

        <CInputGroup size="sm" class="mb-3">
            <CInputGroupText class="headercolor" as="label">
                <i class="bi bi-people me-2"></i>Participantes :
            </CInputGroupText>
            <CFormInput type="text" v-model="datos.participantes" disabled/>
        </CInputGroup>
    </div>

    <!-- PC-->
    <CInputGroup size="sm" class="mb-3 d-none d-md-flex">
        <CInputGroupText class="headercolor" as="label">Del : </CInputGroupText>
        <CFormInput type="date" v-model="datos.del" disabled/>

        <CInputGroupText class="headercolor" as="label">Al : </CInputGroupText>
        <CFormInput v-model="datos.al" disabled/>

        <CInputGroupText class="headercolor" as="label">
            <i class="bi bi-calendar-date me-2"></i>Total Dias : {{ getDias(datos.del, datos.al) }}
        </CInputGroupText>
    </CInputGroup>

    <CInputGroup size="sm" class="mb-3 d-none d-md-flex">
        <CInputGroupText class="headercolor" as="label">
            <i class="bi bi-people me-2"></i>Participantes :
        </CInputGroupText>
        <CFormInput type="text" v-model="datos.participantes" disabled/>
    </CInputGroup>

    <CFormTextarea label="Descripcion Actividad :" disabled>
        {{ datos.detalle }}
    </CFormTextarea>
    <br>
</template>

<script setup>
const props = defineProps({
    datos: {
        type: Object,
        required: true
    }
})

import { useFunction } from '@/composables/useFunction'
const { getDias } = useFunction()

</script>