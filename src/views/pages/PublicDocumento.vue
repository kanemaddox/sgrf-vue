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
                        <div class="md-3 text-center">
                            <img :src="image" class="img-fluid rounded shadow-sm" />
                            <div class="watermark-overlay">
                                <span>{{ rdg.documento }} 
                                    <br>{{ rdg.fecha }} 
                                    <br>{{ formatearNumero(rdg.importe) }} {{ rdg.moneda }}<br>
                                    DOCUMENTO PUBLICO
                                </span>
                            </div>
                        </div>
                    </CCardBody>
                    <CCardFooter class="text-center">
                        <CButton @click="login" color="primary" class="px-4">
                            <CIcon icon="cil-user" class="me-2" />
                            Ver Detalles del Documento
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
    idDetalle: {
        type: String,
        required: true
    }
})
import 'bootstrap-icons/font/bootstrap-icons.css'
import { ref, onMounted } from 'vue'
import { useFunction } from '@/composables/useFunction'
const { formatearNumero, getColor, getIcono } = useFunction()

import { useRouter } from 'vue-router'
const router = useRouter()

import { useRdg } from '@/composables/useRdg'
const { getDocumentoPublicoUse, rdg } = useRdg()

import { API_FILE_IMG800 } from "@/env"
const img800 = API_FILE_IMG800

const image = ref('')
const login = () => {
    router.push({
        name: 'Home'
    })

}
const getLoadData = () => {
    image.value = img800 + rdg.archivo + '.jpg'
}
onMounted(async () => {
    await getDocumentoPublicoUse(publicoProps.idDetalle)
    getLoadData()
})
</script>

<style scoped>
/* Estilos para la marca de agua */
.watermark-overlay {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    pointer-events: none; /* Permite que los clicks o interacciones traspasen la marca de agua */
    user-select: none;    /* Evita que el usuario pueda seleccionar el texto */
    z-index: 10;
}

.watermark-overlay span {
    font-size: 2rem;
    font-weight: 800;
    color: rgba(158, 2, 18, 0.55); /* Color semi-transparente (puedes ajustar el opacidad en el último número) */
    text-transform: uppercase;
    transform: rotate(-30deg);       /* Rotación diagonal */
    white-space: nowrap;
    border: 3px solid rgba(158, 2, 18, 0.35);
    padding: 10px 20px;
    border-radius: 8px;
    letter-spacing: 2px;
}

/* Ajuste opcional para pantallas pequeñas */
@media (max-width: 576px) {
    .watermark-overlay span {
        font-size: 1.2rem;
        padding: 5px 10px;
    }
}
</style>