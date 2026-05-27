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
                        <CWidgetStatsC class="mb-3" :value="perfil?.idp"
                            :progress="{ color: perfil?.estado ? 'success' : 'danger', value: 100 }" title="Visitors">
                            <template #icon>
                                <img :src="imagen" class="img-fluid " alt="..."><br>
                            </template>
                            <template #title>
                                {{ perfil?.nombre }} {{ perfil?.apellido }}
                                <CAlert v-if="!perfil?.estado" color="danger">
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
                                            <ComponenteDatos :persona="persona" />
                                            <CWidgetStatsB class="mb-3" :progress="{ color: 'success', value: 100 }">
                                                <template #value>BANCO {{ perfil?.bancoNombre }}</template>
                                                <template #title>Numero de Cuenta : {{ perfil?.numero }}</template>
                                                <template #text>
                                                    {{ perfil?.tipoCuenta }} | {{ perfil?.numero }}<br><br>
                                                    <CButton color="secondary" variant="outline" size="sm"
                                                        @click="clickModalCuenta(true)">
                                                        <CIcon icon="cil-dollar" class="me-2" />
                                                        Mas Cuentas
                                                    </CButton>
                                                </template>
                                            </CWidgetStatsB>
                                        </CTabPanel>
                                        <CTabPanel class="py-3" itemKey="datosDos">
                                            <br>
                                            <CInputGroup size="sm" class="mb-3">
                                                <CInputGroupText class="headercolor" as="label">Profesion
                                                </CInputGroupText>
                                                <CFormInput type="text" :value="perfil?.profesionNombre" disabled />
                                                <CButton type="button" color="success" class="font" size="sm"
                                                    @click="clickModalProfesion(true)">
                                                    <CIcon icon="cil-list" size="sm" class="me-2 text-light" />
                                                    Listar
                                                </CButton>
                                            </CInputGroup>

                                            <CInputGroup size="sm" class="mb-3">
                                                <CInputGroupText class="headercolor" as="label">Cargo</CInputGroupText>
                                                <CFormInput type="text" :value="perfil?.cargoNombre" disabled />
                                                <CButton type="button" color="success" class="font" size="sm"
                                                    @click="clickModalCargo(true)">
                                                    <CIcon icon="cil-list" size="sm" class="me-2 text-light" />
                                                    Listar
                                                </CButton>
                                            </CInputGroup>

                                            <CInputGroup size="sm" class="mb-3">
                                                <CInputGroupText class="headercolor" as="label">Jefe</CInputGroupText>
                                                <CFormInput type="text" :value="perfil?.nombreJefe" disabled />
                                                <CInputGroupText class="headercolor" as="label">IDP</CInputGroupText>
                                                <CFormInput type="text" :value="perfil?.idpJefe" disabled />
                                            </CInputGroup>

                                            <CWidgetStatsB class="mb-3"
                                                :progress="{ color: perfil?.estado ? 'success' : 'danger', value: 100 }">
                                                <template #value>{{ perfil?.prefijoSucursal }}</template>
                                                <template #title>{{ perfil?.nombreArea }}</template>
                                                <template #text>
                                                    <ul>
                                                        <li>{{ perfil?.codigoSucursal }} | {{ perfil?.nombreSucursal }}
                                                        </li>
                                                        <li>{{ perfil?.codigoCentroCostos }} | {{
                                                            perfil?.nombreCentroCostos
                                                        }}</li>
                                                    </ul>
                                                </template>
                                            </CWidgetStatsB>
                                        </CTabPanel>
                                        <CTabPanel class="py-3" itemKey="datosTres">
                                            <br>
                                            <CInputGroup size="sm" class="mb-3">
                                                <CInputGroupText class="headercolor" as="label">IPD</CInputGroupText>
                                                <CFormInput type="text" :value="persona.idp" disabled />
                                                <CInputGroupText class="headercolor" as="label">ID Usuario
                                                </CInputGroupText>
                                                <CFormInput type="text" :value="idUsuario" disabled />
                                            </CInputGroup>

                                            <CInputGroup size="sm" class="mb-3">
                                                <CInputGroupText class="headercolor" as="label">Email</CInputGroupText>
                                                <CFormInput type="text" :value="persona.email" disabled />
                                                <CInputGroupText class="headercolor" as="label">Celular
                                                </CInputGroupText>
                                                <CFormInput type="text" :value="persona.celular" disabled />
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

    <!-- Modal  Cuenatas Bancarias-->
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
                        <CTableRow v-for="(item, index) in lista" :key="index">
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

                <br>
                <CInputGroup class="mb-3">
                    <CInputGroupText as="label">Nuevo Numero de Celular</CInputGroupText>
                    <CFormInput type="text" v-model="persona.celular" required />
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

import { CCol, CRow, CTabContent, CTabList, CTabPanel } from '@coreui/vue'
import { onMounted, ref, reactive } from 'vue'

import { useUsuario } from '@/composables/useUsuario'
const { updatePasswordUse, getDatosUsuarioUse, loading, errorUse } = useUsuario()

import { API_URL_IMG100, API_URL_IMG200, API_URL_IMG800 } from "@/env"
const img200 = API_URL_IMG200
const img800 = API_URL_IMG800
const img100 = API_URL_IMG100

/**Declaraciones para alertas */
import { useAlert } from '@/composables/useAlert'
const { confirm, success, error } = useAlert()

/**End Declaraciones para alertas */

var nombre100 = "/public/usuario.png"
var nombre200 = nombre100
var nombre800 = nombre200
const imagen = ref(nombre100)

/**DEclataciones para los modales */
const modalCuenta = ref(false)
const modalCargo = ref(false)
const modalProfesion = ref(false)

const perfil = ref(null)
const pernicions = reactive({
    id: null,
    rol: null,
    pernicions: {}
})
const persona = reactive({
    id: null,
    idp: null,
    nombre: null,
    paterno: null,
    materno: null,
    celular: null,
    email: null
})

/**Paralas Cuentas Bancarias  */
import { useCuentasBancarias } from '@/composables/useCuentaBancaria'
const { getCuentasBancariasUse } = useCuentasBancarias()
const lista = ref([])
/**End Cuentas Bancarias  */

/**End Cargos del Usuario  */
import { useEmpleado } from '@/composables/useEmpleado'
const { getEmpleadoCargoUsuarioUse } = useEmpleado()
const listaCargos = ref([])
/**End Cargos del Usuario  */

/**End Profesiones del Usuario  */
import { usePersona } from '@/composables/usePersona'
const { getPersonaProfesionUsuarioUse, updateCelularUse } = usePersona()
const listaProfesiones = ref([])
/**End Profesiones del Usuario  */

/**Funcniones */

const getDatosUsuario = async (value) => {
    try {
        perfil.value = await getDatosUsuarioUse(value)
        if (perfil.value.imagen != "usuario.png") {
            imagen.value = img100 + perfil.value.imagen
        }
        persona.id = perfil.value.idPersona
        persona.idp = perfil.value.idp
        persona.nombre = perfil.value.nombre
        persona.paterno = perfil.value.apellido
        persona.materno = ''
        persona.email = perfil.value.email
        persona.celular = perfil.value.celular
        pernicions.id = perfil.value.idUsuario
        pernicions.rol = perfil.value.rol
        pernicions.pernicions = perfil.value.pernicions
    } catch (errr) {
        console.log(errr)

    }
}

const clickModalCuenta = async (value) => {
    if (value) {
        try {
            const cuentas = await getCuentasBancariasUse(perfil.value.idPersona)
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
    modalCuenta.value = value
}

const clickModalCargo = async (value) => {
    if (value) {
        try {
            const cargos = await getEmpleadoCargoUsuarioUse(usuario.idUsuario)
            listaCargos.value = cargos.map(item => ({
                id: item.id,
                cargo: item.cargo,
                estado: item.estado,
                idpJefe: item.idpJefe,
                jefe: item.jefe,
                del: item.fechaCreacion,
                al: item.fechaActualizacion
            }))
            console.log(listaCargos.value)
        } catch (errr) {
            console.log(errr)
        }
    }
    modalCargo.value = value
}

const clickModalProfesion = async (value) => {
    if (value) {
        try {
            const profesiones = await getPersonaProfesionUsuarioUse(usuario.idUsuario)
            listaProfesiones.value = profesiones.map(item => ({
                id: item.id,
                profesion: item.profesion,
                estado: item.estado,
                del: item.fechaCreacion,
                al: item.fechaActualizacion
            }))
            console.log(listaProfesiones.value)
        } catch (errr) {
            console.log(errr)
        }
    }
    modalProfesion.value = value
}

const restablecerPassword = async () => {
    try {
        const resultAlert = await confirm('Esta seguro ???', 'Restablecer la contraseña del Usuario ' + persona?.nombre + ' ' + persona?.paterno, '')
        if (resultAlert.isConfirmed) {
            const resultService = await updatePasswordUse(usuario.idUsuario)
            if (resultService === true) {
                await success('Constrasena Restablecida Correctamente')
                location.reload()
            }
            else {
                await error('ERROR !!!!!', 'La contrasena no pudo restablecerse, verifique e intente nuevamente')
            }
        }

    } catch (errr) {
        await error('ERROR !!!!', 'Servicio no disponible')
        console.log(errr)

    }
}

const modalCelular = ref(false)

const clickModalCelular = (value) => {
    modalCelular.value = value
}

const updateCelular = async () => {
    clickModalCelular(false)
    const resultAlert = await confirm('Desea Actualizar el numero de Celular ?')
    if (resultAlert.isConfirmed) {
        try {
            const resultService = await updateCelularUse(persona)
            if (resultService.status == 200) {
                await success('Numero de Celular Actualizado Correctamente')
                location.reload()
            }
            else {
                await error('No se pudo Actualizar el nuevo Numero de celular, intente nuevamente')
            }
        } catch (err) {
            await error('Error al Actualizar los datos intente mas tarde ' + err)
        }
    }
    else {
        await error('Datos Cancelados')
    }
}

onMounted(async () => {
    const tooltips = document.querySelectorAll('.tooltip');
    tooltips.forEach(tooltip => tooltip.remove());
    if (usuario.idUsuario !== null && usuario.idUsuario !== undefined)
        getDatosUsuario(usuario.idUsuario)
})

</script>