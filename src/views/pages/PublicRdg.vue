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
                            <CChip :color="getColor(rdg.estado)">
                                <span class="chip-icon">
                                    <i :class="getIcono(rdg.estado)"></i>
                                </span>{{ rdg.estado }}
                            </CChip>
                        </div>
                    </CCardHeader>
                    <CCardBody>
                        <CRow>
                            <CCol :xs="12" :sm="5" :md="5" :lg="5">
                                <h5><strong>{{ rdg.formato?.titulo }}</strong></h5>
                            </CCol>
                            <CCol :xs="12" :sm="4" :md="4" :lg="4" class="text-end">
                                <h3>{{ formatearNumero(rdg.importe) }} {{ rdg.moneda }}</h3>
                                <div class="space">Importe Recibido</div>
                            </CCol>
                            <CCol :xs="12" :sm="3" :md="3" :lg="3" class="text-end">
                                <h3><strong>No.: {{ rdg.numero }}</strong> </h3>
                                <div class="space">********** | {{ rdg.gestion }}</div>
                            </CCol>
                        </CRow>
                        <CAlert color="success">Fecha: {{ rdg.fecha }}</CAlert>
                        <CAlert color="secondary">I. {{ rdg.formato?.seccionUno }}</CAlert>
                        <ComponentePublico1 :datos="rdg" />
                        
                        <CAlert color="secondary">II. {{ rdg.formato?.seccionDos }}</CAlert>
                        <ComponentePublico2 :datos="rdg" />
                        <CAlert color="secondary">III. {{ rdg.formato?.seccionTres }}</CAlert>
                        <ComponentePublico3 :datos="rdg" />
                    </CCardBody>
                    <CCardFooter class="text-center">
                        <CButton @click="login" color="primary" class="px-4">
                            <CIcon icon="cil-user" class="me-2" />
                                Ver Detalles del Formulario
                        </CButton>
                    </CCardFooter>
                </CCard>
            </CCol>
            <CCol :xs="0" :sm="2" :md="2" :lg="2" class="align-self-end">

            </CCol>
        </CRow>
    </CContainer>
</template>

<script setup>
const publicoProps = defineProps({
    idRdg: {
        type: String,
        required: true
    }
})
import 'bootstrap-icons/font/bootstrap-icons.css'
import { onMounted } from 'vue'
import { useFunction } from '@/composables/useFunction'
const { formatearNumero, getColor, getIcono } = useFunction()

import ComponentePublico1 from '@/components/rdg/ComponentePublico1.vue'
import ComponentePublico2 from '@/components/rdg/ComponentePublico2.vue'
import ComponentePublico3 from '@/components/rdg/ComponentePublico3.vue'

import { useRouter } from 'vue-router'
const router = useRouter()

import { useRdg } from '@/composables/useRdg'
const { getRdgPublicoUse, rdg } = useRdg()

const login = () => {
    router.push({
        name: 'Home'
    })

}
onMounted(async () => {
    await getRdgPublicoUse(publicoProps.idRdg)
})
</script>