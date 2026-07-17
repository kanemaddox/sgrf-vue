<template>
    <CRow>
        <!--Datos Personales -->
        <CCol :xs="12" :sm="5" :md="4">
            <CCard>
                <CCardHeader class="headercolor">
                    <h6>
                        <CIcon icon="cil-description" size="lg" class="me-2" />Perfil de Usuario
                    </h6>
                </CCardHeader>
                <CCardBody>
                    <CCol :xs="12">
                        <CWidgetStatsC class="mb-3" :value="perfilUsuario.idp"
                            :progress="{ color: perfilUsuario.estado ? 'success' : 'danger', value: 100 }"
                            title="Visitors">
                            <template #icon>
                                <img :src="perfilUsuario.imagen" class="img-fluid " alt="..."><br>
                            </template>
                            <template #title>
                                {{ perfilUsuario.nombre }} {{ perfilUsuario.apellido }}
                                <CAlert v-if="!perfilUsuario.estado" color="danger">
                                    Usuario Inactivo o Bloqueado, restablesca la contrasena para habilitar al usuario
                                </CAlert>
                            </template>
                        </CWidgetStatsC>
                    </CCol>

                </CCardBody>
            </CCard>
        </CCol>
        <!--End Datos Personales -->

        <!--Datos De Usuario -->
        <CCol :xs="12" :sm="7" :md="8">
            <br>
            <CCard>
                <CCardHeader class="headercolor">
                    <h6>
                        <CIcon icon="cil-clipboard" size="lg" class="me-2" />Informacion del Perfil
                    </h6>
                </CCardHeader>
                <CCardBody>
                    <CTabs :activeItemKey="1">
                        <CTabList variant="tabs" layout="justified">
                            <CTab class="d-flex align-items-center gap-2 px-3 " :itemKey="1">
                                <CIcon icon="cil-description"></CIcon>
                                <span class="d-none d-md-inline">Registro</span>
                            </CTab>
                            <CTab class="d-flex align-items-center gap-2 px-3 " :itemKey="2">
                                <CIcon icon="cil-list-rich"></CIcon>
                                <span class="d-none d-md-inline">Permisos</span>
                            </CTab>
                        </CTabList>
                        <CTabContent>
                            <CTabPanel class="p-3" :itemKey="1">
                                <CTabs activeItemKey="datosUno">
                                    <CTabList variant="underline-border">
                                        <CTab class="d-flex align-items-center gap-2 px-3 " itemKey="datosUno">
                                            <CIcon icon="cil-user"></CIcon>
                                            <span class="d-none d-md-inline">Datos</span>
                                        </CTab>
                                        <CTab class="d-flex align-items-center gap-2 px-3 py-2" itemKey="datosDos">
                                            <CIcon icon="cil-clipboard"></CIcon>
                                            <span class="d-none d-md-inline">Archivo</span>
                                        </CTab>
                                        <CTab class="d-flex align-items-center gap-2 px-3 py-2" itemKey="datosTres">
                                            <CIcon icon="cil-pencil"></CIcon>
                                            <span class="d-none d-md-inline">Actualizar</span>
                                        </CTab>
                                    </CTabList>
                                    <CTabContent>
                                        <CTabPanel class="py-3" itemKey="datosUno">
                                            <br>
                                            <ComponenteDatos :persona="personaUsuario" :idpName="idpName" />
                                            <CWidgetStatsB class="mb-3" :progress="{ color: 'success', value: 100 }">
                                                <template #value>BANCO {{ perfilUsuario.banco }}</template>
                                                <template #title>Numero de Cuenta : {{ perfilUsuario.numero
                                                }}</template>
                                                <template #text>
                                                    {{ perfilUsuario.cuenta }} | {{ perfilUsuario.numero }}<br><br>
                                                    <CButton color="secondary" variant="outline" size="sm"
                                                        @click="clickModalCuenta(true)">
                                                        <CIcon icon="cil-dollar" class="me-2" />
                                                        Mas Cuentas
                                                    </CButton>
                                                </template>
                                            </CWidgetStatsB>
                                        </CTabPanel>
                                        <!--Tab Archivo-->
                                        <CTabPanel class="py-3" itemKey="datosDos">
                                            <br>
                                            <CInputGroup size="sm" class="mb-3">
                                                <CInputGroupText class="headercolor" as="label">Profesion :
                                                </CInputGroupText>
                                                <CFormInput type="text" :value="perfilUsuario.profesion" disabled />
                                                <CButton type="button" color="success" class="font" size="sm"
                                                    @click="clickModalProfesion(true)">
                                                    <CIcon icon="cil-list" size="sm" class="me-2 text-light" />
                                                    Listar
                                                </CButton>
                                            </CInputGroup>

                                            <CInputGroup size="sm" class="mb-3">
                                                <CInputGroupText class="headercolor" as="label">Cargo :
                                                </CInputGroupText>
                                                <CFormInput type="text" :value="perfilUsuario.cargo" disabled />
                                                <CButton type="button" color="success" class="font" size="sm"
                                                    @click="clickModalCargo(true)">
                                                    <CIcon icon="cil-list" size="sm" class="me-2 text-light" />
                                                    Listar
                                                </CButton>
                                            </CInputGroup>

                                            <CInputGroup size="sm" class="mb-3">
                                                <CInputGroupText class="headercolor" as="label">Email Corporativo :
                                                </CInputGroupText>
                                                <CFormInput type="text" :value="perfilUsuario.corporativo" disabled />
                                            </CInputGroup>

                                            <CInputGroup size="sm" class="mb-3">
                                                <CInputGroupText class="headercolor" as="label">Jefe :
                                                </CInputGroupText>
                                                <CFormInput type="text" :value="perfilUsuario.jefe" disabled />
                                                <CInputGroupText class="headercolor" as="label">{{ idpName }} :
                                                </CInputGroupText>
                                                <CFormInput type="text" :value="perfilUsuario.idpJefe" disabled />
                                            </CInputGroup>

                                            <CWidgetStatsB class="mb-3"
                                                :progress="{ color: perfilUsuario.estado ? 'success' : 'danger', value: 100 }">
                                                <template #value></template>
                                                <template #title>{{ perfilUsuario.nombreArea }}</template>
                                                <template #text>
                                                    <ul>
                                                        <li>{{ perfilUsuario.codigoArea }} | {{ perfilUsuario.nombreArea
                                                        }}
                                                        </li>
                                                    </ul>
                                                </template>
                                            </CWidgetStatsB>
                                        </CTabPanel>

                                        <!--Tab Actualizar-->
                                        <CTabPanel class="py-3" itemKey="datosTres">
                                            <br>
                                            <CInputGroup size="sm" class="mb-3">
                                                <CInputGroupText class="headercolor" as="label">{{ idpName }} :
                                                </CInputGroupText>
                                                <CFormInput type="text" :value="perfilUsuario.idp" disabled />
                                                <CInputGroupText class="headercolor" as="label">ID Usuario :
                                                </CInputGroupText>
                                                <CFormInput type="text" :value="perfilUsuario.idUsuario" disabled />
                                            </CInputGroup>

                                            <CInputGroup size="sm" class="mb-3">
                                                <CInputGroupText class="headercolor" as="label">Email :
                                                </CInputGroupText>
                                                <CFormInput type="text" :value="perfilUsuario.email" disabled />
                                                <CInputGroupText class="headercolor" as="label">Celular :
                                                </CInputGroupText>
                                                <CFormInput type="text" :value="perfilUsuario.celular" disabled />
                                                <CButton type="button" color="success" class="font" size="sm"
                                                    @click="clickModalCelular(true)">
                                                    Actualizar</CButton>
                                            </CInputGroup>

                                            <CInputGroup size="sm" class="mb-3">
                                                <CInputGroupText class="headercolor" as="label">Password
                                                </CInputGroupText>
                                                <CFormInput type="text" value="***************" disabled />
                                                <CButton type="button" color="success" class="font" size="sm"
                                                    @click="restablecerPassword">
                                                    Restablecer Contraseña</CButton>
                                            </CInputGroup>
                                        </CTabPanel>

                                    </CTabContent>
                                </CTabs>
                            </CTabPanel>
                            <CTabPanel class="p-3" :itemKey="2">
                                <ComponentePermisos :userPernicions="pernicions" />
                            </CTabPanel>
                        </CTabContent>
                    </CTabs>
                </CCardBody>
            </CCard>
        </CCol>
        <!--Datos De Usuario -->
    </CRow>

    <!-- Modal  Cuentas Bancarias-->
    <CModal backdrop="static" size="lg" :visible="modalCuenta" @close="clickModalCuenta(false)">
        <CModalHeader class="headercolor" dismiss @close="clickModalCuenta(false)">
            <CModalTitle>
                <h6>
                    <CIcon icon="cil-list" size="lg" class="me-2" />Cuentas Bancarias del Usuario
                </h6>
            </CModalTitle>
        </CModalHeader>
        <CModalBody>
            <CRow class="table-responsive">
                <CTable hover responsive>
                    <CTableHead>
                        <CTableRow>
                            <CTableHeaderCell>ID</CTableHeaderCell>
                            <CTableHeaderCell>Banco</CTableHeaderCell>
                            <CTableHeaderCell>Tipo</CTableHeaderCell>
                            <CTableHeaderCell>Numero</CTableHeaderCell>
                            <CTableHeaderCell>Estado</CTableHeaderCell>
                        </CTableRow>
                    </CTableHead>
                    <CTableBody>
                        <CTableRow v-for="(item, index) in listaBancaria" :key="index">
                            <CTableDataCell>{{ item.id }}</CTableDataCell>
                            <CTableDataCell>{{ item.banco }}</CTableDataCell>
                            <CTableDataCell>{{ item.tipo }}</CTableDataCell>
                            <CTableDataCell>{{ item.numero }}</CTableDataCell>
                            <CTableDataCell>
                                <CBadge :color="item.estado ? 'success' : 'danger'">
                                    {{ item.estado ? 'Activo' : 'Inactivo' }}
                                </CBadge>
                            </CTableDataCell>
                        </CTableRow>
                    </CTableBody>
                </CTable>
            </CRow>
        </CModalBody>
        <CModalFooter>
            <CButton @click="clickModalCuenta(false)" color="danger" class="font" size="sm">
                <CIcon icon="cil-x" class="me-2" />Cancelar
            </CButton>
            <CButton @click="clickModalCuenta(false)" class="font" color="success" size="sm">
                <CIcon icon="cil-check-alt" class="me-2" />
                Aceptar
            </CButton>
        </CModalFooter>
    </CModal>
    <!-- End Modal  Cuentas Bancarias-->

    <!-- Modal  Cargos-->
    <CModal backdrop="static" size="xl" :visible="modalCargo" @close="clickModalCargo(false)">
        <CModalHeader class="headercolor" dismiss @close="clickModalCargo(false)">
            <CModalTitle>
                <h6>
                    <CIcon icon="cil-list" size="lg" class="me-2" />Lista de Cargos del Usuario
                </h6>
            </CModalTitle>
        </CModalHeader>
        <CModalBody>
            <CRow class="table-responsive">
                <CTable hover responsive>
                    <CTableHead>
                        <CTableRow>
                            <CTableHeaderCell>ID</CTableHeaderCell>
                            <CTableHeaderCell>Cargo</CTableHeaderCell>
                            <CTableHeaderCell>Periodo</CTableHeaderCell>
                            <CTableHeaderCell>Estado</CTableHeaderCell>
                        </CTableRow>
                    </CTableHead>
                    <CTableBody>
                        <CTableRow v-for="(item, index) in listaCargos" :key="index">
                            <CTableDataCell>{{ item.id }}</CTableDataCell>
                            <CTableDataCell>
                                {{ item.cargo }}
                                <div class="small text-body-secondary text-nowrap">
                                    <span><strong>Jefe :</strong> {{ item.jefe }} | {{ item.idpJefe }}</span>
                                </div>
                            </CTableDataCell>
                            <CTableDataCell>
                                <div class="small text-body-secondary text-nowrap">
                                    <span><strong>Del :</strong> {{ item.del }} </span><br>
                                    <span><strong>Al :</strong> {{ item.al }} </span>
                                </div>
                            </CTableDataCell>
                            <CTableDataCell>
                                <CBadge :color="item.estado ? 'success' : 'danger'">
                                    {{ item.estado ? 'Activo' : 'Inactivo' }}
                                </CBadge>
                            </CTableDataCell>
                        </CTableRow>
                    </CTableBody>
                </CTable>
            </CRow>
        </CModalBody>
        <CModalFooter>
            <CButton @click="clickModalCargo(false)" color="danger" class="font" size="sm">
                <CIcon icon="cil-x" class="me-2" />Cancelar
            </CButton>
            <CButton @click="clickModalCargo(false)" class="font" color="success" size="sm">
                <CIcon icon="cil-check-alt" class="me-2" />
                Aceptar
            </CButton>
        </CModalFooter>
    </CModal>
    <!-- End Modal  Cargos-->

    <!-- Modal  Profesiones -->
    <CModal backdrop="static" size="xl" :visible="modalProfesion" @close="clickModalProfesion(false)">
        <CModalHeader class="headercolor" dismiss @close="clickModalProfesion(false)">
            <CModalTitle>
                <h6>
                    <CIcon icon="cil-list" size="lg" class="me-2" />Lista de Profesiones del Usuario
                </h6>
            </CModalTitle>
        </CModalHeader>
        <CModalBody>
            <CRow class="table-responsive">
                <CTable hover responsive>
                    <CTableHead>
                        <CTableRow>
                            <CTableHeaderCell>ID</CTableHeaderCell>
                            <CTableHeaderCell>Profesion</CTableHeaderCell>
                            <CTableHeaderCell>Periodo</CTableHeaderCell>
                            <CTableHeaderCell>Estado</CTableHeaderCell>
                        </CTableRow>
                    </CTableHead>
                    <CTableBody>
                        <CTableRow v-for="(item, index) in listaProfesiones" :key="index">
                            <CTableDataCell>{{ item.id }}</CTableDataCell>
                            <CTableDataCell>
                                {{ item.profesion }}
                            </CTableDataCell>
                            <CTableDataCell>
                                <div class="small text-body-secondary text-nowrap">
                                    <span><strong>Del :</strong> {{ item.del }} </span><br>
                                    <span><strong>Al :</strong> {{ item.al }} </span>
                                </div>
                            </CTableDataCell>
                            <CTableDataCell>
                                <CBadge :color="item.estado ? 'success' : 'danger'">
                                    {{ item.estado ? 'Activo' : 'Inactivo' }}
                                </CBadge>
                            </CTableDataCell>
                        </CTableRow>
                    </CTableBody>
                </CTable>
            </CRow>
        </CModalBody>
        <CModalFooter>
            <CButton @click="clickModalProfesion(false)" color="danger" class="font" size="sm">
                <CIcon icon="cil-x" class="me-2" />Cancelar
            </CButton>
            <CButton @click="clickModalProfesion(false)" class="font" color="success" size="sm">
                <CIcon icon="cil-check-alt" class="me-2" />
                Aceptar
            </CButton>
        </CModalFooter>
    </CModal>
    <!-- End Modal  Profesiones-->

    <!-- Modal  Actualizar Celular-->
    <CModal :visible="modalCelular" backdrop="static" @close="clickModalCelular(false)">
        <CForm @submit.prevent="updateCelular">
            <CModalHeader class="headercolor" dismiss @close="clickModalCelular(false)">
                <CModalTitle>
                    <h6>
                        <CIcon icon="cil-pencil" size="lg" class="me-2" />Actualizar Numero de Celular
                    </h6>
                </CModalTitle>
            </CModalHeader>
            <CModalBody>
                <ComponenteNombres :datos="datos" />
                <CInputGroup class="mb-3">
                    <CInputGroupText as="label" class="headercolor">Nuevo Numero de Celular : </CInputGroupText>
                    <CFormInput type="text" v-model="celular.celular" required />
                </CInputGroup>
            </CModalBody>
            <CModalFooter>
                <CButton @click="clickModalCelular(false)" color="danger" class="font" size="sm">
                    <CIcon icon="cil-x" class="me-2" />Cancelar
                </CButton>

                <CButton type="submit" class="font" color="success" size="sm">
                    <CIcon icon="cil-check-alt" class="me-2" />
                    <span>Actualizar</span>
                </CButton>
            </CModalFooter>
        </CForm>
    </CModal>
    <!-- End Modal  Actualizar Celular-->
</template>

<script setup>

const usuario = defineProps({
    idUsuario: {
        type: String, // o Number, dependiendo de lo que mandes
        required: true
    }
})

import ComponenteDatos from '@/components/usuario/ComponenteDatos.vue'
import ComponentePermisos from '@/components/usuario/ComponentePermisos.vue'
import ComponenteNombres from '@/components/usuario/ComponenteNombres.vue'

import { CCol, CRow, CTabContent, CTabList, CTabPanel } from '@coreui/vue'
import { onMounted, ref, reactive } from 'vue'

import { useUsuario } from '@/composables/useUsuario'
const { perfilUsuario, personaUsuario, updatePasswordUse, getDatosUsuarioUse, loading, errorUse } = useUsuario()

import { useAuthStore } from '@/stores/authStores'
const auth = useAuthStore()
const idpName = ref(auth.idpName)

/**DEclataciones para los modales */
const modalCuenta = ref(false)
const modalCargo = ref(false)
const modalProfesion = ref(false)
const modalCelular = ref(false)

const pernicions = ref({
    id: null,
    rol: null,
    pernicions: {}
})

const datos = ref({
    idp: '',
    nombre: '',
    apellidos: '',
    idpName: ''
})
const celular = reactive({
    id:'',
    celular:''
})

/**Paralas Cuentas Bancarias  */
import { useCuentasBancarias } from '@/composables/useCuentaBancaria'
const { listaBancaria, getCuentasBancariasUse } = useCuentasBancarias()
/**End Cuentas Bancarias  */

/**End Cargos del Usuario  */
import { useEmpleado } from '@/composables/useEmpleado'
const { listaCargos, getEmpleadoCargoUsuarioUse } = useEmpleado()
/**End Cargos del Usuario  */

/**End Profesiones del Usuario  */
import { usePersona } from '@/composables/usePersona'
const { listaProfesiones,getPersonaProfesionUsuarioUse, updateCelularUse } = usePersona()
/**End Profesiones del Usuario  */

/**Funcniones */
const clickModalCuenta = async (value) => {
    if (value) {
        await getCuentasBancariasUse(perfilUsuario.idPersona)
    }
    modalCuenta.value = value
}

const clickModalCargo = async (value) => {
    if (value) {
        await getEmpleadoCargoUsuarioUse(usuario.idUsuario)
    }
    modalCargo.value = value
}

const clickModalProfesion = async (value) => {
    if (value) {
        await getPersonaProfesionUsuarioUse(usuario.idUsuario)
    }
    modalProfesion.value = value
}

const restablecerPassword = async () => {
    await updatePasswordUse(usuario.idUsuario,perfilUsuario.nombre,perfilUsuario.apellido)
}

const clickModalCelular = (value) => {
    modalCelular.value = value
}

const updateCelular = async () => {
    clickModalCelular(false)
    const resultService = await updateCelularUse(celular)
    if (resultService) {
        location.reload()
    }
    else{
        celular.value.celular = perfilUsuario.celular
    }
}

const getLoadData = () => {
    pernicions.value = { ...perfilUsuario.pernicions }

    datos.value.idp = personaUsuario.idp
    datos.value.nombre = personaUsuario.nombre
    datos.value.apellidos = personaUsuario.paterno
    datos.value.idpName = idpName
    
    celular.id = perfilUsuario.idPersona
    celular.celular = perfilUsuario.celular
}

onMounted(async () => {
    const tooltips = document.querySelectorAll('.tooltip');
    tooltips.forEach(tooltip => tooltip.remove());
    if (usuario.idUsuario !== null && usuario.idUsuario !== undefined) {
        await getDatosUsuarioUse(usuario.idUsuario)
        getLoadData()
    }
})

</script>