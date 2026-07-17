<template>
    <CRow>
        <!--Lista de Gastos-->
        <CCol :xs="12" :sm="4" :md="3" :lg="3">
            <br />
            <CCard>
                <CCardHeader class="headercolor text-center">
                    <div class="align-items-center">
                        <i class="bi bi-list-task me-2"></i>
                        <label class="mb-0 fs-6 text-white">Lista de Gastos</label>
                    </div>
                </CCardHeader>
                <CCardBody class="text-center">
                    <i class="bi bi-list-task me-2" style="font-size: 5rem;"></i>
                    <p>Ver lista de Gastos Registrados</p>
                </CCardBody>
                <CCardFooter class="text-center">
                    <CButton color="secondary" variant="outline" size="sm" @click="getListaGastos">
                        <i class="bi bi-list-task me-2"></i> Ver Lista
                    </CButton>
                </CCardFooter>
            </CCard>
        </CCol>
        <!--End Lista de Gastos-->

        <!--Importar Lista de Gastos-->
        <CCol :xs="12" :sm="4" :md="3" :lg="3">
            <br />
            <CCard>
                <CCardHeader class="headercolor text-center">
                    <div class="align-items-center">
                        <i class="bi bi-file-earmark-excel me-2"></i>
                        <label class="mb-0 fs-6 text-white">Importar Gastos</label>
                    </div>
                </CCardHeader>
                <CCardBody class="text-center">
                    <i class="bi bi-file-earmark-excel" style="font-size: 5rem;"></i>
                    <p>Importar Gastos de un Archivo Excel</p>
                </CCardBody>
                <CCardFooter class="text-center">
                    <CButton color="secondary" variant="outline" size="sm" @click="getGastoImport">
                        <i class="bi bi-file-earmark-excel"></i> Importar
                    </CButton>
                </CCardFooter>
            </CCard>
        </CCol>
        <!--End Importar Lista de Gastos-->
    </CRow>

</template>
<script setup>
import 'bootstrap-icons/font/bootstrap-icons.css'
import { useRouter } from 'vue-router'
const router = useRouter()

const getListaGastos = () => {
    router.push({ name: 'ListaGastos' })
}
const getGastoImport = () => {
    router.push({ name: 'ImportarGasto' })
}
const getGastoRegister = () => {
    router.push({ name: 'RegistrarGastos' })
}
</script>