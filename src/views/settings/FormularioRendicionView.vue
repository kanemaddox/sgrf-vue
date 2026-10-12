<template>
    <CRow>
        <CCol :xs="12" :sm="12" :md="5" :lg="5">
            <CCard>
                <CCardHeader class="headercolor justify-content-between align-items-center">
                    <div class="align-items-center">
                        <CIcon icon="cil-description" size="lg" class="me-2 text-light" />
                        <label class="mb-0 fs-6 text-white">
                            FORMULARIO DE RENDICION
                        </label>
                    </div>
                </CCardHeader>
                <CForm @submit.prevent="updateFormato">
                    <CCardBody>
                        <CInputGroup size="sm" class="mb-3">
                            <CInputGroupText class="headercolor" as="label">
                                <i class="bi bi-tags me-2"></i>Titulo :
                            </CInputGroupText>
                            <CFormInput type="text" v-model="valores.titulo" required />
                        </CInputGroup>

                        <CInputGroup size="sm" class="mb-3">
                            <CInputGroupText class="headercolor" as="label">
                                <i class="bi bi-tags me-2"></i>Seccion I.
                            </CInputGroupText>
                            <CFormInput type="text" v-model="valores.seccionUno" required />
                        </CInputGroup>

                        <CInputGroup size="sm" class="mb-3">
                            <CInputGroupText class="headercolor" as="label">
                                <i class="bi bi-tags me-2"></i>Seccion II.
                            </CInputGroupText>
                            <CFormInput type="text" v-model="valores.seccionDos" required />
                        </CInputGroup>

                        <CInputGroup size="sm" class="mb-3">
                            <CInputGroupText class="headercolor" as="label">
                                <i class="bi bi-tags me-2"></i>Seccion III.
                            </CInputGroupText>
                            <CFormInput type="text" v-model="valores.seccionTres" />
                        </CInputGroup>
                    </CCardBody>
                    <CCardFooter class="text-center">
                        <CRow>
                            <CCol :xs="6" :sm="6" class="d-grid gap-2">
                                <CButton color="danger" size="sm" class="font">
                                    <CIcon icon="cil-x" class="me-2" />
                                    Cancelar
                                </CButton>

                            </CCol>
                            <CCol :xs="6" :sm="6" class="d-grid gap-2">
                                <CButton type="submit" class="font" color="success" size="sm">
                                    <CIcon icon="cil-description" class="me-2" />
                                    Aceptar
                                </CButton>
                            </CCol>
                        </CRow>
                    </CCardFooter>
                </CForm>
            </CCard>
        </CCol>
        <CCol :xs="12" :sm="12" :md="7" :lg="7">
            <br>
            <CAlert color="secondary">
                Vista Previa | {{ formatoRDG.fecha }}
            </CAlert>
            <CCard>
                <CCardHeader class="headercolor justify-content-between align-items-center">
                    <div class="align-items-center">
                        <CIcon icon="cil-description" size="lg" class="me-2 text-light" />
                        <label class="mb-0 fs-6 text-white">{{ valores.titulo }}</label><br>
                    </div>
                </CCardHeader>
                <CCardBody>
                    <CAlert color="secondary">I. {{ valores.seccionUno }}</CAlert>
                    <CInputGroup size="sm" class="mb-3">
                        <CInputGroupText class="headercolor" as="label">Nombre Completo :
                        </CInputGroupText>
                        <CFormInput type="text" value="" disabled />

                        <CInputGroupText class="headercolor" as="label">{{ idpName }} : </CInputGroupText>
                        <CFormInput type="text" value="" disabled />
                    </CInputGroup>

                    <CInputGroup size="sm" class="mb-3">
                        <CInputGroupText class="headercolor" as="label">Cargo : </CInputGroupText>
                        <CFormInput type="text" value="" disabled />
                        <CInputGroupText class="headercolor" as="label">Area : </CInputGroupText>
                        <CFormInput type="text" value="" disabled />
                    </CInputGroup>

                    <CAlert color="secondary">II. {{ valores.seccionDos }}</CAlert>

                    <CInputGroup size="sm" class="mb-3">
                        <CInputGroupText class="headercolor" as="label">
                            <i class="bi bi-calendar-date me-2"></i>Actividad / Gasto :
                        </CInputGroupText>
                        <CFormInput type="text" disabled />
                    </CInputGroup>

                    <CInputGroup size="sm" class="mb-3">
                        <CInputGroupText class="headercolor" as="label">Del :</CInputGroupText>
                        <CFormInput type="text" disabled />

                        <CInputGroupText class="headercolor" as="label">Al :</CInputGroupText>
                        <CFormInput type="text" disabled />

                        <CInputGroupText class="headercolor" as="label">
                            <i class="bi bi-calendar-date me-2"></i>Total Dias :
                        </CInputGroupText>
                        <CFormInput type="text" disabled />
                    </CInputGroup>

                    <CFormTextarea label="Descripcion Actividad : " rows="1" disabled>
                    </CFormTextarea>

                    <br>
                    <CAlert color="secondary">III. {{ valores.seccionTres }}</CAlert>

                    <CAlert>
                        <CTable bordered border-color="dark" hover responsive>
                            <CTableHead>
                                <CTableRow>
                                    <CTableHeaderCell scope="col">Fecha</CTableHeaderCell>
                                    <CTableHeaderCell scope="col">Tipo Gasto</CTableHeaderCell>
                                    <CTableHeaderCell scope="col">Tipo</CTableHeaderCell>
                                    <CTableHeaderCell scope="col">No.</CTableHeaderCell>
                                    <CTableHeaderCell scope="col">Detalle</CTableHeaderCell>
                                    <CTableHeaderCell scope="col">Importe</CTableHeaderCell>
                                </CTableRow>
                            </CTableHead>
                            <CTableBody>
                                <CTableRow active>
                                    <CTableHeaderCell scope="row">1/4/2026</CTableHeaderCell>
                                    <CTableDataCell>Transporte</CTableDataCell>
                                    <CTableDataCell>S/D</CTableDataCell>
                                    <CTableDataCell></CTableDataCell>
                                    <CTableDataCell>Detalle</CTableDataCell>
                                    <CTableDataCell>$5.400</CTableDataCell>
                                </CTableRow>
                                <CTableRow>
                                    <CTableHeaderCell scope="row">2/4/2026</CTableHeaderCell>
                                    <CTableDataCell>Equipamiento</CTableDataCell>
                                    <CTableDataCell>Factura</CTableDataCell>
                                    <CTableDataCell>34654</CTableDataCell>
                                    <CTableDataCell>Compra..</CTableDataCell>
                                    <CTableDataCell>$36.000</CTableDataCell>
                                </CTableRow>
                            </CTableBody>
                        </CTable>
                    </CAlert>

                </CCardBody>
                <CCardFooter class="text-center">
                    <CRow>
                        <CCol :xs="2" :sm="6"></CCol>
                        <CCol :xs="5" :sm="3" class="d-grid gap-2">
                            <CButton color="danger" size="sm" class="font" disabled>
                                <CIcon icon="cil-x" class="me-2" />
                                Cancelar
                            </CButton>

                        </CCol>
                        <CCol :xs="5" :sm="3" class="d-grid gap-2">
                            <CButton type="submit" class="font" color="success" size="sm" disabled>
                                <CIcon icon="cil-description" class="me-2" />
                                Crear
                            </CButton>
                        </CCol>
                    </CRow>
                </CCardFooter>
            </CCard>

        </CCol>
    </CRow>
</template>

<script setup>
import { ref, onMounted,onUnmounted } from 'vue'

import { useBreadcrumb } from '@/composables/useBreadcrumb'
const { setActions, clearActions } = useBreadcrumb()
import { useRouter } from 'vue-router'
const router = useRouter()

import { useSettings } from '@/composables/useSettings'
const { updateSettingsUse,  getFormatoRdgUse, formatoRDG } = useSettings()

import 'bootstrap-icons/font/bootstrap-icons.css'

import { useAuthStore } from '@/stores/authStores'
const auth = useAuthStore()

import { useAlert } from '@/composables/useAlert'
const { dataLoading, close } = useAlert()

const idpName = ref(auth.idpName)

const valores = ref({
    titulo: "",
    seccionUno: "",
    seccionDos: "",
    seccionTres: "",
})

/**Funciones */
const salir = () => {
    getSalir()
}

const getSalir = () => {
    router.push({name: 'Home'})
}

const updateFormato = async () => {
    const formato = {
        id: formatoRDG.id,
        nombre: formatoRDG.nombre,
        categoria: formatoRDG.categoria,
        value: valores.value
    }
    const resultService = await updateSettingsUse(formato)
    if (resultService) {
        location.reload()
    }
    else {
        valores.value = { ...formatoRDG.value }
    }
}

const getLoadData = () => {
    valores.value = { ...formatoRDG.value }
}

const getAction = () => {
    setActions([
        {
            visible: true,
            label: 'Salir',
            icon: 'cil-account-logout',
            color: 'secondary',
            variant: 'ghost',
            disabled: false,
            onClick: salir
        }
    ])
}

onMounted(async () => {
    dataLoading()
    try {
        await getFormatoRdgUse()
        getLoadData()
    } finally {
        close()
    }
    getAction()
})
onUnmounted(() => {
    clearActions()
})
</script>
