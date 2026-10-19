<template>
    <CRow>
        <!-- ================================================================================ -->
        <!-- Tabla de Administradores                                                         -->
        <!-- ================================================================================ -->
        <CCol :xs="12">
            <CCard>
                <!-- Cabecera de la tarjeta con estilo -->
                <CCardHeader class="headercolor justify-content-between align-items-center">
                    <CIcon icon="cil-group" size="lg" class="me-2 text-light" />
                    <label class="mb-0 fs-6 text-white">Administradores</label>
                </CCardHeader>
                <CCardBody>
                    <CRow class="table-responsive">
                        <DataTable :data="listaAdm" :columns="columns" class="table table-striped"
                            :options="{ responsive: true, language: { search: 'Buscar:', lengthMenu: 'Mostrar _MENU_ registros' } }">

                            <template #column-imagen="{ cellData }">
                                <CAvatar size="xl" :src="cellData.foto" :status="cellData.estado" />
                            </template>

                            <template #column-datos="{ cellData }">
                                <div class="d-flex flex-column">
                                    <span class="fw-bold text-dark mb-1">
                                        {{ cellData.nombre }} {{ cellData.apellido }}
                                    </span>
                                    <div class="text-muted small d-flex align-items-center gap-2">
                                        <span><i class="bi bi-envelope me-2"></i>{{ cellData.email }}</span>
                                        <span>•</span>
                                        <span><i class="bi bi-phone me-2"></i>{{ cellData.celular }}</span>
                                    </div>
                                    <span class="badge bg-light text-secondary border mt-1 align-self-start"
                                        style="font-size: 0.75rem;">
                                        ID: {{ cellData.idp }}
                                    </span>
                                </div>
                            </template>

                            <!-- Estado personalizado -->
                            <template #column-estado="{ cellData }">
                                <CChip :color="cellData ? 'success' : 'danger'">
                                    <i :class="cellData ?'bi bi-check-circle text-success':'bi bi-x-circle text-danger'"></i>{{ cellData ? 'Activo' : 'Inactivo' }}
                                </CChip>
                            </template>

                            <template #column-acciones="{ cellData }">
                                <CButtonGroup role="group" size="sm">
                                    <CButton color="secondary" variant="ghost" @click="getPerfil(cellData)">
                                        <i class="bi bi-person me-2"></i>
                                        <span class="d-none d-md-inline">Perfil</span>
                                    </CButton>

                                    <CButton color="danger" class="custom-hover-btn" variant="ghost"
                                        @click="deleteAdm(cellData)">
                                        <i class="bi bi-trash me-2"></i>
                                        <span class="d-none d-md-inline">Eliminar</span>
                                    </CButton>
                                </CButtonGroup>
                            </template>
                        </DataTable>
                    </CRow>
                </CCardBody>
            </CCard>
        </CCol>
    </CRow>

    <!-- ================================================================================ -->
    <!-- Modal para Agregar Administradores                                              -->
    <!-- ================================================================================ -->
    <CModal :visible="modalUsuario" alignment="center" backdrop="static" @close="clickModalUsuario(false)">
        <CForm @submit.prevent="updateAdm">
            <!-- Cabecera del modal -->
            <CModalHeader class="headercolor py-3" dismiss @close="clickModalUsuario(false)">
                <CModalTitle class="d-flex align-items-center text-white">
                    <CIcon icon="cil-user-plus" size="lg" class="me-2" />
                    <span class="fs-6">Agregar Administrador</span>
                </CModalTitle>
            </CModalHeader>

            <!-- Cuerpo del modal optimizado -->
            <CModalBody class="p-3 p-md-4">
                <div class="mb-3">
                    <label class="form-label fw-semibold text-secondary small">Buscar Usuario</label>
                    <CInputGroup class="shadow-sm">
                        <CInputGroupText class="headercolor text-white border-0" as="label">
                            <i class="bi bi-search"></i>
                        </CInputGroupText>
                        <CFormInput list="lista-user" type="text" v-model="idAdm"
                            placeholder="Escriba el nombre del usuario..." class="shadow-none" required />
                    </CInputGroup>
                </div>

                <datalist id="lista-user">
                    <option v-for="(item, index) in listaUsuario" :key="index" :value="item.nombre">
                        {{ item.nombre }} | {{ idpName }}: {{ item.idp }}
                    </option>
                </datalist>

                <!-- Alerta informativa modernizada y adaptativa -->
                <CAlert color="success" class="d-flex flex-column gap-1 border-0 shadow-sm mt-3 py-3"
                    v-if="adm?.estado">
                    <div class="d-flex justify-content-between align-items-center">
                        <span class="fw-bold text-success-emphasis">
                            <i class="bi bi-check-circle-fill me-1"></i> Usuario Seleccionado
                        </span>
                        <span class="badge bg-success text-white">ID: {{ adm?.id }}</span>
                    </div>
                    <hr class="my-2 text-success opacity-25">
                    <div class="small text-secondary">
                        <div><strong>{{ idpName }}:</strong> {{ adm?.idp }}</div>
                        <div><strong>Nombre:</strong> {{ adm?.nombre }}</div>
                    </div>
                </CAlert>
            </CModalBody>

            <!-- Pie del modal adaptativo (Responsive para móviles) -->
            <CModalFooter>
                <CButton @click="clickModalUsuario(false)" color="danger" size="sm" class="text-white">
                    <CIcon icon="cil-x" class="me-1" /> Cancelar
                </CButton>

                <CButton type="submit" color="success" size="sm" class="text-white" :disabled="!adm?.estado">
                    <CIcon icon="cil-user-plus" class="me-1" />
                    <span>Agregar</span>
                </CButton>
            </CModalFooter>
        </CForm>
    </CModal>
</template>

<script setup>

// ============================================================================
// 1. IMPORTACIONES
// ============================================================================
import 'bootstrap-icons/font/bootstrap-icons.css'
import DataTable from 'datatables.net-vue3'
import DataTablesCore from 'datatables.net-bs5'
import 'datatables.net-bs5/css/dataTables.bootstrap5.css'
import { watch, ref, onMounted, onUnmounted } from 'vue'
import { useBreadcrumb } from '@/composables/useBreadcrumb'
import { useAuthStore } from '@/stores/authStores'
import { useRouter } from 'vue-router'
import { useUsuario } from '@/composables/useUsuario'
import { useAlert } from '@/composables/useAlert'

// ============================================================================
// 2. INICIALIZACIÓN DE STORES, COMPOSABLES Y ROUTER
// ============================================================================

DataTable.use(DataTablesCore)
const { setActions, clearActions } = useBreadcrumb()
const auth = useAuthStore()
const router = useRouter()
const { findAllUserUse, listaAdm, listaUsuario, updateUsuarioRolUse, findByRolUse } = useUsuario()
const { dataLoading, close, input, error } = useAlert()

// ============================================================================
// 3. DATOS DEL USUARIO AUTENTICADO
// ============================================================================
const idUsuario = ref(auth.idUsuario)
const idpName = ref(auth.idpName)

// ============================================================================
// 4. DECLARACIONES DE VARIABLES
// ============================================================================
const modalUsuario = ref(false)
const idAdm = ref("")
const adm = ref(null)

const columns = [
    { data: 'id', title: 'ID' },
    { data: 'imagen', title: '', name: "imagen" },
    { data: 'datos', title: 'Administradores', name: 'datos' },
    { data: 'estado', title: 'Estado', name: 'estado' },
    {
        data: 'acciones',
        title: 'Acciones',
        orderable: false,
        searchable: false,
        name: 'acciones'
    }
]

// ============================================================================
// 5. FUNCIONES DE NAVEGACIÓN
// ============================================================================

const salir = () => {
    getSalir()
}

const getSalir = () => {
    router.push({ name: 'UsuariosMenu' })
}

const getPerfil = (value) => {
    router.push({
        name: 'PerfilUsuario',
        params: { idUsuario: value }
    })
}

const administrador = () => {
    clickModalUsuario(true)
}
const clickModalUsuario = (value) => {
    modalUsuario.value = value
}

const updateAdm = async () => {
    clickModalUsuario(false)
    const resultAlert = await input('Verificar Datos')
    if (resultAlert.isConfirmed) {
        const resultService = await updateUsuarioRolUse(idUsuario.value, resultAlert.value, adm.value?.id, 'ADMIN')
        if (resultService) {
            location.reload()
        }
    }
    else {
        await error('Datos Cancelados', '', '')
    }
}

const deleteAdm = async (id) => {
    const resultAlert = await input('Para Eliminar al Administrador ingrese su password')
    if (resultAlert.isConfirmed) {
        const resultService = await updateUsuarioRolUse(idUsuario.value, resultAlert.value, id, 'USER')
        if (resultService) {
            location.reload()
        }
    }
    else {
        await error('Datos Cancelados', '', '')
    }
}

watch(
    () => idAdm.value,
    (value) => {
        adm.value = listaUsuario.value.find(u => u.nombre === value)
    }
)

const getAction = () => {
    setActions([
        {
            visible: true,
            label: 'Agregar',
            icon: 'cil-user-plus',
            color: 'secondary',
            variant: 'ghost',
            disabled: false,
            onClick: administrador
        },
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
        await findByRolUse('ADMIN')
        await findAllUserUse('TODOS')
    } finally {
        close()
    }
    getAction()
})
onUnmounted(() => {
    clearActions()
})

</script>

<style>
@import 'datatables.net-bs5/css/dataTables.bootstrap5.css';
@import 'datatables.net-responsive-bs5/css/responsive.bootstrap5.css';
</style>