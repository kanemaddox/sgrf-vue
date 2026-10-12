<template>
    <CRow>
        <CCol :xs="12">
            <CCard>
                <CCardHeader class="headercolor justify-content-between align-items-center">
                    <CIcon icon="cil-group" size="lg" class="me-2 text-light" />
                    <label class="mb-0 fs-6 text-white">Administradores</label>
                </CCardHeader>
                <CCardBody>
                    <CRow class="table-responsive">
                        <DataTable :data="listaAdm" :columns="columns" class="table table-striped"
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
                                    <CButton color="secondary" variant="ghost" @click="getPerfil(cellData)">
                                        <i class="bi bi-person me-2"></i>
                                        <span class="d-none d-md-inline">Perfil</span>
                                    </CButton>

                                    <CButton color="danger" class="custom-hover-btn" variant="ghost" @click="deleteAdm(cellData)">
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

    <!-- Modal  Listar Usuarios-->
    <CModal :visible="modalUsuario" backdrop="static" @close="clickModalUsuario(false)">
        <CForm @submit.prevent="updateAdm">
            <CModalHeader class="headercolor" dismiss @close="clickModalUsuario(false)">
                <CModalTitle>
                    <h6>
                        <CIcon icon="cil-user-plus" size="lg" class="me-2" />Agregar Administrador
                    </h6>
                </CModalTitle>
            </CModalHeader>
            <CModalBody>
                <br>
                <CInputGroup class="mb-3">
                    <CInputGroupText class="headercolor" as="label">Buscar Usuario</CInputGroupText>
                    <CFormInput list="lista-user" type="text" v-model="idAdm" required />
                </CInputGroup>
                <datalist id="lista-user">
                    <option v-for="(item, index) in listaUsuario" :key="index" :value="item.nombre">
                        {{ item.nombre }} | {{ item.idp }}
                    </option>
                </datalist>
                <CAlert color="success" v-if="adm?.estado">
                    <label>ID : {{ adm?.id }}</label> | <label>{{ adm?.idp }}</label> <br>
                    <label>Usuario : {{ adm?.nombre }}</label>
                </CAlert>
            </CModalBody>
            <CModalFooter>
                <CButton @click="clickModalUsuario(false)" color="danger" class="font" size="sm">
                    <CIcon icon="cil-x" class="me-2" />Cancelar
                </CButton>

                <CButton type="submit" class="font" color="success" size="sm" :disabled="!adm?.estado">
                    <CIcon icon="cil-user-plus" class="me-2" />
                    <span>Agregar</span>
                </CButton>
            </CModalFooter>
        </CForm>
    </CModal>
    <!-- End Modal  Actualizar Celular-->
</template>

<script setup>
import 'bootstrap-icons/font/bootstrap-icons.css'
import DataTable from 'datatables.net-vue3'
import DataTablesCore from 'datatables.net-bs5'
import 'datatables.net-bs5/css/dataTables.bootstrap5.css'

DataTable.use(DataTablesCore)

import { watch, ref, onMounted, onUnmounted } from 'vue'

import { useBreadcrumb } from '@/composables/useBreadcrumb'
const { setActions, clearActions } = useBreadcrumb()
import { useAuthStore } from '@/stores/authStores'
const auth = useAuthStore()

import { useRouter } from 'vue-router'
const router = useRouter()

import { useUsuario } from '@/composables/useUsuario'
const { findAllUserUse, listaAdm, listaUsuario, updateUsuarioRolUse, findByRolUse } = useUsuario()

import { useAlert } from '@/composables/useAlert'
const { dataLoading, close, input, error } = useAlert()

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

const idUsuario = ref(auth.idUsuario)
const modalUsuario = ref(false)
const idAdm = ref("")
const adm = ref(null)

/**Funciones */
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
    const tooltips = document.querySelectorAll('.tooltip')
    tooltips.forEach(tooltip => tooltip.remove())
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