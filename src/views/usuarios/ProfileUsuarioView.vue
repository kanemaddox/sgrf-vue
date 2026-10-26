<template>
  <CRow>
    <!-- ================================================================================ -->
    <!-- Targeta del Perfil Usuario                                                       -->
    <!-- ================================================================================ -->
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
              :progress="{ color: perfilUsuario.estado ? 'success' : 'danger', value: 100 }" title="Visitors">
              <template #icon>
                <div class="position-relative d-inline-block mb-3">
                  <img :src="perfilUsuario.imagen" class="img-fluid rounded-circle" style=" object-fit: cover;" alt="Avatar de perfil" />
                </div>
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

    <!-- ================================================================================ -->
    <!-- Targeta de Datos del Usuario                                                     -->
    <!-- ================================================================================ -->
    <CCol :xs="12" :sm="7" :md="8">
      <div class="d-md-none mb-3"></div>
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
                Registro
              </CTab>
              <CTab class="d-flex align-items-center gap-2 px-3 " :itemKey="2">
                <CIcon icon="cil-list-rich"></CIcon>
                Permisos
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
                  <!--Contenido Pestanas -->
                  <CTabContent>
                    <!--Tab Datos-->
                    <CTabPanel class="py-3" itemKey="datosUno">
                      <br>
                      <ComponenteDatos :persona="personaUsuario" :idpName="idpName" />
                      <CWidgetStatsB class="mb-3" :progress="{ color: 'success', value: 100 }">
                        <template #value>BANCO {{ perfilUsuario.banco }}</template>
                        <template #title>Numero de Cuenta : {{ perfilUsuario.numero
                          }}</template>
                        <template #text>
                          {{ perfilUsuario.cuenta }} | {{ perfilUsuario.numero }}<br><br>
                          <CButton color="secondary" variant="outline" size="sm" @click="clickModalCuenta(true)">
                            <CIcon icon="cil-dollar" class="me-2" />
                            Mas Cuentas
                          </CButton>
                        </template>
                      </CWidgetStatsB>
                    </CTabPanel>
                    <!--Tab Datos-->

                    <!--Tab Archivo-->
                    <CTabPanel class="py-3" itemKey="datosDos">
                      <br>
                      <ComponenteArchivo :archivo="archivo" />
                    </CTabPanel>
                    <!--Tab Archivo-->

                    <!--Tab Actualizar-->
                    <CTabPanel class="py-3" itemKey="datosTres">
                      <br>
                      <ComponenteActualizar :actualizar="actualizar" />
                    </CTabPanel>
                    <!--Tab Actualizar-->
                  </CTabContent>
                </CTabs>
              </CTabPanel>
              <!--Permisos-->
              <CTabPanel class="p-3" :itemKey="2">
                <ComponentePermisos :userPernicions="pernicions" />
              </CTabPanel>
              <!--Permisos-->
            </CTabContent>
          </CTabs>
        </CCardBody>
      </CCard>
    </CCol>
    <!--Datos De Usuario -->
  </CRow>

  <!-- ================================================================================ -->
  <!-- Modal para Cuentas Bancarias                                                     -->
  <!-- ================================================================================ -->
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
</template>

<script setup>
// ============================================================================
// Props
// ============================================================================
const usuario = defineProps({
  idUsuario: {
    type: String, 
    required: true
  }
})

// ============================================================================
// 1. IMPORTACIONES
// ============================================================================
import ComponenteDatos from '@/components/usuario/ComponenteDatos.vue'
import ComponentePermisos from '@/components/usuario/ComponentePermisos.vue'
import ComponenteArchivo from '@/components/usuario/ComponenteArchivo.vue'
import ComponenteActualizar from '@/components/usuario/ComponenteActualizar.vue'
import { onMounted, ref, reactive, onUnmounted } from 'vue'
import { useBreadcrumb } from '@/composables/useBreadcrumb'
import { useRouter } from 'vue-router'
import { useUsuario } from '@/composables/useUsuario'
import { useAuthStore } from '@/stores/authStores'
import { useAlert } from '@/composables/useAlert'
import { useCuentasBancarias } from '@/composables/useCuentaBancaria'
import 'bootstrap-icons/font/bootstrap-icons.css'

// ============================================================================
// 2. INICIALIZACIÓN DE STORES, COMPOSABLES Y ROUTER
// ============================================================================
const { setActions, clearActions } = useBreadcrumb()
const { perfilUsuario, personaUsuario, getDatosUsuarioUse } = useUsuario()
const { dataLoading, close } = useAlert()
const { listaBancaria, getCuentasBancariasUse } = useCuentasBancarias()
const router = useRouter()
const auth = useAuthStore()

// ============================================================================
// 3. DATOS DEL USUARIO AUTENTICADO
// ============================================================================
const idpName = ref(auth.idpName)

// ============================================================================
// 4. DECLARACIONES DE VARIABLES
// ============================================================================

const modalCuenta = ref(false)

const pernicions = ref({
  id: null,
  rol: null,
  pernicions: {}
})

const archivo = reactive({
  id: '',
  profesion: '',
  cargo: '',
  corporativo: '',
  jefe: '',
  idpName: '',
  idpJefe: '',
  estado: false,
  codigoArea: '',
  nombreArea: ''
})

const actualizar = reactive({
  id: '',
  idPersona: '',
  nombre: '',
  apellido: '',
  celular: '',
  email: '',
  emailC:'',
  idp: '',
  idpName: '',
  datos: {
    idp: '',
    nombre: '',
    apellidos: '',
    idpName: ''
  }
})

// ============================================================================
// 5. FUNCIONES DE NAVEGACIÓN
// ============================================================================
const clickModalCuenta = async (value) => {
  if (value) {
    await getCuentasBancariasUse(perfilUsuario.idPersona)
  }
  modalCuenta.value = value
}

const getLoadData = () => {
  pernicions.value = { ...perfilUsuario.pernicions }

  /*Datos para el componente Archivo */
  archivo.id = usuario.idUsuario
  archivo.profesion = perfilUsuario.profesion
  archivo.cargo = perfilUsuario.cargo
  archivo.corporativo = perfilUsuario.corporativo
  archivo.jefe = perfilUsuario.jefe
  archivo.idpName = idpName
  archivo.idpJefe = perfilUsuario.idpJefe
  archivo.estado = perfilUsuario.estado
  archivo.codigoArea = perfilUsuario.codigoArea
  archivo.nombreArea = perfilUsuario.nombreArea

  /*Datos para el componente Actualizar */
  actualizar.id = usuario.idUsuario
  actualizar.idPersona = perfilUsuario.idPersona
  actualizar.nombre = perfilUsuario.nombre
  actualizar.apellido = perfilUsuario.apellido
  actualizar.celular = perfilUsuario.celular
  actualizar.email = perfilUsuario.email
  actualizar.emailC = perfilUsuario.corporativo
  actualizar.idp = perfilUsuario.idp
  actualizar.idpName = idpName
  actualizar.datos.idp = personaUsuario.idp
  actualizar.datos.nombre = personaUsuario.nombre
  actualizar.datos.apellidos = personaUsuario.paterno
  actualizar.datos.idpName = idpName
}

const salir = () => {
  getSalir()
}

const getSalir = () => {
  router.push({ name: 'ListaUsuarios' })
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

// ============================================================================
// 6. CICLO DE VIDA DEL COMPONENTE
// ============================================================================
onMounted(async () => {
  if (usuario.idUsuario !== null && usuario.idUsuario !== undefined) {
    dataLoading()
    try {
      await getDatosUsuarioUse(usuario.idUsuario)
      getLoadData()
    } finally {
      close()
    }
    getAction()
  }
})
onUnmounted(() => {
  clearActions()
})

// ============================================================================
// 7. CONFIGURACIÓN VISUAL
// ============================================================================

</script>