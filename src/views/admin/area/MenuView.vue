<template>
    <CRow>
        <!--Lista de Centros de Costo-->
        <CCol :xs="12" :sm="4" :md="3" :lg="3">
            <br />
            <CCard>
                <CCardHeader class="headercolor text-center">
                    <div class="align-items-center">
                        <i class="bi bi-list-task me-2"></i>
                        <label class="mb-0 fs-6 text-white">Centros de Costo</label>
                    </div>
                </CCardHeader>
                <CCardBody class="text-center">
                    <i class="bi bi-list-task me-2" style="font-size: 5rem;"></i>
                    <p>Ver Estructura de los Centros de Costo</p>
                </CCardBody>
                <CCardFooter class="text-center">
                    <CButton color="secondary" variant="outline" size="sm" @click="getArea">
                        <i class="bi bi-list-task me-2"></i> Ver Lista
                    </CButton>
                </CCardFooter>
            </CCard>
        </CCol>
        <!--End Lista de Centros de Costo-->

        <!--Importar Lista de Centros de Costo-->
        <CCol :xs="12" :sm="4" :md="3" :lg="3">
            <br />
            <CCard>
                <CCardHeader class="headercolor text-center">
                    <div class="align-items-center">
                        <i class="bi bi-file-earmark-excel me-2"></i>
                        <label class="mb-0 fs-6 text-white">Importar </label>
                    </div>
                </CCardHeader>
                <CCardBody class="text-center">
                    <i class="bi bi-file-earmark-excel" style="font-size: 5rem;"></i>
                    <p>Importar Centros de Costo de un Archivo Excel</p>
                </CCardBody>
                <CCardFooter class="text-center">
                    <CButton color="secondary" variant="outline" size="sm" @click="getAreaImport">
                        <i class="bi bi-file-earmark-excel"></i> Importar
                    </CButton>
                </CCardFooter>
            </CCard>
        </CCol>
        <!--End Importar Lista de Centros de Costo-->
    </CRow>

</template>
<script setup>
import 'bootstrap-icons/font/bootstrap-icons.css'
import { useRouter } from 'vue-router'
const router = useRouter()

const getArea = () => {
    router.push({ name: 'ListaArea' })
}
const getAreaImport = () => {
    router.push({ name: 'ImportarArea' })
}

</script>