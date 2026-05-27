<template>
    <CRow>
        <CCol :xs="12">
            <CCard>
                <CCardHeader class="headercolor justify-content-between align-items-center">
                    <CRow>
                        <CCol :lg="12">
                            <div class="align-items-center">
                                <CIcon icon="cil-list" size="lg" class="me-2 text-light" />
                                <label class="mb-0 fs-6 text-white">Cuentas Bancarias</label>
                            </div>
                        </CCol>
                    </CRow>
                </CCardHeader>
                <CCardBody>
                    <CRow class="table-responsive">
                        <DataTable :data="lista" :columns="columns" class="table table-striped"
                            :options="{ responsive: true }">

                            <!-- Estado personalizado -->
                            <template #column-estado="{ cellData }">
                                <CBadge :color="cellData ? 'success' : 'danger'">
                                    {{ cellData ? 'Activo' : 'Inactivo' }}
                                </CBadge>
                            </template>
                        </DataTable>
                    </CRow>
                </CCardBody>
            </CCard>
        </CCol>
    </CRow>
</template>

<script setup>
import { reactive, ref, onMounted } from 'vue'
import DataTable from 'datatables.net-vue3'
import DataTablesCore from 'datatables.net-bs5'
import 'datatables.net-bs5/css/dataTables.bootstrap5.css'

DataTable.use(DataTablesCore)

import { useAuthStore } from '@/stores/authStores'
const secion = useAuthStore()

import { useCuentasBancarias } from '@/composables/useCuentaBancaria'
const { getCuentasBancariasUse } = useCuentasBancarias()

/** DEcalraciones */

const persona = secion.persona
const lista = ref([])
const columns = [
    { data: 'id', title: 'ID' },
    { data: 'banco', title: 'Banco' },
    { data: 'tipo', title: 'Tipo de Cuenta' },
    { data: 'numero', title: 'Numero de Cuenta' },
    { data: 'estado', title: 'Estado', name: 'estado' }
]

/*Funciones*/
const getCuentasBancarias = async () => {
    try {
        console.log(persona.id)
        const cuentas = await getCuentasBancariasUse(persona.id)
        lista.value = cuentas.map(item => ({
            id: item.id,
            banco: item.banco.nombre,
            tipo: item.tipoCuenta,
            numero: item.numero,
            estado: item.estado
        }))
    } catch (errr) {
        console.log(errr)
    }
}


onMounted(() => {
    getCuentasBancarias()
})
</script>