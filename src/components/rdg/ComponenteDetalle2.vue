<template>

    <CInputGroup size="sm" v-if="datos.idSrf === 0" class="mb-3 d-none d-md-flex">
        <CInputGroupText class="headercolor" as="label">Moneda : </CInputGroupText>
        <CFormSelect v-model="datos.moneda" required :disabled="!datos.isEdit">
            <option value="">Moneda</option>
            <option value="USD">Dollar</option>
            <option value="PESOS">Pesos</option>
            <option value="EUR">Euros</option>
        </CFormSelect>
    </CInputGroup>

    <CInputGroup size="sm" class="mb-3">
        <CInputGroupText class="headercolor" as="label">
            <i class="bi bi-person-rolodex me-2"></i> A / G :
        </CInputGroupText>
        <CFormInput v-if="datos.idSrf === 0" type="text" v-model="datos.actividad" :disabled="!datos.isEdit" />
        <CFormInput v-else type="text" v-model="datos.actividad" disabled />
    </CInputGroup>

    <!-- Movile-->
    <div class="d-md-none mb-3">
        <CInputGroup size="sm" class="mb-3">
            <CInputGroupText class="headercolor" as="label">
                <i class="bi bi-calendar3-week me-2"></i>Del : 
            </CInputGroupText>
            <CFormInput v-if="datos.idSrf === 0" type="date" v-model="datos.del" :disabled="!datos.isEdit" />
            <CFormInput v-else type="date" v-model="datos.del" disabled />

            <CInputGroupText class="headercolor" as="label">
                <i class="bi bi-calendar3-week-fill me-2"></i>Al : 
            </CInputGroupText>
            <CFormInput type="date" v-model="datos.al" :disabled="!datos.isEdit" :min="datos.minFecha"
                @change="validarFecha" @keydown="bloquearTeclado" required />
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
            <CFormInput type="text" v-model="datos.participantes" :disabled="!datos.isEdit" required />
        </CInputGroup>
    </div>

    <!-- PC-->
    <CInputGroup size="sm" class="mb-3 d-none d-md-flex">
        <CInputGroupText class="headercolor" as="label">
            <i class="bi bi-calendar3-week me-2"></i>Del : 
        </CInputGroupText>
        <CFormInput v-if="datos.idSrf === 0" type="date" v-model="datos.del" :disabled="!datos.isEdit" />
        <CFormInput v-else type="date" v-model="datos.del" disabled />

        <CInputGroupText class="headercolor" as="label">
            <i class="bi bi-calendar3-week-fill me-2"></i>Al : 
        </CInputGroupText>
        <CFormInput type="date" v-model="datos.al" :disabled="!datos.isEdit" :min="datos.minFecha"
            @change="validarFecha" @keydown="bloquearTeclado" required />

        <CInputGroupText class="headercolor" as="label">
            <i class="bi bi-calendar-date me-2"></i>Total Dias : 
        </CInputGroupText>
        <CFormInput type="text" :value="getDias(datos.del, datos.al)" disabled />
    </CInputGroup>

    <CInputGroup size="sm" class="mb-3 d-none d-md-flex">
        <CInputGroupText class="headercolor" as="label">
            <i class="bi bi-people me-2"></i>Participantes :
        </CInputGroupText>
        <CFormInput type="text" v-model="datos.participantes" :disabled="!datos.isEdit" required />
    </CInputGroup>

    <CFormTextarea label="Descripcion Actividad :" :disabled="!datos.isEdit" maxlength="250" required>
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

import { ref } from 'vue'
import { useFunction } from '@/composables/useFunction'
const { getDias } = useFunction()

const hoy = ref(null)
const fechaSeleccionada = ref('')

const validarFecha = (e) => {
    const valor = e.target.value
    if (valor && valor < hoy) {
        fechaSeleccionada.value = hoy
    }
}

const bloquearTeclado = (e) => {
    e.preventDefault()
}

</script>