<template>
    <CRow>
        <CCol :xs="12">
            <CCard>
                <CCardHeader class="headercolor justify-content-between align-items-center">
                    <CRow>
                        <CCol :xs="12" :sm="12" :md="12" :lg="12">
                            <div class="align-items-center">
                                <CIcon icon="cil-list" size="lg" class="me-2 text-light" />
                                <label class="mb-0 fs-6 text-white">Mis Rendiciones {{ titulo }}</label>
                            </div>
                        </CCol>
                    </CRow>
                </CCardHeader>
                <CCardBody>
                    <CRow class="table-responsive">
                        <DataTable :data="listaRdg" :columns="columns" class="table table-striped"
                            :options="{ responsive: true }">

                            <template #column-datos="{ cellData }">
                                <span><strong>Formulario : </strong>{{ cellData.numero }}</span><br>
                                <div class="small text-body-secondary text-nowrap">
                                    <span>{{ persona.idp }} | {{ cellData.gestion }}</span><br>
                                    <span><strong>Importe : </strong>{{ cellData.importe }} {{ cellData.moneda
                                        }}</span><br>
                                    <span><strong>Fecha : </strong>{{ cellData.fecha }} </span>
                                </div>
                            </template>

                            <template #column-detalle="{ cellData }">
                                <span>{{ cellData.detalle }}</span>
                                <div class="small text-body-secondary text-nowrap">
                                    <span><strong>Actividad : </strong> {{ lenFirma(cellData.actividad) }} </span><br>
                                    <span><strong>Gasto : </strong> {{ cellData.gasto }} {{ cellData.moneda
                                    }}</span><br>
                                    <span><strong>Saldo : </strong>{{ cellData.saldo }} {{ cellData.moneda }}</span>
                                </div>
                            </template>

                            <template #column-estado="{ cellData }">
                                <CChip :color="cellData.color">
                                    <span class="chip-icon">
                                        <i :class="cellData.icon"></i>
                                    </span>{{ cellData.estado }}
                                </CChip>
                            </template>

                            <template #column-acciones="{ cellData }">
                                <CButtonGroup role="group" size="sm">
                                    <CButton color="secondary" variant="outline" @click="getRdg(cellData.id)"
                                        v-c-tooltip="{ content: 'Detalle Rendicion de Cuentas', placement: 'top' }">
                                        <i class="bi bi-file-earmark-font me-2"></i>
                                    </CButton>

                                    <CButton v-if="cellData.estado === 'APROBADO'" color="secondary" variant="outline"
                                        @click="getSrf(cellData.id)"
                                        v-c-tooltip="{ content: 'Crear Rendicion de Fondos', placement: 'top' }">
                                        <i class="bi bi-cash-coin me-2"></i>
                                    </CButton>

                                    <CButton color="secondary" variant="outline" @click="getSrf(cellData)"
                                        v-c-tooltip="{ content: 'Rendiciones de Gastos', placement: 'top' }">
                                        <i class="bi bi-file-earmark-text me-2"></i>
                                    </CButton>
                                </CButtonGroup>
                            </template>

                        </DataTable>
                    </CRow>
                </CCardBody>
            </CCard>
        </CCol>
    </CRow>
</template>

<script setup>
const lista = defineProps({
    estado: {
        type: String, // o Number, dependiendo de lo que mandes
        required: true
    }
})


import DataTable from 'datatables.net-vue3'
import DataTablesCore from 'datatables.net-bs5'
import 'datatables.net-bs5/css/dataTables.bootstrap5.css'
DataTable.use(DataTablesCore)

import 'bootstrap-icons/font/bootstrap-icons.css'

import { onMounted, onUnmounted, ref } from 'vue';

import { useRouter } from 'vue-router'
const router = useRouter()
import { useBreadcrumb } from '@/composables/useBreadcrumb'
const { setActions, clearActions } = useBreadcrumb()

import { useAlert } from '@/composables/useAlert'
const { dataLoading, close } = useAlert()

import { useAuthStore } from '@/stores/authStores'
const auth = useAuthStore()
const persona = ref(auth.persona)

import { useRdg } from '@/composables/useRdg'
const { getRdgListaUse, listaRdg } = useRdg()

import { useFunction } from '@/composables/useFunction'
const { getEstado, lenFirma } = useFunction()
const titulo = ref('')

const columns = [
    { data: 'id', title: 'ID' },
    { data: 'datos', title: 'Formulario', name: 'datos' },
    { data: 'detalle', title: 'Detalle', name: 'detalle', width: '40%' },
    { data: 'estado', title: 'Estado', name: 'estado' },
    {
        data: 'acciones',
        title: 'Acciones',
        orderable: false,
        searchable: false,
        name: 'acciones'
    }
]

const salir = () => {
    getSalir()
}

const getSalir = () => {
    router.push({ name: 'MenuRdg' })
}

const getRdg = (value) => {
    router.push({
        name: 'DetalleDrf',
        params: { idRdg: value }
    })
}
const getLoadData = (value) => {
    titulo.value = getEstado(value)
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
    const tooltips = document.querySelectorAll('.tooltip')
    tooltips.forEach(tooltip => tooltip.remove())
    dataLoading()
    try {
        await getRdgListaUse(persona.value.id, lista.estado.toUpperCase())
        getLoadData(lista.estado.toUpperCase())
    } finally {
        close()
    }
    getAction()
})
onUnmounted(() => {
    clearActions()
})
</script>