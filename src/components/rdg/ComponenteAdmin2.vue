<template>

    <CInputGroup size="sm" v-if="datos.idSrf === 0" class="mb-3 d-none d-md-flex">
        <CInputGroupText class="headercolor" as="label">Moneda : </CInputGroupText>
        <CFormInput type="text" v-model="datos.moneda" disabled />
    </CInputGroup>

    <CInputGroup size="sm" class="mb-3">
        <CInputGroupText class="headercolor" as="label">
            <i class="bi bi-person-rolodex me-2"></i> A / G :
        </CInputGroupText>
        <CFormInput type="text" v-model="datos.actividad" disabled />
    </CInputGroup>

    <!-- Movile-->
    <div class="d-md-none mb-3">
        <CInputGroup size="sm" class="mb-3">
            <CInputGroupText class="headercolor" as="label">
                <i class="bi bi-calendar3-week me-2"></i>Del : 
            </CInputGroupText>
            <CFormInput type="date" v-model="datos.del" disabled />

            <CInputGroupText class="headercolor" as="label">
                <i class="bi bi-calendar3-week-fill me-2"></i>Al : 
            </CInputGroupText>
            <CFormInput type="date" v-model="datos.al" disabled />
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
            <CFormInput type="text" v-model="datos.participantes" disabled />
        </CInputGroup>
    </div>

    <!-- PC-->
    <CInputGroup size="sm" class="mb-3 d-none d-md-flex">
        <CInputGroupText class="headercolor" as="label">
            <i class="bi bi-calendar3-week me-2"></i>Del : 
        </CInputGroupText>
        <CFormInput type="date" v-model="datos.del" disabled />

        <CInputGroupText class="headercolor" as="label">
            <i class="bi bi-calendar3-week-fill me-2"></i>Al : 
        </CInputGroupText>
        <CFormInput type="date" v-model="datos.al" disabled />

        <CInputGroupText class="headercolor" as="label">
            <i class="bi bi-calendar-date me-2"></i>Total Dias : 
        </CInputGroupText>
        <CFormInput type="text" :value="getDias(datos.del, datos.al)" disabled />
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