<template>
    <CRow>
        <!-- ==================================================================== -->
        <!-- Tarjeta para mostrar usuarios                                        -->
        <!-- ==================================================================== -->
        <CCol :xs="12" :sm="4" :md="3" :lg="3">
            <CCard>
                <!-- Cabecera de la tarjeta -->
                <CCardHeader class="headercolor text-white d-flex align-items-center ">
                    <i class="bi bi-people me-2"></i>
                    <span class="fs-6">Lista de Usuarios</span>
                </CCardHeader>

                <!-- Cuerpo de la tarjeta  -->
                <CCardBody class="d-flex flex-column align-items-center justify-content-center text-center p-4">
                    <!-- Icono principal en contenedor estético -->
                    <div class="icon-container mb-3 text-primary bg-light p-3 rounded-circle shadow-inner"
                        style="width: 100px; height: 100px;">
                        <i class="bi bi-people fs-1"></i>
                    </div>
                    <h6 class="fw-bold text-body mb-1">Usuarios Registrados</h6>
                    <small class="text-body-secondary">Consulta y gestiona el listado completo</small>
                </CCardBody>

                <!-- Pie de la Tarjeta -->
                <CCardFooter class="bg-transparent border-0 text-center pb-3">
                    <CButton color="primary" variant="outline" class="w-100 rounded-pill" @click="getUsuariosView">
                        Ver Usuarios
                        <CIcon icon="cil-arrow-right" class="ms-1" />
                    </CButton>
                </CCardFooter>
            </CCard>
        </CCol>

        <!-- ==================================================================== -->
        <!-- Tarjeta de para mostrar adminsitradores         -->
        <!-- ==================================================================== -->
        <CCol :xs="12" :sm="4" :md="3" :lg="3">
            <div class="d-md-none mb-3"></div>
            <CCard>
                <!-- Cabecera de la tarjeta -->
                <CCardHeader class="headercolor text-white d-flex align-items-center">
                    <i class="bi bi-people-fill me-2"></i>
                    <span class="fs-6 text-white">Administradores</span>
                </CCardHeader>
                <!-- Cuerpo de la tarjeta  -->
                <CCardBody class="d-flex flex-column align-items-center justify-content-center text-center p-4">
                    <!-- Icono principal en contenedor estético -->
                    <div class="icon-container mb-3 bg-warning-subtle bg-light p-3 rounded-circle shadow-inner"
                        style="width: 100px; height: 100px;">
                        <i class="bi bi-people-fill text-warning fs-1"></i>
                    </div>
                    <h6 class="fw-bold text-body mb-1">Administradores</h6>
                    <small class="text-body-secondary">Consulta y gestiona el listado completo</small>
                </CCardBody>
                <!-- Pie de la Tarjeta -->
                <CCardFooter class="bg-transparent border-0 text-center pb-3">
                    <CButton color="primary" variant="outline" class="w-100 rounded-pill" @click="getAdmin">
                        Ver Administradores
                        <CIcon icon="cil-arrow-right" class="ms-1" />
                    </CButton>
                </CCardFooter>
            </CCard>
        </CCol>

        <!-- ==================================================================== -->
        <!-- Tarjeta para importar lista de usuarios por Excel                    -->
        <!-- ==================================================================== -->
        <CCol :xs="12" :sm="4" :md="3" :lg="3">
            <div class="d-md-none mb-3"></div>
            <CCard>
                <!-- Cabecera de la tarjeta -->
                <CCardHeader class="headercolor text-white d-flex align-items-center">
                    <i class="bi bi-file-earmark-excel me-2"></i>
                    <span class="fs-6">Importar Usuarios</span>
                </CCardHeader>

                <!-- Cuerpo de la tarjeta  -->
                <CCardBody class="d-flex flex-column align-items-center justify-content-center text-center p-4">
                    <!-- Icono principal en contenedor estético -->
                    <div class="icon-container mb-3 bg-success-subtle bg-light p-3 rounded-circle shadow-inner"
                        style="width: 100px; height: 100px;">
                        <i class="bi bi-file-earmark-excel text-success fs-1"></i>
                    </div>
                    <h6 class="fw-bold text-body mb-2">Importar desde Excel</h6>
                    <!-- Enlace para descargar el formato/plantilla -->
                    <small class="text-body-secondary">
                        <a href="#" @click.prevent="formato">
                            descarga el formato Excel
                        </a>
                    </small>
                </CCardBody>

                <!-- Pie de la Tarjeta -->
                <CCardFooter class="bg-transparent border-0 text-center pb-3">
                    <CButton color="primary" variant="outline" class="w-100 rounded-pill" @click="getUsuariosImport">
                        Importar
                        <CIcon icon="cil-arrow-right" class="ms-1" />
                    </CButton>
                </CCardFooter>

            </CCard>
        </CCol>

        <!-- ==================================================================== -->
        <!-- Tarjeta para registrar un nuevo usuario         -->
        <!-- ==================================================================== -->
        <CCol :xs="12" :sm="4" :md="3" :lg="3">
            <div class="d-md-none mb-3"></div>
            <CCard>
                <!-- Cabecera de la tarjeta -->
                <CCardHeader class="headercolor text-white d-flex align-items-center">
                    <i class="bi bi-person-add me-2"></i>
                    <span class="fs-6 text-white">Registrar Usuario</span>
                </CCardHeader>
                <!-- Cuerpo de la tarjeta  -->
                <CCardBody class="d-flex flex-column align-items-center justify-content-center text-center p-4">
                    <!-- Icono principal en contenedor estético -->
                    <div class="icon-container mb-3 bg-secundary-subtle bg-light p-3 rounded-circle shadow-inner"
                        style="width: 100px; height: 100px;">
                        <i class="bi bi-person-add fs-1"></i>
                    </div>
                    <h6 class="fw-bold text-body mb-1">Registrar Usuario</h6>
                    <small class="text-body-secondary">Registra un usuario nuevo</small>
                    
                </CCardBody>
                <!-- Pie de la Tarjeta -->
                <CCardFooter class="bg-transparent border-0 text-center pb-3">
                    <CButton color="primary" variant="outline" class="w-100 rounded-pill" @click="getUsuariosRegister">
                        Registrar
                        <CIcon icon="cil-arrow-right" class="ms-1" />
                    </CButton>
                </CCardFooter>
            </CCard>
        </CCol>
    </CRow>

</template>
<script setup>
import { onMounted, onUnmounted } from 'vue';
import 'bootstrap-icons/font/bootstrap-icons.css'
import { useBreadcrumb } from '@/composables/useBreadcrumb'
const { setActions, clearActions } = useBreadcrumb()
import { useRouter } from 'vue-router'
const router = useRouter()

/**Funciones */
const salir = () => {
    getSalir()
}

const getSalir = () => {
    router.push({ name: 'Home' })
}

const getUsuariosView = () => {
    router.push({ name: 'ListaUsuarios' })
}
const getUsuariosImport = () => {
    router.push({ name: 'Importar Usuarios' })
}
const getUsuariosRegister = () => {
    router.push({ name: 'Registrar Usuario' })
}
const getAdmin = () => {
    router.push({ name: 'Administradores' })
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
const formato = () => {
    const urlArchivo = '/plantilla_usuarios.xlsx'
    const enlace = document.createElement('a')
    enlace.href = urlArchivo
    enlace.download = 'Formato_Plantilla.xlsx'
    document.body.appendChild(enlace)
    enlace.click()
    document.body.removeChild(enlace)
}
onMounted(() => {
    getAction()
})
onUnmounted(() => {
    clearActions()
})
</script>