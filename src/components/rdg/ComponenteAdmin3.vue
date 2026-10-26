<template>

  <CRow>
    <CAlert color="success">III.{{ valores.seccionTres }}</CAlert>
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
        <CTableRow v-for="(value, index) in facturasFiltradas" :key="value.idDetalle">
          <CTableHeaderCell scope="row">{{ index + 1 }}</CTableHeaderCell>
          <CTableDataCell>
            <img :src="getImg(value.archivo, '/sn100.png', img100)" class="img-fluid " alt="..."
              @click="getModal('view', value.idDetalle)">
          </CTableDataCell>
          <CTableDataCell>
            <div class="small text-body-secondary text-nowrap">
              <span><strong>Fecha : </strong>{{ fecha(value.fecha) }}</span><br>
              <span><strong>Tipo Gasto : </strong>{{ value.cuenta.tipo }}</span> <br>
              <span><strong>Tipo Doc. : </strong>{{ value.documento }}</span><br>
              <span><strong>Numero : </strong>{{ value.numero }}</span>
            </div>
          </CTableDataCell>

          <CTableDataCell>{{ value.detalle }}</CTableDataCell>
          <CTableDataCell><span class="text-nowrap">{{ formatearNumero(value.importe) }} {{ datos.moneda
              }}</span></CTableDataCell>
        </CTableRow>

        <CTableRow active>
          <CTableHeaderCell scope="row" colspan="3" active>TOTAL GASTOS
            REALIZADOS
          </CTableHeaderCell>
          <CTableDataCell colspan="2" class="text-end">
            <label class="total ">{{ formatearNumero(datos.gasto) }} {{ datos.moneda }} </label>
          </CTableDataCell>
        </CTableRow>

        <CTableRow active>
          <CTableHeaderCell scope="row" colspan="3" active>SALDO
          </CTableHeaderCell>
          <CTableDataCell colspan="2" class="text-end">
            <label class="total">{{ formatearNumero(datos.saldo) }} {{ datos.moneda }}</label>
          </CTableDataCell>
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

  <!-- Modal  Ver, Editar o Agregar -->
  <CModal :visible="modalDocumento" :size="preview" backdrop="static" @close="clickModalDocumento(false)">

    <!-- Header -->
    <CModalHeader class="headercolor" dismiss @close="clickModalDocumento(false)">
      <CModalTitle>
        <h6>
          <CIcon :icon="icono" size="lg" class="me-2" />{{ titulo }}
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
        <CCol :xs="12" :sm="preview === 'lg' ? 5 : 12" :md="preview === 'lg' ? 5 : 12" :lg="preview === 'lg' ? 5 : 12">
          <br>
          <!-- Fecha -->
          <CInputGroup size="sm" class="mb-3">
            <CInputGroupText as="label" class="headercolor">
              <i class="bi bi-calendar3-week me-2"></i>Fecha :
            </CInputGroupText>
            <CFormInput type="text" :value="gasto.fecha" disabled />
          </CInputGroup>

          <!-- Tipo de Gasto (En modo 'ver' es Input bloqueado; en 'editar'/'agregar' es Select) -->
          <CInputGroup size="sm" class="mb-3">
            <CInputGroupText as="label" class="headercolor">
              <i class="bi bi-wallet2 me-2"></i>Tipo de Gasto :
            </CInputGroupText>
            <CFormInput type="text" :value="gasto.tipo" disabled />
          </CInputGroup>

          <!-- Tipo de Documento -->
          <CInputGroup size="sm" class="mb-3">
            <CInputGroupText as="label" class="headercolor">
              <i class="bi bi-file-earmark-text me-2"></i>Tipo de Documento :
            </CInputGroupText>
            <CFormInput type="text" :value="gasto.documento" disabled />
          </CInputGroup>

          <!-- Número de Documento -->
          <CInputGroup size="sm" class="mb-3" v-if="gasto.documento !== 'SD'">
            <CInputGroupText as="label" class="headercolor">
              <i class="bi bi-clipboard-minus me-2"></i>No. {{ gasto.documento || '' }} :
            </CInputGroupText>
            <CFormInput type="text" :value="gasto.numero" disabled />
          </CInputGroup>

          <!-- Detalle -->
          <CFormTextarea label="Detalle : " :value="gasto.detalle" rows="2" maxlength="150" disabled>
          </CFormTextarea>
          <hr>
          <!-- Importe y Moneda -->
          <CInputGroup size="sm" class="mb-3">
            <CInputGroupText as="label" class="headercolor">
              <i class="bi bi-cash-coin me-2"></i>Importe :
            </CInputGroupText>
            <CFormInput type="text" :value="`${gasto.importe} ${gasto.moneda}`" disabled />
          </CInputGroup>
        </CCol>
      </CRow>
    </CModalBody>
    <!-- Footer -->
    <CModalFooter>
      <CButton @click="clickModalDocumento(false)" color="danger" class="font" size="sm">
        <CIcon icon="cil-x" class="me-2" />Cancelar
      </CButton>
    </CModalFooter>
  </CModal>

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

import 'bootstrap-icons/font/bootstrap-icons.css'
import { ref, reactive, watch, computed } from 'vue'
import VuePdfEmbed from 'vue-pdf-embed'

import ComponenteImagen from '@/components/imagen/ComponenteImagen.vue'
import { useFunction } from '@/composables/useFunction'
const { formatearNumero, getImg, fecha } = useFunction()

import { useAlert } from '@/composables/useAlert'
const { info } = useAlert()


import { API_FILE_IMG100, API_FILE_IMG800 } from "@/env"
const img100 = API_FILE_IMG100
const img800 = API_FILE_IMG800

const rdgPdf = ref('')
const preview = ref(null)
const modalDocumento = ref(false)
const modo = ref('agregar')
const titulo = ref('')
const icono = ref('')
const boton = ref('')
const colorboton = ref('')

const gasto = reactive({
  id: '',
  fecha: '',
  tipo: '',
  idCuenta: 0,
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

const clickModalDocumento = (value) => {
  modalDocumento.value = value
}

const getModal = async (value, idFactura) => {
  if (Number(props.datos.devolver) > 0 && value === 'editar') {
    await info('Fondos por devolver a la oficina', 'Debes de Eliminar Tu Comprobante Antes de Realizar cualquier Cambio', '')
  }
  else {
    preview.value = 'xl'
    if (value === 'editar') {
      getAction('editar', 'Editar Documento', 'cil-save', 'Guardar Cambios', 'primary')
    } else {
      getAction('ver', 'Documento', 'cil-description', 'Aceptar', 'success')
    }
    const gastoEncontrado = props.datos.factura.find(el => Number(el.idDetalle) === Number(idFactura))
    getGasto(gastoEncontrado)
    if (gastoEncontrado.archivo !== 'ninguno') {
      rdgPdf.value = getImg(gastoEncontrado.archivo, '/sn100.png', img800)
      preview.value = 'lg'
    }
    clickModalDocumento(true)
  }
}


const facturasFiltradas = computed(() => {
  return props.datos.factura.filter(value => value.agregado !== 'NO')
})

const getGasto = (gastoEncontrado) => {
  gasto.id = gastoEncontrado.idDetalle
  gasto.fecha = fecha(gastoEncontrado.fecha)
  gasto.idCuenta = gastoEncontrado.cuenta.idCuenta
  gasto.tipo = gastoEncontrado.cuenta.tipo
  gasto.documento = gastoEncontrado.documento
  gasto.numero = gastoEncontrado.numero
  gasto.detalle = gastoEncontrado.detalle
  gasto.importe = gastoEncontrado.importe
  gasto.moneda = gastoEncontrado.moneda
  gasto.aprobado = gastoEncontrado.aprobado
  gasto.estado = gastoEncontrado.estado
  gasto.agregado = gastoEncontrado.agregado
  gasto.archivo = gastoEncontrado.archivo
}

const getAction = (isEdit, title, icon, buton, color) => {
  modo.value = isEdit
  titulo.value = title
  icono.value = icon
  boton.value = buton
  colorboton.value = color
}


watch(
  () => gasto.documento,
  (nuevoDocumento) => {
    if (nuevoDocumento === 'SD') {
      gasto.numero = 0
    } else if (gasto.numero === 0) {
      gasto.numero = ''
    }
  }
)

</script>