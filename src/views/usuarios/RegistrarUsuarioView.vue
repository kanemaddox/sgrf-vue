<template>
  <CRow>
    <CCol :xs="0" :sm="1" :md="2" :lg="2" class="align-self-start"></CCol>

    <!-- ================================================================================ -->
    <!-- Formulario de Registro de Usuario                                          -->
    <!-- ================================================================================ -->
    <CCol :xs="12" :sm="10" :md="8" :lg="8" class="align-self-center">
      <CCard>
        <CForm @submit.prevent="createUsuario">
          <CCardHeader class="headercolor justify-content-between align-items-center">
            <div class="align-items-center">
              <CIcon icon="cil-description" size="lg" class="me-2 text-light" />
              <label class="mb-0 fs-6 text-white">Registrar Usuario</label>
            </div>
          </CCardHeader>
          <CCardBody>
            <CRow>
              <CCol :xs="12" :sm="6" :md="6" :lg="6">
                <CAlert color="success">I. Datos Personales</CAlert>
                <CInputGroup size="sm" class="mb-3">
                  <CInputGroupText class="headercolor" as="label">
                    <i class="bi bi-person-vcard me-2"></i>{{ idpName }} :
                  </CInputGroupText>
                  <CFormInput type="text" v-model="datos.idp" :placeholder="`Ingrese ${idpName.toLowerCase()}`"
                    :valid="idpValido" required />
                </CInputGroup>

                <CInputGroup size="sm" class="mb-3">
                  <CInputGroupText class="headercolor" as="label">
                    <i class="bi bi-person me-2"></i> Nombres :
                  </CInputGroupText>
                  <CFormInput type="text" v-model="datos.nombre" placeholder="Nombres" required />
                </CInputGroup>

                <CInputGroup size="sm" class="mb-3">
                  <CInputGroupText class="headercolor" as="label">Apellido Paterno :
                  </CInputGroupText>
                  <CFormInput type="text" v-model="datos.paterno" placeholder="Apellido Paterno" />
                </CInputGroup>

                <CInputGroup size="sm" class="mb-3">
                  <CInputGroupText class="headercolor" as="label">Apellido Materno :
                  </CInputGroupText>
                  <CFormInput type="text" v-model="datos.materno" placeholder="Apellido Materno" />
                </CInputGroup>

                <CInputGroup size="sm" class="mb-3">
                  <CInputGroupText class="headercolor" as="label">
                    <i class="bi bi-envelope-at me-2"></i>Email :
                  </CInputGroupText>
                  <CFormInput type="email" v-model="datos.email" placeholder="Email" :valid="emailValido" required />
                </CInputGroup>
              </CCol>

              <CCol :xs="12" :sm="6" :md="6" :lg="6">
                <CAlert color="success">II. Datos Complementarios</CAlert>

                <CInputGroup size="sm" class="mb-3">
                  <CInputGroupText class="headercolor" as="label">
                    <i class="bi bi-pencil-square me-2"></i>Profesion :
                  </CInputGroupText>
                  <CFormInput list="lista-profesiones" type="text" v-model="datos.profesion" placeholder="Profesion"
                    required />
                  <datalist id="lista-profesiones">
                    <option v-for="(item, index) in registro.profesion" :key="index" :value="item.nombre">
                      {{ item.nombre }}
                    </option>
                  </datalist>
                </CInputGroup>
                <CInputGroup size="sm" class="mb-3">
                  <CInputGroupText class="headercolor" as="label">Banco : </CInputGroupText>
                  <CFormInput list="lista-bancos" type="text" v-model="datos.bancoNombre"
                    placeholder="Banco de Preferencia" required />
                  <datalist id="lista-bancos">
                    <option v-for="(item, index) in registro.banco" :key="index" :value="item.nombre">
                      {{ item.nombre }}
                    </option>
                  </datalist>
                </CInputGroup>

                <CInputGroup size="sm" class="mb-3">
                  <CInputGroupText class="headercolor" as="label">Numero de Cuenta :
                  </CInputGroupText>
                  <CFormInput type="text" v-model="datos.numero" :valid="cuentaValida"
                    placeholder="Numero de Cuenta Bancaria" required />
                </CInputGroup>

                <CInputGroup size="sm" class="mb-3">
                  <CInputGroupText class="headercolor" as="label">Tipo de Cuenta :
                  </CInputGroupText>
                  <CFormInput type="text" v-model="datos.tipoCuenta" placeholder="Tipo de la Cuenta Bancaria"
                    required />
                </CInputGroup>

              </CCol>

              <CCol :xs="12" :sm="12" :md="12" :lg="12">
                <CAlert color="success">III. Datos laborales</CAlert>
                <CInputGroup size="sm" class="mb-3">
                  <CInputGroupText class="headercolor" as="label">
                    <i class="bi bi-person-badge-fill me-2"></i>Cargo :
                  </CInputGroupText>
                  <CFormInput list="lista-cargos" v-model="datos.cargoNombre" type="text" placeholder="Cargo"
                    required />
                  <CInputGroupText class="headercolor">
                    <CFormCheck type="checkbox" v-model="datos.tipo" /><span class="me-2"></span>
                    Jefe
                  </CInputGroupText>
                  <datalist id="lista-cargos">
                    <option v-for="(item, index) in registro.cargo" :key="index" :value="item.nombre">
                      {{ item.nombre }}
                    </option>
                  </datalist>
                </CInputGroup>

                <hr>

                <CInputGroup size="sm" class="mb-3">
                  <CInputGroupText class="headercolor" as="label">
                    Dependencia :
                  </CInputGroupText>
                  <CFormSelect v-model="datos.departamento" required>
                    <option value="">Seleccionar</option>
                    <option v-for="(item, index) in registro.estructura" :key="index" :value="item.departamento">
                      {{ item.departamento }} | {{ item.codigo }}
                    </option>
                  </CFormSelect>
                </CInputGroup>

                <CInputGroup size="sm" class="mb-3">
                  <CInputGroupText class="headercolor" as="label">Centro de Costos :
                  </CInputGroupText>
                  <CFormSelect v-model="datos.nombreCentroCostos" required>
                    <option value="">Seleccionar</option>
                    <option v-for="(item, index) in listaCCostos" :key="index" :value="item.departamento">
                      {{ item.departamento }} | {{ item.codigo }}
                    </option>
                  </CFormSelect>
                </CInputGroup>

                <CInputGroup size="sm" class="mb-3">
                  <CInputGroupText class="headercolor" as="label">Sub Centro de Costos :
                  </CInputGroupText>
                  <CFormSelect v-model="datos.nombreSubCentroCostos" required>
                    <option value="">Seleccionar</option>
                    <option v-for="(item, index) in listaSCostos" :key="index" :value="item.departamento">
                      {{ item.departamento }} | {{ item.codigo }}
                    </option>
                  </CFormSelect>
                </CInputGroup>

                <hr>

                <CInputGroup size="sm" class="mb-3" v-if="!datos.tipo">
                  <CInputGroupText class="headercolor" as="label">
                    <i class="bi bi-person-bounding-box me-2"></i>{{ idpName }} Jefe :
                  </CInputGroupText>
                  <CFormInput list="lista-jefes" v-model="datos.idpJefe" type="text" placeholder="Jefe  Designado"
                    :valid="jefeValido" :required="!datos.tipo" />
                  <datalist id="lista-jefes">
                    <option v-for="(item, index) in registro.jefe" :key="index" :value="item.idp">
                      {{ item.nombre }} {{ item.paterno }} {{ item.materno }}
                    </option>
                  </datalist>
                </CInputGroup>

                <CInputGroup size="sm" class="mb-3">
                  <CInputGroupText class="headercolor" as="label">
                    <i class="bi bi-person-bounding-box me-2"></i>Responsable de Pago :
                  </CInputGroupText>
                  <CFormSelect v-model="datos.idpPago" required>
                    <option>Seleccionar</option>
                    <option v-for="(item, index) in registro.pago" :key="index" :value="item.idp">
                      {{ item.nombre }} {{ item.paterno }} {{ item.materno }}
                    </option>
                  </CFormSelect>
                </CInputGroup>
              </CCol>
            </CRow>

          </CCardBody>
          <CCardFooter class="text-end">
            <CRow>
              <CCol :xs="0" :sm="4" :md="4" :lg="4" class="d-grid gap-2"></CCol>
              <CCol :xs="6" :sm="4" :md="4" :lg="4" class="d-grid gap-2">
                <CButton color="danger" size="sm" class="text-white" @click="getCancelar">
                  <CIcon icon="cil-x" class="me-2" />
                  Cancelar
                </CButton>
              </CCol>
              <CCol :xs="6" :sm="4" :md="4" :lg="4" class="d-grid gap-2">
                <CButton v-if="!datosValidos" class="text-white" color="warning" size="sm" @click="revisarDatos">
                  <CIcon icon="cil-description" class="me-2" />
                  Verificar Datos
                </CButton>

                <CButton v-if="datosValidos" type="submit" class="text-white" color="success" size="sm">
                  <CIcon icon="cil-check-alt" class="me-2" />
                  Registrar
                </CButton>
              </CCol>
            </CRow>
          </CCardFooter>
        </CForm>
      </CCard>
    </CCol>

    <CCol :xs="0" :sm="1" :md="2" :lg="2" class="align-self-end"></CCol>
  </CRow>
  <br>

</template>

<script setup>
// ============================================================================
// 1. IMPORTACIONES
// ============================================================================

import { ref, reactive, onMounted, watch, onUnmounted } from 'vue'
import { useAuthStore } from '@/stores/authStores'
import { useBreadcrumb } from '@/composables/useBreadcrumb'
import { useUsuario } from '@/composables/useUsuario';
import { useFunction } from '@/composables/useFunction'
import { useRouter } from 'vue-router'
import { useAlert } from '@/composables/useAlert'
import 'bootstrap-icons/font/bootstrap-icons.css'

// ============================================================================
// 2. INICIALIZACIÓN DE STORES, COMPOSABLES Y ROUTER
// ============================================================================
const { addDatosUse, getDatosEmpleadosUse, getUsuarioValidoUse, registro } = useUsuario()
const { dataLoading, close, confirm, error, success } = useAlert()
const { setActions, clearActions } = useBreadcrumb()
const { esDigito } = useFunction()
const router = useRouter()
const auth = useAuthStore()

// ============================================================================
// 3. DATOS DEL USUARIO AUTENTICADO
// ============================================================================
const idpName = ref(auth.idpName)

// ============================================================================
// 4. DECLARACIONES DE VARIABLES
// ============================================================================
const listaCCostos = ref([])
const listaSCostos = ref([])
const jefeValido = ref(false)
const cuentaValida = ref(false)
const datosValidos = ref(false)
const idpValido = ref(false)
const emailValido = ref(false)

const datos = reactive({
  idp: '',
  nombre: '',
  paterno: '',
  materno: '',
  email: '',
  profesion: '',
  cargoNombre: '',
  emailCor: '',
  bancoNombre: '',
  numero: '',
  tipoCuenta: '',
  codigoDepartamento: 'Nuevo',

  codigoCentroCostos: '',
  nombreCentroCostos: '',
  codigoSubCentroCostos: '',
  nombreSubCentroCostos: '',
  departamento: '',
  idpJefe: '',
  estado: true,
  tipo: false,
  idpPago: ''
})

// ============================================================================
// 5. FUNCIONES DE NAVEGACIÓN
// ============================================================================
const getCancelar = async () => {
  const resultAlert = await confirm('Salir del Registro de Usuario', 'Desea Salir del Formulario ??', '')
  if (resultAlert.isConfirmed) {
    getSalir()
  }
}
const salir = () => {
  getSalir()
}

const getSalir = () => {
  router.push({ name: 'UsuariosMenu' })
}

const revisarDatos = async () => {
  cuentaValida.value = esDigito(datos.numero)
  let mscuenta = "El numero de cuenta no es valido"
  let validos = false
  jefeValido.value = false
  try {
    validos = await getUsuarioValidoUse(datos.idp, datos.email)
  } catch (errr) {
    console.log(errr)
  }
  if (datos.tipo) {
    jefeValido.value = true
    datos.idpJefe = 'Ninguno'
  } else {
    registro.jefe.forEach(element => {
      if (element.idp === datos.idpJefe) {
        jefeValido.value = true
      }
    })
  }
  if (cuentaValida.value && validos.estado && jefeValido.value) {
    datosValidos.value = true
    idpValido.value = true
    emailValido.value = true
    await success('Verificacion Existosa!!', 'Los datos son validos, puede registrar al Usuario')
  }
  else {
    if (cuentaValida.value) {
      mscuenta = ""
    }
    idpValido.value = false
    emailValido.value = false
    jefeValido.value = false
    await error('Datos no Validos!!!', validos.usuario + ' ' + validos.password + ' ' + mscuenta, '')
  }
}

const createUsuario = async () => {
  const resultAlert = await confirm('Registro de Usuario', 'Desea registrar al Usuario ??', '')
  if (resultAlert.isConfirmed) {
    datos.emailCor = datos.email
    if (datos.tipo) {
      datos.idpJefe = 'Ninguno'
    }
    try {
      const resultService = await addDatosUse(datos)
      if (resultService.status == 201) {
        await success('Registro Completo', 'Usuario registrado Corectamente')
        router.push({ name: 'ListaUsuarios' })
      }
    } catch (errr) {
      error('Error !!!!', 'Datos Cancelados', errr)
    }
  }
  else {
    error('Datos Cancelados', '', '')
  }
}

watch(
  () => datos.departamento,
  (nuevo, anterior) => {
    listaCCostos.value = []
    listaSCostos.value = []
    datos.nombreCentroCostos = 'Seleccionar'
    if (nuevo !== anterior) {
      registro.estructura.forEach(element => {
        if (element.departamento === datos.departamento) {
          listaCCostos.value = element.costo
          datos.codigoDepartamento = element.codigo
        }
      })
    }
  }
)

watch(
  () => datos.nombreCentroCostos,
  (nuevo, anterior) => {
    listaSCostos.value = []
    datos.nombreSubCentroCostos = 'Seleccionar'
    if (nuevo !== anterior) {
      listaCCostos.value.forEach(element => {
        if (element.departamento === datos.nombreCentroCostos) {
          listaSCostos.value = element.sub
          datos.codigoCentroCostos = element.codigo
        }
      })
    }
  }
)

watch(
  () => datos.nombreSubCentroCostos,
  (nuevo, anterior) => {
    datos.codigoSubCentroCostos = ''
    if (nuevo !== anterior) {
      listaSCostos.value.forEach(element => {
        if (element.departamento === datos.nombreSubCentroCostos) {
          datos.codigoSubCentroCostos = element.codigo
        }
      })
    }
  }
)

watch(
  () => datos.idp,
  (nuevo, anterior) => {
    if (nuevo !== anterior) {
      datosValidos.value = false
      idpValido.value = false
    }
  }
)
watch(
  () => datos.email,
  (nuevo, anterior) => {
    if (nuevo !== anterior) {
      datosValidos.value = false
      emailValido.value = false
    }
  }
)
watch(
  () => datos.numero,
  (nuevo, anterior) => {
    if (nuevo !== anterior) {
      datosValidos.value = false
      cuentaValida.value = false
    }
  }
)
watch(
  () => datos.idpJefe,
  (nuevo, anterior) => {
    if (nuevo !== anterior) {
      datosValidos.value = false
      jefeValido.value = false
    }
  }
)
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
  dataLoading()
  try {
    await getDatosEmpleadosUse()
  } finally {
    close()
  }
  getAction()
})
onUnmounted(() => {
  clearActions()
})
// ============================================================================
// 7. CONFIGURACIÓN VISUAL
// ============================================================================
</script>