<template>
  <CTable align="middle" class="mb-0 border" hover responsive>
    <CTableHead class="text-nowrap">
      <CTableRow>
        <CTableHeaderCell class="bg-body-secondary text-center">
          <CIcon name="cil-people" />
        </CTableHeaderCell>
        <CTableHeaderCell class="bg-body-secondary"> Autorizadores </CTableHeaderCell>
      </CTableRow>
    </CTableHead>
    <CTableBody>
      <CTableRow v-for="item in listaLocal" :key="item.name">
        <CTableDataCell class="text-center">
          <CAvatar size="md" :src="getFoto(item.persona.foto, '/usuario.png', img100)" :status="getColor(item.estado)" />
        </CTableDataCell>
        <CTableDataCell>
          <div>{{ item.persona.nombre }}</div>
          <div class="small text-body-secondary text-nowrap">
            <span>{{ item.persona.idp }}</span> |
            <CChip clickable @click="getObs(item.id)" :color="getColor(item.estado)" size="sm">
              <span class="chip-icon">
                <i :class="getIcono(item.estado)"></i>
              </span>{{ item.estado }}
            </CChip>
          </div>
        </CTableDataCell>
      </CTableRow>
    </CTableBody>
  </CTable>

  <!-- ==================================================================== -->
  <!-- Modal para Observaciones                                             -->
  <!-- ==================================================================== -->
  <CModal :visible="modalObs" backdrop="static" @close="clickModalObs(false)">
    <CModalHeader class="headercolor" dismiss @close="clickModalObs(false)">
      <CModalTitle>
        <h6>
          <CIcon icon="cil-description" size="lg" class="me-2" />Observaciones
        </h6>
      </CModalTitle>
    </CModalHeader>
    <CModalBody>
      <CRow>
        <CCol :xs="12">
          <CWidgetStatsB class="mb-3" :progress="{ color: obsSrf.color, value: 100 }">
            <template #text>{{ obsSrf.estado }} el {{ obsSrf.fecha }}</template>
            <template #title>{{ obsSrf.nombre }} | {{ obsSrf.idp }}</template>
            <template #value>{{ obsSrf.estado }}</template>
          </CWidgetStatsB>
          <CAlert :color="obsSrf.color">
            {{ obsSrf.obs }}
          </CAlert>
        </CCol>
      </CRow>
    </CModalBody>
    <CModalFooter>
      <CButton @click="clickModalObs(false)" class="font" color="success" size="sm">
        <CIcon icon="cil-check-alt" class="me-2" />
        <span>Aceptar</span>
      </CButton>
    </CModalFooter>
  </CModal>
  <!-- End Modal Observaciones-->
</template>

<script setup>
const props = defineProps({
  lista: {
    type: Array,
    required: true
  }
})
// ============================================================================
// 1. IMPORTACIONES
// ============================================================================
import { useFunction } from '@/composables/useFunction'
import { ref, reactive, onMounted } from 'vue'
import { API_URL_IMG100 } from "@/env"
// ============================================================================
// 2. INICIALIZACIÓN DE STORES, COMPOSABLES Y ROUTER
// ============================================================================
const { getFoto, getColor, getIcono } = useFunction()
// ============================================================================
// 3. DATOS DEL USUARIO AUTENTICADO
// ============================================================================

// ============================================================================
// 4. DECLARACIONES DE VARIABLES
// ============================================================================
const listaLocal = ref([])
const img100 = API_URL_IMG100
const modalObs = ref(false)
const obsSrf = reactive({
  nombre: '',
  idp: '',
  estado: '',
  color: '',
  fecha: '',
  obs: ''
})
// ============================================================================
// 5. FUNCIONES DE NAVEGACIÓN
// ============================================================================
const clickModalObs = (value) => {
  modalObs.value = value
}

const getObs = (value) => {
  props.lista.forEach(element => {
    if (element.id === value) {
      obsSrf.nombre = element.persona.nombre
      obsSrf.idp = element.persona.idp
      obsSrf.estado = element.estado
      obsSrf.obs = element.obs
      obsSrf.color = getColor(element.estado)
      obsSrf.fecha = new Date(element.fechaActualizacion)
    }
  })
  clickModalObs(true)
}
// ============================================================================
// 6. CICLO DE VIDA DEL COMPONENTE
// ============================================================================
onMounted(() => {
  listaLocal.value = [... props.lista]
})
</script>