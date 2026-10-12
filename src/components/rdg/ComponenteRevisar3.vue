<template>

    <CRow class="table-responsive">
        <CTable small hover responsive>
            <CTableHead color="dark">
                <CTableRow>
                    <CTableHeaderCell scope="col">#</CTableHeaderCell>
                    <CTableHeaderCell scope="col">Doc.</CTableHeaderCell>
                    <CTableHeaderCell scope="col">Datos</CTableHeaderCell>
                    <CTableHeaderCell scope="col" :style="{ minWidth: '200px' }">Detalle</CTableHeaderCell>
                    <CTableHeaderCell scope="col">Importe</CTableHeaderCell>
                    <CTableHeaderCell scope="col" :style="{ minWidth: '200px' }"
                        v-if="datos.estadoAprobacion !== 'APROBADO'">
                        <CFormCheck v-model="seleccionarTodos" /> Aprobar
                    </CTableHeaderCell>
                </CTableRow>
            </CTableHead>
            <CTableBody>
                <CTableRow v-for="(value, index) in datos.factura" :key="value.id" style="cursor: pointer;">
                    <CTableHeaderCell scope="row">{{ index + 1 }}</CTableHeaderCell>
                    <CTableDataCell>
                        <img :src="getImg(value.archivo, '/sn100.png', img100)" class="img-fluid " alt="..."
                            @click="getFile(value.id, false)" style="cursor: pointer;">
                    </CTableDataCell>
                    <CTableDataCell @click="getFile(value.id, false)">
                        <div class="small text-body-secondary text-nowrap">
                            <span><strong>Fecha : </strong>{{ fecha(value.fecha) }}</span><br>
                            <span><strong>Tipo Gasto : </strong>{{ value.cuenta.tipo }}</span> <br>
                            <span><strong>Tipo Doc. : </strong>{{ value.documento }}</span><br>
                            <span><strong>Numero : </strong>{{ value.numero }}</span>
                        </div>
                    </CTableDataCell>

                    <CTableDataCell @click="getFile(value.id, false)">{{ value.detalle }}</CTableDataCell>
                    <CTableDataCell @click="getFile(value.id, false)">
                        <span class="text-nowrap">
                            {{ formatearNumero(value.importe) }} {{ datos.moneda }}</span>
                    </CTableDataCell>

                    <CTableDataCell v-if="datos.estadoAprobacion !== 'APROBADO'">
                        <CFormCheck id="flexCheckDefault"
                            v-model="value.aprobado.estado[Number(props.datos.destinoAprobacion) - 1]"
                            :onChange="(e) => check(value.id, e.target.checked)" />
                    </CTableDataCell>
                </CTableRow>
                <CTableRow active>
                    <CTableHeaderCell scope="row" colspan="3" active>TOTAL GASTOS
                        REALIZADOS
                    </CTableHeaderCell>
                    <CTableDataCell colspan="2" class="text-end">
                        <label class="total ">{{ formatearNumero(datos.gasto) }} {{ datos.moneda }} </label>
                    </CTableDataCell>
                    <CTableDataCell></CTableDataCell>
                </CTableRow>

                <CTableRow active>
                    <CTableHeaderCell scope="row" colspan="3" active>SALDO
                    </CTableHeaderCell>
                    <CTableDataCell colspan="2" class="text-end">
                        <label class="total">{{ formatearNumero(datos.saldo) }} {{ datos.moneda }}</label>
                    </CTableDataCell>
                    <CTableDataCell></CTableDataCell>
                </CTableRow>

            </CTableBody>
        </CTable>
    </CRow>
    <CRow>
        <CAlert v-if="datos.rembolso > 0" class="text-end">
            Fondos por reembolsar
            <CChip variant="outline" color="success">
                <label class="total">{{ formatearNumero(datos.rembolso) }}</label> {{ datos.moneda }}
            </CChip>
        </CAlert>
    </CRow>
    <CRow v-if="datos.devolver > 0">
        <div class="text-end">
            Fondos por devolver a la oficina
            <CChip variant="outline" color="danger">
                <label class="total">{{ formatearNumero(datos.devolver) }}</label> {{ datos.moneda }}
            </CChip>
        </div>
    </CRow>

    <!-- Modal  PDF-->
    <CModal :visible="modalPdf" :size="preview" backdrop="static" @close="clickModalPdf(false)">
        <CModalHeader class="headercolor" dismiss @close="clickModalPdf(false)">
            <CModalTitle>
                <h6><i class="bi bi-file-earmark-pdf me-2"></i> Documento</h6>
            </CModalTitle>
        </CModalHeader>
        <CModalBody>
            <CRow>
                <CCol v-if="preview === 'xl'" :xs="12" :sm="8" :md="8" :lg="8">
                    <ComponenteImagen :imagen="rdgPdf" />
                </CCol>
                <CCol :xs="12" :sm="preview === 'xl' ? 4 : 12" :md="preview === 'xl' ? 4 : 12"
                    :lg="preview === 'xl' ? 4 : 12">
                    <br>
                    <CInputGroup size="sm" class="mb-3">
                        <CInputGroupText as="label" class="headercolor">
                            <i class="bi bi-calendar3-week me-2"></i>Fecha : 
                        </CInputGroupText>
                        <CFormInput type="text" v-model="gasto.fecha" disabled />
                    </CInputGroup>

                    <CInputGroup size="sm" class="mb-3">
                        <CInputGroupText as="label" class="headercolor">
                            <i class="bi bi-wallet2 me-2"></i>Tipo de Gasto : 
                        </CInputGroupText>
                        <CFormInput type="text" v-model="gasto.tipo" disabled />
                    </CInputGroup>

                    <CInputGroup size="sm" class="mb-3">
                        <CInputGroupText as="label" class="headercolor">
                            <i class="bi bi-file-earmark-text me-2"></i>Tipo de Documento : 
                        </CInputGroupText>
                        <CFormInput type="text" v-model="gasto.documento" disabled />
                    </CInputGroup>

                    <CInputGroup size="sm" class="mb-3">
                        <CInputGroupText as="label" class="headercolor">
                            <i class="bi bi-clipboard-minus me-2"></i>No. {{ gasto.documento }} :
                        </CInputGroupText>
                        <CFormInput type="text" v-model="gasto.numero" disabled />
                    </CInputGroup>

                    <CFormTextarea label="Detalle : " v-model="gasto.detalle" rows="2" disabled>
                    </CFormTextarea>
                    <hr>
                    <CInputGroup size="sm" class="mb-3">
                        <CInputGroupText as="label" class="headercolor">
                            <i class="bi bi-cash-coin me-2"></i>Importe :
                        </CInputGroupText>
                        <CFormInput type="text" :value="gasto.importe" disabled />
                    </CInputGroup>
                </CCol>
            </CRow>
        </CModalBody>
        <CModalFooter v-if="datos.estadoAprobacion !== 'APROBADO'">
            <CButton @click="getRechazar(gasto.id)" color="danger" class="font" size="sm" :disabled="comprobante">
                <CIcon icon="cil-x" class="me-2" />Rechazar
            </CButton>
            <CButton class="font" color="success" size="sm" @click="getAprobar(gasto.id)" :disabled="comprobante">
                <CIcon icon="cil-check-alt" class="me-2" />Aprobar
            </CButton>
            <CButton class="font" color="success" size="sm" @click="clickModalPdf(false)">
                <CIcon icon="cil-check-alt" class="me-2" />Aceptar
            </CButton>

        </CModalFooter>
        <CModalFooter v-else>
            <CButton class="font" color="success" size="sm" @click="clickModalPdf(false)">
                <CIcon icon="cil-check-alt" class="me-2" />
                <span>Aceptar</span>
            </CButton>
        </CModalFooter>

    </CModal>
    <!-- End Modal  PDF-->

</template>

<script setup>
const props = defineProps({
    datos: {
        type: Object,
        required: true
    }
})

import 'bootstrap-icons/font/bootstrap-icons.css'
import { ref, reactive, computed } from 'vue'

import { useFunction } from '@/composables/useFunction'
const { formatearNumero, getImg, fecha } = useFunction()

import ComponenteImagen from '@/components/imagen/ComponenteImagen.vue'

import { API_FILE_IMG100, API_FILE_IMG800 } from "@/env"
const img100 = API_FILE_IMG100
const img800 = API_FILE_IMG800


const modalPdf = ref(false)
const rdgPdf = ref('')
const preview = ref(null)
const comprobante = ref(false)

const gasto = reactive({
    id: '',
    fecha: '',
    tipo: '',
    documento: 'Documento',
    numero: '',
    detalle: '',
    importe: '',
    moneda: '',
    archivo: '',
    agregado: '',
    estado: '',
    aprobado: null
})

const clickModalPdf = (value) => {
    modalPdf.value = value
}
const getFile = (value, estado) => {
    preview.value = null
    comprobante.value = estado

    const gastoEncontrado = props.datos.factura.find(el => Number(el.id) === Number(value))
    gasto.id = gastoEncontrado.id
    gasto.fecha = fecha(gastoEncontrado.fecha)
    gasto.tipo = gastoEncontrado.cuenta.tipo
    gasto.documento = gastoEncontrado.documento
    gasto.numero = gastoEncontrado.numero
    gasto.detalle = gastoEncontrado.detalle
    gasto.importe = formatearNumero(gastoEncontrado.importe) + ' ' + gastoEncontrado.moneda
    gasto.agregado = gastoEncontrado.agregado
    gasto.estado = gastoEncontrado.estado
    gasto.aprobado = gastoEncontrado.aprobado
    gasto.archivo = gastoEncontrado.archivo
    if (gastoEncontrado.archivo !== 'ninguno') {
        rdgPdf.value = getImg(gastoEncontrado.archivo, '/sn100.png', img800)
        preview.value = 'xl'
    }
    clickModalPdf(true)
}

const indexDestino = computed(() => Number(props.datos.destinoAprobacion) - 1)

const seleccionarTodos = computed({
    get() {
        const facturas = props.datos.factura
        if (!facturas || facturas.length === 0) return false
        return facturas.every(
            (item) => item.aprobado.estado[indexDestino.value] === true
        )
    },
    set(nuevoValor) {
        props.datos.factura.forEach((item) => {
            item.aprobado.estado[indexDestino.value] = nuevoValor
            check(item.id, nuevoValor);
        })
    }
})

const check = (id, value) => {
    if (value) {
        getAprobar(id)
    } else {
        getRechazar(id)
    }
}
const getAprobar = (value) => {
    let contar = 0
    props.datos.factura.forEach(element => {
        if (element.id === value) {
            element.aprobado.estado[Number(props.datos.destinoAprobacion) - 1] = true
        }
        if (element.aprobado.estado[Number(props.datos.destinoAprobacion) - 1]) {
            contar = contar + 1
        }
    })
    if (props.datos.factura.length === contar) {
        props.datos.boton = false
    }
    clickModalPdf(false)
}

const getRechazar = (value) => {
    props.datos.boton = true
    props.datos.factura.forEach(element => {
        if (element.id === value) {
            element.aprobado.estado[Number(props.datos.destinoAprobacion) - 1] = false
        }
    })
    clickModalPdf(false)
}


</script>
