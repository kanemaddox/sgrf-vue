<template>
    <CContainer>
        <CRow class="justify-content-center">
            <CCol :xs="0" :sm="2" :md="2" :lg="2" class="align-self-start">

            </CCol>
            <CCol :xs="12" :sm="8" :md="8" :lg="8" class="align-self-center">
                <CCard>
                    <CCardHeader class="headercolor justify-content-between align-items-center">
                        <div class="align-items-center">
                            <CIcon icon="cil-description" size="lg" class="me-2 text-light" />
                            <CChip :color="getColor(srf.estado)">
                                <span class="chip-icon">
                                    <i :class="getIcono(srf.estado)"></i>
                                </span>{{ srf.estado }}
                            </CChip>
                        </div>
                    </CCardHeader>
                    <CCardBody>
                        <CRow>
                            <CCol :xs="12" :sm="8" :md="8" :lg="8">
                                <h5><strong>{{ srf.formato?.titulo }}</strong></h5>
                            </CCol>
                            <CCol :xs="12" :sm="4" :md="4" :lg="4" class="text-end">
                                <h3><strong>No.: {{ srf.numero }}</strong> </h3>
                                <div class="space">{{ srf.codigo }}</div>
                            </CCol>
                        </CRow>
                        <CAlert color="success">Fecha de solicitud: {{ srf.fechaInicio }}</CAlert>

                        <CAlert color="secondary">II. {{ srf.formato?.seccionDos }}</CAlert>

                        <CInputGroup size="sm" class="mb-3 d-none d-md-flex">
                            <CInputGroupText class="headercolor" as="label">
                                <i class="bi bi-calendar-event me-2"></i>{{ srf.formato?.fechaTitulo }} :
                            </CInputGroupText>
                            <CFormInput type="text" :value="srf.fechaFin" disabled />
                            <CInputGroupText class="headercolor" as="label">
                                <i class="bi bi-currency-dollar me-2"></i>{{ srf.formato?.montoTitulo }} :
                            </CInputGroupText>
                            <CFormInput type="text" :value="`${formatearNumero(srf.monto)} ${srf.moneda}`" disabled />
                        </CInputGroup>

                        <!-- Movile-->
                        <div class="d-md-none mb-3">
                            <CInputGroup size="sm" class="mb-3">
                                <CInputGroupText class="headercolor" as="label">
                                    <i class="bi bi-calendar-event me-2"></i>{{ srf.formato?.fechaTitulo }} :
                                </CInputGroupText>
                                <CFormInput type="text" :value="srf.fechaFin" disabled />
                            </CInputGroup>

                            <CInputGroup size="sm" class="mb-3">
                                <CInputGroupText class="headercolor" as="label">
                                    <i class="bi bi-currency-dollar me-2"></i>{{ srf.formato?.montoTitulo }} :
                                </CInputGroupText>
                                <CFormInput type="text" :value="`${formatearNumero(srf.monto)} ${srf.moneda}`"
                                    disabled />
                            </CInputGroup>
                        </div>

                        {{ srf.formato?.descripcion }} :
                        <CAlert color="secondary">
                            {{ srf.detalle }}
                        </CAlert>

                        <hr>
                        <div v-if="srf.formato?.trueEstadoDos">
                            <CInputGroup size="sm" class="mb-3">
                                <CInputGroupText class="headercolor" as="label">
                                    <i class="bi bi-person-vcard-fill me-2"></i>{{ srf.formato?.detalleDos }} :
                                </CInputGroupText>
                                <CFormInput type="text" :value="srf.texto" disabled />

                                <CInputGroupText class="headercolor" as="label">
                                    <i class="bi bi-list-ol me-2"></i>{{ srf.formato?.cantidadDos }} :
                                </CInputGroupText>
                                <CFormInput type="text" :value="srf.numerico" disabled />
                            </CInputGroup>
                        </div>

                        <div v-if="srf.formato?.estadoTres">
                            <CAlert color="secondary">III. {{ srf.formato?.seccionTres }}</CAlert>
                            <CAlert>{{ srf.formato?.detalle }}</CAlert>
                        </div>

                    </CCardBody>
                    <CCardFooter class="text-center">
                        <CButton @click="login" color="primary" class="px-4">
                            <CIcon icon="cil-user" class="me-2" />
                            Ver Detalles del Formulario
                        </CButton>
                    </CCardFooter>
                </CCard>
                <br></br>
            </CCol>
            <CCol :xs="0" :sm="2" :md="2" :lg="2" class="align-self-end">

            </CCol>

        </CRow>
    </CContainer>
</template>
<script setup>
const publicoProps = defineProps({
    idSrf: {
        type: String,
        required: true
    }
})
import 'bootstrap-icons/font/bootstrap-icons.css'
import { onMounted } from 'vue'
import { useFunction } from '@/composables/useFunction'
const { formatearNumero, getColor, getIcono } = useFunction()

import { useAlert } from '@/composables/useAlert'
const { dataLoading, close } = useAlert()

import { useRouter } from 'vue-router'
const router = useRouter()

import { useSrf } from '@/composables/useSrf'
const { getSrfPublicoUse, srf } = useSrf()

const login = () => {
    router.push({
        name: 'Home'
    })
}
onMounted(async () => {
    dataLoading()
    try{
        await getSrfPublicoUse(publicoProps.idSrf)
    }finally{
        close()
    }
})
</script>