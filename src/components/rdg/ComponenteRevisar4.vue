<template>

    <CRow>
        <div class="text-end">
            Fondos por devolver a la oficina
            <CChip variant="outline" color="danger">
                <label class="total">{{ formatearNumero(datos.devolver) }}</label> {{ datos.moneda }}
            </CChip>
        </div>
    </CRow>
    <br>
    <CRow class="table-responsive">
        <CTable small hover responsive>
            <CTableHead color="dark">
                <CTableRow>
                    <CTableHeaderCell scope="col">#</CTableHeaderCell>
                    <CTableHeaderCell scope="col">Doc.</CTableHeaderCell>
                    <CTableHeaderCell scope="col">Datos</CTableHeaderCell>
                    <CTableHeaderCell scope="col" :style="{ minWidth: '200px' }">Detalle</CTableHeaderCell>
                    <CTableHeaderCell scope="col">Importe</CTableHeaderCell>
                </CTableRow>
            </CTableHead>
            <CTableBody>
                <CTableRow v-for="(value, index) in datos.deposito" :key="value.id" @click="getModal(value.id)" style="cursor: pointer;">
                    <CTableHeaderCell scope="row">{{ index + 1 }}</CTableHeaderCell>
                    <CTableDataCell>
                        <img :src="getImg(value.archivo, '/sn100.png', img100)" class="img-fluid " alt="...">
                    </CTableDataCell>
                    <CTableDataCell>
                        <div class="small text-body-secondary text-nowrap">
                            <span><strong>Fecha : </strong>{{ fecha(value.fecha) }}</span><br>
                            <span><strong>Ref. : </strong>{{ value.documento }}</span><br>
                            <span><strong>Numero : </strong>{{ value.numero }}</span>
                        </div>
                    </CTableDataCell>

                    <CTableDataCell>{{ value.detalle }}</CTableDataCell>
                    <CTableDataCell>
                        <span class="text-nowrap">{{ formatearNumero(value.deposito) }} {{ datos.moneda }}</span>
                    </CTableDataCell>
                </CTableRow>
            </CTableBody>
        </CTable>
    </CRow>

    <!-- Modal  Ver -->
    <CModal :visible="modalDocumento" :size="preview" backdrop="static" @close="clickModalDocumento(false)">
        <!-- Header -->
        <CModalHeader class="headercolor" dismiss @close="clickModalDocumento(false)">
            <CModalTitle>
                <h6>
                    <CIcon icon="cil-description" size="lg" class="me-2" />Fondos por devolver a la oficina
                </h6>
            </CModalTitle>
        </CModalHeader>
        <!-- Body -->
        <CModalBody>
            <CRow>
                <!-- Previsualización de Imagen / PDF -->
                <CCol v-if="preview === 'lg'" :xs="12" :sm="7" :md="7" :lg="7">
                    <ComponenteImagen :imagen="rdgPdf" />
                </CCol>

                <!-- Campos del Formulario -->
                <CCol :xs="12" :sm="preview === 'lg' ? 5 : 12" :md="preview === 'lg' ? 5 : 12"
                    :lg="preview === 'lg' ? 5 : 12">
                    <br>
                    <!-- Fecha -->
                    <CInputGroup size="sm" class="mb-3">
                        <CInputGroupText as="label" class="headercolor">
                            Fecha :
                        </CInputGroupText>
                        <CFormInput type="date" :value="fecha(devolver.fecha)" disabled />
                    </CInputGroup>

                    <!-- Número de Documento -->
                    <CInputGroup size="sm" class="mb-3">
                        <CInputGroupText as="label" class="headercolor">Ref. :
                        </CInputGroupText>
                        <CFormInput type="text" :value="devolver.documento" disabled />
                    </CInputGroup>

                    <!-- Número de Documento -->
                    <CInputGroup size="sm" class="mb-3">
                        <CInputGroupText as="label" class="headercolor">No. {{ devolver.documento || '' }} :
                        </CInputGroupText>
                        <CFormInput type="text" :value="devolver.numero" disabled />
                    </CInputGroup>

                    <!-- Detalle -->
                    <CFormTextarea label="Detalle : " :value="devolver.detalle" rows="2" disabled>
                    </CFormTextarea>
                    <hr>
                    <!-- Importe y Moneda -->
                    <CInputGroup size="sm" class="mb-3">
                        <CInputGroupText as="label" class="headercolor">
                            Deposito :
                        </CInputGroupText>
                        <CFormInput type="text" :value="devolver.deposito" disabled />
                    </CInputGroup>
                </CCol>
            </CRow>
        </CModalBody>
        <!-- Footer -->
        <CModalFooter>
            <CButton @click="clickModalDocumento(false)" color="danger" class="font" size="sm">
                <CIcon icon="cil-x" class="me-2" />Cancelar
            </CButton>
            <CButton @click="clickModalDocumento(false)" class="font" color="success" size="sm">
                <CIcon icon="cil-check" class="me-2" />
                <span>Aceptar</span>
            </CButton>
        </CModalFooter>
    </CModal>

</template>

<script setup>
const props = defineProps({
    datos: {
        type: Object,
        required: true
    }
})

import 'bootstrap-icons/font/bootstrap-icons.css'
import { ref, reactive} from 'vue'

import ComponenteImagen from '@/components/imagen/ComponenteImagen.vue'
import { useFunction} from '@/composables/useFunction'
const { formatearNumero, getImg, fecha } = useFunction()

import { API_FILE_IMG100, API_FILE_IMG800 } from "@/env"
const img100 = API_FILE_IMG100
const img800 = API_FILE_IMG800

const rdgPdf = ref('')
const preview = ref(null)
const modalDocumento = ref(false)

const devolver = reactive({
    id: '',
    fecha: '',
    detalle: '',
    importe: 0,
    gasto: 0,
    deposito: 0,
    moneda: '',
    documento: 'Documento',
    archivo: '',
    numero: '',
    token: '',
    agregado: ''
})

const clickModalDocumento = (value) => {
    modalDocumento.value = value
}

const getModal = (value) => {
    preview.value = 'xl'
    const devolverEncontrado = props.datos.deposito.find(el => Number(el.id) === Number(value))
    getDevolver(devolverEncontrado)
    if (devolverEncontrado.archivo !== 'ninguno') {
        rdgPdf.value = getImg(devolverEncontrado.archivo, '/sn.png', img800)
        preview.value = 'lg'
    }
    clickModalDocumento(true)
}

const getDevolver = (devolverEncontrado) => {
    devolver.id = devolverEncontrado.id
    devolver.fecha = fecha(devolverEncontrado.fecha)
    devolver.detalle = devolverEncontrado.detalle
    devolver.importe = devolverEncontrado.importe
    devolver.gasto = devolverEncontrado.gasto
    devolver.deposito = formatearNumero(devolverEncontrado.deposito) + " " + devolverEncontrado.moneda
    devolver.moneda = devolverEncontrado.moneda
    devolver.documento = devolverEncontrado.documento
    devolver.archivo = devolverEncontrado.archivo
    devolver.numero = devolverEncontrado.numero
    devolver.token = devolverEncontrado.token
}

</script>