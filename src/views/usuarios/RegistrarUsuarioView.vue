<template>
    <CRow>
        <CCol :xs="0" :sm="1" :md="2" :lg="2" class="align-self-start"></CCol>
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
                                <CAlert color="secondary">I. Datos Personales</CAlert>
                                <CInputGroup size="sm" class="mb-3">
                                    <CInputGroupText class="headercolor" as="label">IDP </CInputGroupText>
                                    <CFormInput type="text" v-model="datos.idp" placeholder="Numero de Identificacion"
                                        :valid="idpValido" required />
                                </CInputGroup>

                                <CInputGroup size="sm" class="mb-3">
                                    <CInputGroupText class="headercolor" as="label">Nombres</CInputGroupText>
                                    <CFormInput type="text" v-model="datos.nombre" placeholder="Nombres del Usuario"
                                        required />
                                </CInputGroup>

                                <CInputGroup size="sm" class="mb-3">
                                    <CInputGroupText class="headercolor" as="label">Apellido Paterno
                                    </CInputGroupText>
                                    <CFormInput type="text" v-model="datos.paterno" placeholder="Apellido Paterno" />
                                </CInputGroup>

                                <CInputGroup size="sm" class="mb-3">
                                    <CInputGroupText class="headercolor" as="label">Apellido Materno
                                    </CInputGroupText>
                                    <CFormInput type="text" v-model="datos.materno" placeholder="Apellido Materno" />
                                </CInputGroup>

                                <CInputGroup size="sm" class="mb-3">
                                    <CInputGroupText class="headercolor" as="label">Email </CInputGroupText>
                                    <CFormInput type="email" v-model="datos.email" placeholder="Email del Usuario"
                                        :valid="emailValido" required />
                                </CInputGroup>
                            </CCol>
                            <CCol :xs="12" :sm="6" :md="6" :lg="6">
                                <CAlert color="secondary">II. Datos Complementarios</CAlert>

                                <CInputGroup size="sm" class="mb-3">
                                    <CInputGroupText class="headercolor" as="label">Profesion </CInputGroupText>
                                    <CFormInput list="lista-profesiones" type="text" v-model="datos.profesion"
                                        placeholder="Profesion del Usuario" required />
                                    <datalist id="lista-profesiones">
                                        <option v-for="(item, index) in empleado?.profesion" :key="index"
                                            :value="item.nombre">
                                            {{ item.nombre }}
                                        </option>
                                    </datalist>
                                </CInputGroup>
                                <CInputGroup size="sm" class="mb-3">
                                    <CInputGroupText class="headercolor" as="label">Banco </CInputGroupText>
                                    <CFormInput list="lista-bancos" type="text" v-model="datos.bancoNombre"
                                        placeholder="Banco de Preferencia del Usuario" required />
                                    <datalist id="lista-bancos">
                                        <option v-for="(item, index) in empleado?.banco" :key="index"
                                            :value="item.nombre">
                                            {{ item.nombre }}
                                        </option>
                                    </datalist>
                                </CInputGroup>

                                <CInputGroup size="sm" class="mb-3">
                                    <CInputGroupText class="headercolor" as="label">Numero de Cuenta
                                    </CInputGroupText>
                                    <CFormInput type="text" v-model="datos.numero" :valid="cuentaValida"
                                        placeholder="Numero de Cuenta Bancaria" required />
                                </CInputGroup>

                                <CInputGroup size="sm" class="mb-3">
                                    <CInputGroupText class="headercolor" as="label">Tipo de Cuenta
                                    </CInputGroupText>
                                    <CFormInput type="text" v-model="datos.tipoCuenta"
                                        placeholder="Tipo de la Cuenta Bancaria" required />
                                </CInputGroup>

                            </CCol>
                            <CCol :xs="12" :sm="12" :md="12" :lg="12">
                                <CAlert color="secondary">III. Datos Empleados</CAlert>
                                <CInputGroup size="sm" class="mb-3">
                                    <CInputGroupText class="headercolor" as="label">Cargo </CInputGroupText>
                                    <CFormInput list="lista-cargos" v-model="datos.cargoNombre" type="text"
                                        placeholder="Cargo del Usuario" required />
                                    <CInputGroupText class="headercolor">
                                        <CFormCheck type="checkbox" v-model="datos.tipo" /><span class="me-2"></span>
                                        Jefe
                                    </CInputGroupText>
                                    <datalist id="lista-cargos">
                                        <option v-for="(item, index) in empleado?.cargo" :key="index"
                                            :value="item.nombre">
                                            {{ item.nombre }}
                                        </option>
                                    </datalist>
                                </CInputGroup>

                                <CInputGroup size="sm" class="mb-3">
                                    <CInputGroupText class="headercolor" as="label">Jefe </CInputGroupText>
                                    <CFormSelect v-model="datos.idpJefe" required>
                                        <option>Seleccionar</option>
                                        <option v-for="(item, index) in empleado?.jefe" :key="index" :value="item.idp">
                                            {{ item.nombre }} {{ item.paterno }} {{ item.materno }}
                                        </option>
                                    </CFormSelect>
                                </CInputGroup>

                                <hr>

                                <CInputGroup size="sm" class="mb-3">
                                    <CInputGroupText class="headercolor" as="label">Area </CInputGroupText>
                                    <CFormInput list="lista-areas" v-model="datos.nombreArea" type="text"
                                        placeholder="Area de Trabajo" required />
                                    <datalist id="lista-areas">
                                        <option v-for="(item, index) in empleado?.area" :key="index"
                                            :value="item.nombre">
                                            {{ item.nombre }}
                                        </option>
                                    </datalist>
                                </CInputGroup>

                                <CInputGroup size="sm" class="mb-3">
                                    <CInputGroupText class="headercolor" as="label">Sucursal </CInputGroupText>
                                    <CFormInput style="flex: 8 0 0%" list="lista-sucursales" type="text"
                                        placeholder="Sucursal de trabajo" v-model="datos.nombreSucursal" required />

                                    <CInputGroupText class="headercolor" as="label">CC </CInputGroupText>
                                    <CFormInput style="flex: 2 0 0%" type="text" v-model="datos.codigoSucursal"
                                        placeholder="Codigo de la Sucursal" :valid="valido" required />

                                    <datalist id="lista-sucursales">
                                        <option v-for="(item, index) in empleado?.sucursal" :key="index"
                                            :value="item.nombre">
                                            {{ item.nombre }}
                                        </option>
                                    </datalist>
                                </CInputGroup>

                                <CInputGroup size="sm" class="mb-3">
                                    <CInputGroupText class="headercolor" as="label">Centro de Costos
                                    </CInputGroupText>
                                    <CFormInput style="flex: 8 0 0%" v-model="datos.nombreCentroCostos"
                                        list="lista-centros" type="text" placeholder="Centro de Costos del Usuario"
                                        required />

                                    <CInputGroupText class="headercolor" as="label">CC </CInputGroupText>
                                    <CFormInput style="flex: 2 0 0%" type="text" v-model="datos.codigoCentroCostos"
                                        placeholder="Codigo de la Sucursal" :valid="valido" required />

                                    <datalist id="lista-centros">
                                        <option v-for="(item, index) in listaCentroCostos" :key="index"
                                            :value="item.nombre">
                                            {{ item.nombre }}
                                        </option>
                                    </datalist>
                                </CInputGroup>
                            </CCol>
                        </CRow>

                    </CCardBody>
                    <CCardFooter class="text-end">
                        <CRow>
                            <CCol :xs="0" :sm="4" :md="4" :lg="4" class="d-grid gap-2"></CCol>
                            <CCol :xs="6" :sm="4" :md="4" :lg="4" class="d-grid gap-2">
                                <CButton color="danger" size="sm" class="font">
                                    <CIcon icon="cil-x" class="me-2" />
                                    Cancelar
                                </CButton>

                            </CCol>
                            <CCol :xs="6" :sm="4" :md="4" :lg="4" class="d-grid gap-2">
                                <CButton v-if="!datosValidos" class="font" color="warning" size="sm"
                                    @click="revisarDatos" :disabled="!valido">
                                    <CIcon icon="cil-description" class="me-2" />
                                    Verificar Datos
                                </CButton>

                                <CButton v-if="datosValidos" type="submit" class="font" color="success" size="sm">
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
import { CCol, CContainer } from '@coreui/vue';
import { ref, reactive, onMounted, watch } from 'vue'

import { useUsuario } from '@/composables/useUsuario';
const { addDatosUse, getDatosEmpleadosUse, getUsuarioValidoUse } = useUsuario()

import { useFunction } from '@/composables/useFunction';
const { getPrefijo, esDigito } = useFunction()

import { useAlert } from '@/composables/useAlert'

const { confirm, error, success } = useAlert()

import { useRouter } from 'vue-router'
const router = useRouter()

const listaCentroCostos = ref([])
const valido = ref(false)
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
    numero: '',
    tipoCuenta: '',
    bancoNombre: '',
    codigoSucursal: '',
    nombreSucursal: '',
    codigoCentroCostos: '',
    nombreCentroCostos: '',
    nombreArea: '',
    idpJefe: '',
    jefe: '',
    estado: true,
    tipo: false
})

const empleado = ref(null)

const getDatosEmpleados = async () => {
    try {
        empleado.value = await getDatosEmpleadosUse()
    } catch (errr) {
        console.log(errr)
    }
}
const getCodigoSucursal = () => {
    datos.codigoSucursal = ''
    datos.codigoCentroCostos = ''
    datos.nombreCentroCostos = ''
    listaCentroCostos.value = []
    const prefijo = ref(null)
    empleado.value.sucursal.forEach(element => {
        if (element.nombre === datos.nombreSucursal) {
            datos.codigoSucursal = element.codigo
            prefijo.value = element.prefijo
        }
    })
    listaCentroCostos.value = empleado.value.centrocostos.filter(item => item.prefijo === prefijo.value)
}

const getCodigoCentroCostos = () => {
    datos.codigoCentroCostos = ''
    empleado.value.centrocostos.forEach(element => {
        if (element.nombre === datos.nombreCentroCostos) {
            datos.codigoCentroCostos = element.codigo
        }
    })
}

const verificarCodigos = () => {
    valido.value = getPrefijo(datos.codigoSucursal, datos.codigoCentroCostos)
    datosValidos.value = false
}

const revisarDatos = async () => {
    cuentaValida.value = esDigito(datos.numero)
    let mscuenta = "El numero de cuenta no es valido"
    let validos = false
    try {
        validos = await getUsuarioValidoUse(datos.idp, datos.email)
    } catch (errr) {
        console.log(errr)
    }
    if (cuentaValida.value && validos.estado) {
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
        await error('Datos no Validos!!!', validos.usuario + ' ' + validos.password + ' ' + mscuenta, '')
    }
}

const createUsuario = async () => {
    const resultAlert = await confirm('Registro de Usuario', 'Desea registrar al Usuario ??', '')
    if (resultAlert.isConfirmed) {
        try {
            const resultService = await addDatosUse(datos)
            if (resultService.status == 201) {
                await success('Registro Completo', 'Usuario registrado Corectamente')
                router.push({ name: 'Lista de Usuarios' })
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
    () => datos.nombreSucursal,
    (nuevo, anterior) => {
        if (nuevo !== anterior) {
            getCodigoSucursal()
        }
    }
)
watch(
    () => datos.nombreCentroCostos,
    (nuevo, anterior) => {
        if (nuevo !== anterior) {
            getCodigoCentroCostos()
        }
    }
)
watch(
    () => datos.codigoCentroCostos,
    (nuevo, anterior) => {
        if (nuevo !== anterior) {
            verificarCodigos()
        }
    }
)
watch(
    () => datos.codigoSucursal,
    (nuevo, anterior) => {
        if (nuevo !== anterior) {
            verificarCodigos()
        }
    }
)
watch(
    () => datos.idp,
    (nuevo, anterior) => {
        if (nuevo !== anterior) {
            datosValidos.value = false
        }
    }
)
watch(
    () => datos.email,
    (nuevo, anterior) => {
        if (nuevo !== anterior) {
            datosValidos.value = false
        }
    }
)
watch(
    () => datos.numero,
    (nuevo, anterior) => {
        if (nuevo !== anterior) {
            datosValidos.value = false
        }
    }
)
onMounted(async () => {
    const tooltips = document.querySelectorAll('.tooltip');
    tooltips.forEach(tooltip => tooltip.remove());
    getDatosEmpleados()
})
</script>