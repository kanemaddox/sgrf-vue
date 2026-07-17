<template>
    <CRow>
        <!--Card para observaciones Aprobadas-->
        <CCol :xs="12" :sm="4" :md="3" :lg="3">
            <br />
            <CCard>
                <CCardHeader class="headercolor text-center">
                    <div class="align-items-center">
                        <i class="bi bi-list-task me-2"></i>
                        <label class="mb-0 fs-6 text-white">Lista de Usuarios</label>
                    </div>
                </CCardHeader>
                <CCardBody class="text-center">
                    <i class="bi bi-list-task me-2" style="font-size: 5rem;"></i>
                    <p>Ver La lista de Usuarios Registrados</p>
                </CCardBody>
                <CCardFooter class="text-center">
                    <CButton color="secondary" variant="outline" size="sm" @click="getUsuariosView">
                        <i class="bi bi-list-task me-2"></i> Ver Lista
                    </CButton>
                </CCardFooter>
            </CCard>
        </CCol>
        <CCol :xs="12" :sm="4" :md="3" :lg="3">
            <br />
            <CCard>
                <CCardHeader class="headercolor text-center">
                    <div class="align-items-center">
                        <i class="bi bi-file-earmark-excel me-2"></i>
                        <label class="mb-0 fs-6 text-white">Importar Usuarios</label>
                    </div>
                </CCardHeader>
                <CCardBody class="text-center">
                    <i class="bi bi-file-earmark-excel" style="font-size: 5rem;"></i>
                    <p>Importar Usuarios de un Archivo Excel</p>
                </CCardBody>
                <CCardFooter class="text-center">
                    <CButton color="secondary" variant="outline" size="sm" @click="getUsuariosImport">
                        <i class="bi bi-file-earmark-excel"></i> Importar
                    </CButton>
                </CCardFooter>
            </CCard>
        </CCol>

        <CCol :xs="12" :sm="4" :md="3" :lg="3">
            <br />
            <CCard>
                <CCardHeader class="headercolor text-center">
                    <div class="align-items-center">
                        <i class="bi bi-person-add me-2"></i>
                        <label class="mb-0 fs-6 text-white">Registrar Usuario</label>
                    </div>
                </CCardHeader>
                <CCardBody class="text-center">
                    <i class="bi bi-person-add" style="font-size: 5rem;"></i>
                    <p>Registrar un Usuario Nuevo y Datos Personales</p>
                </CCardBody>
                <CCardFooter class="text-center">
                    <CButton color="secondary" variant="outline" size="sm" @click="getUsuariosRegister">
                        <i class="bi bi-person-add"></i> Registrar
                    </CButton>
                </CCardFooter>
            </CCard>
        </CCol>
    </CRow>

</template>
<script setup>
import 'bootstrap-icons/font/bootstrap-icons.css'
import { useRouter } from 'vue-router'
const router = useRouter()

const getUsuariosView = () => {
    router.push({ name: 'ListaUsuarios' })
}
const getUsuariosImport = () => {
    router.push({ name: 'Importar Usuarios' })
}
const getUsuariosRegister = () => {
    router.push({ name: 'Registrar Usuario' })
}
</script>