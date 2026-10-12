<template>
    <CRow>
        <CCol :xs="12">
            <CCard>
                <CCardHeader class="headercolor justify-content-between align-items-center">
                    <div class="align-items-center">
                        <CIcon icon="cil-list" size="lg" class="me-2 text-light" />
                        <label class="mb-0 fs-6 text-white">Lista de Jefes</label>
                    </div>
                </CCardHeader>
                <CCardBody>
                    <CRow class="table-responsive">
                        <DataTable :data="listaJefes" :columns="columns" class="table table-striped"
                            :options="{ responsive: true }">

                            <template #column-imagen="{ cellData }">
                                <CAvatar size="xl" :src="cellData.foto" :status="cellData.estado" />
                            </template>

                            <template #column-datos="{ cellData }">
                                <span>{{ cellData.idp }}</span>
                                <div class="small text-body-secondary text-nowrap">
                                    <span><strong>Nombre :</strong> {{ cellData.nombre }} {{ cellData.apellido
                                        }}</span><br>
                                    <span>{{ cellData.email }} | {{ cellData.celular }}</span>
                                </div>
                            </template>

                            <!-- Estado personalizado -->
                            <template #column-estado="{ cellData }">
                                <CBadge :color="cellData ? 'success' : 'danger'">
                                    {{ cellData ? 'Activo' : 'Inactivo' }}
                                </CBadge>
                            </template>

                            <template #column-acciones="{ cellData }">
                                <CButtonGroup role="group" size="sm">
                                    <CButton color="secondary" variant="outline" @click="getPerfil(cellData)"
                                        v-c-tooltip="{ content: 'Ver Perfil Usuario', placement: 'top' }">
                                        <i class="bi bi-person me-2"></i>
                                    </CButton>

                                    <CButton color="secondary" variant="outline" @click="getPerfil(cellData)"
                                        v-c-tooltip="{ content: 'Solicitudes de Fondos Por Rendir', placement: 'top' }">
                                        <i class="bi bi-clipboard me-2"></i>
                                    </CButton>

                                    <CButton color="secondary" variant="outline" @click="getPerfil(cellData)"
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
import { onMounted, onUnmounted } from 'vue'
import DataTable from 'datatables.net-vue3'
import DataTablesCore from 'datatables.net-bs5'
import 'datatables.net-bs5/css/dataTables.bootstrap5.css'
import 'bootstrap-icons/font/bootstrap-icons.css'

DataTable.use(DataTablesCore)
import { useBreadcrumb } from '@/composables/useBreadcrumb'
const { setActions, clearActions } = useBreadcrumb()
import { useRouter } from 'vue-router'
const router = useRouter()

import { useEmpleado } from '@/composables/useEmpleado'
const { findByTipoUse, listaJefes } = useEmpleado()

import { useAlert } from '@/composables/useAlert'
const { dataLoading, close } = useAlert()

const columns = [
    { data: 'id', title: 'ID' },
    { data: 'imagen', title: '', name: "imagen" },
    { data: 'datos', title: 'Datos Personales', name: 'datos' },
    { data: 'estado', title: 'Estado', name: 'estado' },
    {
        data: 'acciones',
        title: 'Acciones',
        orderable: false,
        searchable: false,
        name: 'acciones'
    }
]

/**Funciones */
const salir = () => {
    getSalir()
}

const getSalir = () => {
    router.push({ name: 'Dependencias' })
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
        await findByTipoUse('JEFE')
    } finally {
        close()
    }
    getAction()

})
onUnmounted(() => {
    clearActions()
})

</script>
