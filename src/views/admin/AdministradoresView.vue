<template>
    <CRow>
        <CCol :xs="12">
            <CCard>
                <CCardHeader class="headercolor justify-content-between align-items-center">
                    <CRow>
                        <CCol :xs="7" :sm="6" :md="6" :lg="6">
                            <div class="align-items-center">
                                <CIcon icon="cil-group" size="lg" class="me-2 text-light" />
                                <label class="mb-0 fs-6 text-white">Administradores</label>
                            </div>
                        </CCol>
                        <CCol :xs="5" :sm="6" :md="6" :lg="6" class="text-end">
                            <CDropdown variant="btn-group">
                                <CDropdownToggle class="font border-0" size="sm">
                                    <CIcon icon="cil-menu" color="dark" class="me-2 text-success" />Opciones
                                </CDropdownToggle>
                                <CDropdownMenu class="pt-0">
                                    <CDropdownHeader component="h6"
                                        class="bg-body-secondary text-body-secondary fw-semibold mb-2 rounded-top">
                                        Opciones
                                    </CDropdownHeader>
                                    <CDropdownItem style="cursor: pointer;" @click="clickModalUsuario(true)">
                                        <CIcon icon="cil-user-plus" /> Agregar Administradores
                                    </CDropdownItem>
                                </CDropdownMenu>
                            </CDropdown>
                        </CCol>
                    </CRow>
                </CCardHeader>
                <CCardBody>
                    <div class="table-responsive">
                        <CTable hover responsive>
                            <CTableHead>
                                <CTableRow>
                                    <CTableHeaderCell>#</CTableHeaderCell>
                                    <CTableHeaderCell></CTableHeaderCell>
                                    <CTableHeaderCell>Administrador</CTableHeaderCell>
                                    <CTableHeaderCell>Estado</CTableHeaderCell>
                                    <CTableHeaderCell>Acciones</CTableHeaderCell>
                                </CTableRow>
                            </CTableHead>
                            <CTableBody>
                                <CTableRow v-for="(item, index) in listaUsuario" :key="index">
                                    <CTableDataCell>{{ index + 1 }}</CTableDataCell>
                                    <CTableDataCell>
                                        <CAvatar size="xl" :src="item.imagen.foto" :status="item.imagen.estado" />
                                    </CTableDataCell>
                                    <CTableDataCell>
                                        {{ item.datos.nombre }} {{ item.datos.apellido }}
                                        <div class="small text-body-secondary text-nowrap">
                                            <span><strong>IDP : </strong>{{ item.datos.idp }}</span><br>
                                            <span><strong>Email : </strong>{{ item.datos.email }}</span><br>
                                        </div>

                                    </CTableDataCell>

                                    <CTableDataCell>
                                        <CBadge :color="item.estado ? 'success' : 'danger'">
                                            {{ item.estado ? 'Activo' : 'Inactivo' }}
                                        </CBadge>
                                    </CTableDataCell>
                                    <CTableDataCell>
                                        <CButtonGroup role="group" size="sm">
                                            <CButton color="secondary" variant="outline" @click="getPerfil(item.id)"
                                                v-c-tooltip="{ content: 'Ver Perfil Usuario', placement: 'top' }">
                                                <i class="bi bi-person me-2"></i>
                                            </CButton>
                                            <CButton color="danger" variant="outline" @click="deleteAdm(item.id)"
                                                v-c-tooltip="{ content: 'Eliminar Administrador ', placement: 'top' }">
                                                <i class="bi bi-trash me-2"></i>
                                            </CButton>
                                        </CButtonGroup>

                                    </CTableDataCell>
                                </CTableRow>
                            </CTableBody>
                        </CTable>
                    </div>
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
                    <option v-for="(item, index) in listaAdm" :key="index" :value="item.nombre">
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
import { watch, reactive, ref, onMounted } from 'vue'

import { useAuthStore } from '@/stores/authStores'
const auth = useAuthStore()

import { useRouter } from 'vue-router'
const router = useRouter()

import { useUsuario } from '@/composables/useUsuario'
const { updateUsuarioRolUse,findByRolUse, findAllResponseUse, loading, errorUse } = useUsuario()

import {useAlert} from '@/composables/useAlert'
const {input,confirm, error, success} = useAlert()

import { API_URL_IMG100 } from "@/env"
import { CTableDataCell, CTableHeaderCell } from '@coreui/vue'
const img100 = API_URL_IMG100

const idUsuario = ref(auth.idUsuario)
const listaUsuario = ref([])
const listaAdm = ref([])
const modalUsuario = ref(false)
const idAdm = ref("")
const adm = ref(null)
/**Funciones */
const findByRol = async (value) => {
    console.log(value)
    try {
        const resultLista = await findByRolUse(value)
        const lista = resultLista.data
        listaUsuario.value = lista.map(item => ({
            id: item.id,
            imagen: {
                foto: item.persona?.foto === 'usuario.png' ? '/public/usuario.png' : API_URL_IMG100 + item.persona.foto,
                estado: item.estado ? 'success' : 'danger',
            },
            datos: {
                idp: item.persona?.idp,
                nombre: item.persona?.nombre,
                apellido: item.persona?.paterno + " " + item.persona?.materno,
                email: item.persona?.email,
                celular: item.persona?.celular,
            },
            estado: item.estado,
            acciones: item.id,
        }))
    } catch (errr) {
        console.log(errr)
    }

}
const getPerfil = (value) => {
    router.push({
        name: 'Perfil de Usuario',
        params: { idUsuario: value }
    })
}

const clickModalUsuario = (value) => {
    modalUsuario.value = value
}

const findAllResponse = async (value) => {
    try {
        const resultLista = await findAllResponseUse(value)
        const lista = resultLista.data
        listaAdm.value = lista.map(item => ({
            id: item.id,
            idp: item.persona?.idp,
            nombre: item.persona?.nombre + " " + item.persona?.paterno + " " + item.persona?.materno,
            estado: item.estado,
        }))
    } catch (errr) {
        console.log(errr)
    }

}
const updateAdm = async() =>{
    clickModalUsuario(false)
    const resultAlert = await input('Verificar Datos')
    if(resultAlert.isConfirmed){
        try{
            const resultService = await updateUsuarioRolUse(idUsuario.value,resultAlert.value,adm.value?.id,'ADMIN')
            if(resultService.data){
                await success('Well Done!!!','Administrador Agregado Correctamente','')
                location.reload()
            }
            else{
                await error('Error !!!!', 'Password Incirrecto','')    
            }
        }catch(errr){
            await error('Error !!!!', 'Verifique sus credenciales e intente nuevamente','')
        }
    }
    else{
        await error('Datos Cancelados','','')
    }
    
}
const deleteAdm = async(id) =>{
    const resultAlert = await input('Para Eliminar al Administrador ingrese su password')
    if(resultAlert.isConfirmed){
        try{
            const resultService = await updateUsuarioRolUse(idUsuario.value,resultAlert.value,id,'USER')
            if(resultService.data){
                await success('Well Done!!!','Administrador Eliminado Correctamente','')
                location.reload()
            }
            else{
                await error('Error !!!!', 'Password Incirrecto','')    
            }
        }catch(errr){
            await error('Error !!!!', 'Verifique sus credenciales e intente nuevamente','')
        }
    }
    else{
        await error('Datos Cancelados','','')
    }
    
}
watch(() => idAdm.value,
    (value) => {
        adm.value = listaAdm.value.find(u => u.nombre === value)
    })


onMounted(() => {
    const tooltips = document.querySelectorAll('.tooltip')
    tooltips.forEach(tooltip => tooltip.remove());
    findByRol('ADMIN')
    findAllResponse('TODOS')
})

</script>