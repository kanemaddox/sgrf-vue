<template>
    <form ref="formRef" @submit.prevent novalidate>
        <CRow>
            <CCol :xs="12" :sm="8" :md="8" :lg="8">
                <CAlert color="success">II. {{ valores.seccionDos }}</CAlert>
            </CCol>
            <CCol :xs="12" :sm="4" :md="4" :lg="4" class="text-end">
                <h3>{{ datos.importe }} {{ datos.moneda }}</h3>
                <div class="space">Importe Recibido</div>
            </CCol>
            <h2></h2>
        </CRow>

        <input type="hidden" v-model="datos.importe" v-maska="maskOptions">
        <CInputGroup size="sm" v-if="datos.importe===0" class="mb-3 d-none d-md-flex">
            <CInputGroupText class="headercolor" as="label">Moneda : </CInputGroupText>
            <CFormSelect v-model="datos.moneda" required >
                <option value="">Moneda</option>
                <option value="USD">Dollar</option>
                <option value="PESOS">Pesos</option>
                <option value="EUR">Euros</option>
            </CFormSelect>
        </CInputGroup>

        <CInputGroup size="sm" class="mb-3">
            <CInputGroupText class="headercolor" as="label">
                A / G :
            </CInputGroupText>
            <CFormInput type="text" v-model="datos.actividad" :disabled ="datos.importe!==0" placeholder="ACTIVIDAD / GASTO REALIZADO" required />
        </CInputGroup>

        <!-- Movile-->
        <div class="d-md-none mb-3">
            <CInputGroup size="sm" class="mb-3">
                <CInputGroupText class="headercolor" as="label">Del : </CInputGroupText>
                <CFormInput type="date" v-model="datos.del" required />
                <CInputGroupText class="headercolor" as="label">Al : </CInputGroupText>
                <CFormInput type="date" v-model="datos.al" required />
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
            <CFormInput type="text" v-model="datos.participantes" required />
        </CInputGroup>

        </div>
        <!-- PC-->
        <CInputGroup size="sm" class="mb-3 d-none d-md-flex">
            <CInputGroupText class="headercolor" as="label">Del : </CInputGroupText>
            <CFormInput type="date" v-model="datos.del" required />

            <CInputGroupText class="headercolor" as="label">Al : </CInputGroupText>
            <CFormInput type="date" v-model="datos.al" required />

            <CInputGroupText class="headercolor" as="label">
                <i class="bi bi-calendar-date me-2"></i>Total Dias : {{ getDias(datos.del, datos.al) }}
            </CInputGroupText>

            <CInputGroupText class="headercolor" as="label">
                <i class="bi bi-people me-2"></i>Participantes : 
            </CInputGroupText>
            <CFormInput type="text" v-model="datos.participantes" required />
            
        </CInputGroup>

        <CFormTextarea label="Descripcion Actividad :" v-model="datos.detalle" rows="2"
            :text="getCantidadCaracteres(250, datos.detalle.length)" maxlength="250" required>
        </CFormTextarea>
    </form>

</template>

<script setup>
const props = defineProps({
    datos: {
        type: Object,
        required: true
    },
    valores: {
        type: Object,
        required: true
    }
})
import { vMaska } from "maska/vue"
import { ref, reactive } from 'vue'

import { useFunction } from '@/composables/useFunction'
import { CForm } from "@coreui/vue"
const { getDias, getCantidadCaracteres } = useFunction()

const formRef = ref(null);

const maskOptions = reactive({
    mask: "0.99",
    tokens: {
        "0": { pattern: /\d/, multiple: true },
        "9": { pattern: /\d/, optional: true }
    }
})

// Función que será llamada desde el Padre
const validarPaso = () => {
    if (formRef.value) {
        formRef.value.classList.add('was-validated');
        return formRef.value.checkValidity();
    }
    return false;
}

defineExpose({
    validarPaso
})

</script>