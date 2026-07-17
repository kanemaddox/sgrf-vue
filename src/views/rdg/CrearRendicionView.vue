<template>
    <CRow>
        <CCol :xs="0" :sm="0" :md="1" :lg="1" class="align-self-start">
        </CCol>
        <CCol :xs="12" :sm="12" :md="10" :lg="10" class="align-self-center">
            <CCard>
                <CCardHeader class="headercolor justify-content-between align-items-center">
                    <CRow>
                        <CCol :xs="12" :sm="6" :md="6" :lg="6">
                            <div class="align-items-center">
                                <CIcon icon="cil-description" size="lg" class="me-2 text-light" />
                                <label class="mb-0 fs-6 text-white">{{ valores.titulo }}</label>
                            </div>
                        </CCol>
                        <CCol :xs="12" :sm="3" :md="3" :lg="3" class="text-end">
                            Formulario de Solicitud : 
                        </CCol>
                        <CCol :xs="12" :sm="3" :md="3" :lg="3" class="text-end">
                            <h4> No. {{ datos.numeroSrf }}</h4>
                            <div class="space">{{ datos.idp }} {{ datos.gestionSrf }}</div>
                        </CCol>
                    </CRow>
                </CCardHeader>
                <CCardBody>
                    <component :is="steps[currentStep]" :datos="datos" :valores="valores" ref="currentStepRef" />
                </CCardBody>
                <CCardFooter class="text-end">
                    <CButtonGroup role="group" size="lg">
                        <CButton color="secondary" @click="prevStep" :disabled="currentStep === 0">
                            Anterior <i class="bi bi-arrow-bar-left"></i>
                        </CButton>

                        <CButton color="warning" v-if="currentStep < steps.length - 1" @click="nextStep">
                            <i class="bi bi-arrow-bar-right"></i> Siguiente
                        </CButton>
                        <CButton color="success" class="font" v-else @click="submitForm">
                            <i class="bi bi-floppy me-2"></i> Crear
                        </CButton>
                    </CButtonGroup>
                </CCardFooter>
            </CCard>
        </CCol>
        <CCol :xs="0" :sm="0" :md="1" :lg="1" class="align-self-end">
        </CCol>
    </CRow>


</template>
<script setup>
const createRdg = defineProps({
    idRdg: {
        type: String,
        required: true
    }
})

import 'bootstrap-icons/font/bootstrap-icons.css'
import { nextTick, ref, reactive, computed, onMounted } from 'vue'
import ComponenteActividad from '@/components/rdg/ComponenteActividad.vue'
import ComponenteData from '@/components/rdg/ComponenteData.vue'
import ComponenteDetalle from '@/components/rdg/ComponenteDetalle.vue'


import { useAuthStore } from '@/stores/authStores'
const auth = useAuthStore()
const persona = auth.persona
const idUsuario = ref(auth.idUsuario)
const idpName = ref(auth.idpName)

import { useSettings } from '@/composables/useSettings'
const { getSettingsUse, getFormatoRdgUse, formatoRDG } = useSettings()

import { useRdg } from '@/composables/useRdg'
import { CCardFooter } from '@coreui/vue'
const { getRdgUsuarioUse, getRdgUse, rdg } = useRdg()

const steps = [ComponenteData, ComponenteActividad, ComponenteDetalle]
const currentStep = ref(0)
const currentStepRef = ref(null);

const datos = reactive({
    idRdg: 0,
    nombre: '',
    idp: '',
    idpName: '',
    cargo: '',
    area: '',
    centrocostos: '',
    codigo: '',
    tipo: '',
    cuenta: '',
    banco: '',
    importe: 0,
    moneda: '',
    listaGasto: [],
    actividad: '',
    del: '',
    al: '',
    detalle: '',
    participantes: '',
    gasto: 0,
    saldo: 0,
    rembolso: 0,
    devolver: 0,
    listaCuentaGasto: [],
    formato: null,
    numeroSrf: '',
    gestionSrf: 0
})


const nextStep = () => {
    if (currentStepRef.value && typeof currentStepRef.value.validarPaso === 'function') {
        const esValido = currentStepRef.value.validarPaso();

        if (!esValido) {
            return
        }
    }
    // Aquí podrías añadir validaciones antes de pasar al siguiente paso
    if (currentStep.value < steps.length - 1) {
        currentStep.value++
    } else {
        enviarFormularioCompleto();
    }
}
const prevStep = () => {
    if (currentStep.value > 0) {
        currentStep.value--
    }
}

const submitForm = () => {
    //console.log('Formulario enviado con éxito:', JSON.stringify(datos))
    console.log(datos)
    alert('¡Formulario enviado con éxito!')
}

const valores = ref({
    titulo: "",
    seccionUno: "",
    seccionDos: "",
    seccionTres: "",
})

const getLoadData = () => {
    valores.value = { ...formatoRDG.value }
    datos.idRdg = rdg.idRdg
    datos.nombre = rdg.nombre
    datos.idp = rdg.idp
    datos.idpName = idpName
    datos.cargo = rdg.cargo
    datos.area = rdg.area
    datos.centrocostos = rdg.centrocostos
    datos.codigo = rdg.codigo
    datos.tipo = rdg.tipo
    datos.cuenta = rdg.cuenta
    datos.banco = rdg.banco
    datos.importe = rdg.importe
    datos.moneda = rdg.moneda
    datos.listaGasto = []
    datos.actividad = rdg.actividad
    datos.del = rdg.del
    datos.al = rdg.al
    datos.detalle = rdg.detalle || ''
    datos.participantes = rdg.participantes || ''
    datos.gasto = rdg.gasto
    datos.saldo = rdg.saldo
    datos.rembolso = rdg.rembolso
    datos.devolver = rdg.devolver
    datos.listaCuentaGasto = rdg.cuentaGasto
    datos.formato = valores.value
    datos.numeroSrf = rdg.numeroSrf
    datos.gestionSrf = rdg.gestionSrf
}

onMounted(async () => {
    const tooltips = document.querySelectorAll('.tooltip');
    tooltips.forEach(tooltip => tooltip.remove());
    await getFormatoRdgUse()
    await getRdgUsuarioUse(createRdg.idRdg, persona.id)
    getLoadData()

})

</script>