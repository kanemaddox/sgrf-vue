<template>
    <CRow>
        <!--Card para observaciones Aprobadas-->
        <CCol :xs="12" :sm="4" :md="3" :lg="3">
            <CCard>
                <CCardHeader class="headercolor">
                    <i class="bi bi-people me-2"></i>
                    <label class="mb-0 fs-6 text-white">Lista de Usuarios</label>
                </CCardHeader>
                <CCardBody class="text-center">
                    <i class="bi bi-people me-2" style="font-size: 5rem;"></i>
                    <p>Usuarios Registrados</p>
                </CCardBody>
                <CCardFooter class="text-center">
                    <CButton color="secondary" variant="outline" size="sm" @click="getUsuariosView">
                        <i class="bi bi-people me-2"></i> Ver Usuarios
                    </CButton>
                </CCardFooter>
            </CCard>
        </CCol>
        
        <CCol :xs="12" :sm="4" :md="3" :lg="3">
            <div class="d-md-none mb-3"></div>
            <CCard>
                <CCardHeader class="headercolor">
                    <i class="bi bi-people-fill me-2"></i>
                    <label class="mb-0 fs-6 text-white">Administradores</label>
                </CCardHeader>
                <CCardBody class="text-center">
                    <i class="bi bi-people-fill me-2" style="font-size: 5rem;"></i>
                    <p>Administradores del Sistema</p>
                </CCardBody>
                <CCardFooter class="text-center">
                    <CButton color="secondary" variant="outline" size="sm" @click="getAdmin">
                        <i class="bi bi-people-fill me-2"></i> Ver Lista
                    </CButton>
                </CCardFooter>
            </CCard>
        </CCol>

        <CCol :xs="12" :sm="4" :md="3" :lg="3">
            <div class="d-md-none mb-3"></div>
            <CCard>
                <CCardHeader class="headercolor">
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
            <div class="d-md-none mb-3"></div>
            <CCard>
                <CCardHeader class="headercolor">
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
const getAdmin =()=>{
    router.push({name:'Administradores'})
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
onMounted(() => {
    getAction()
})
onUnmounted(() => {
    clearActions()
})
</script>