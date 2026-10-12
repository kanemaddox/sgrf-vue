<template>

    <CRow>
        <CCol :xs="12" :sm="8" :md="8" :lg="8">
            <CAlert :color="!datos.isEdit ? 'success' : 'warning'">III. <span v-if="datos.isEdit">(EDITAR)
                </span> {{ valores.seccionTres }}</CAlert>
        </CCol>
        <CCol :xs="12" :sm="4" :md="4" :lg="4" class="text-end">
            <CRow>
                <CButtonGroup role="group" size="sm">
                    <CButton v-if="datos.isEdit" class="font" color="primary" @click="getFile">
                        <i class="bi bi-file-earmark-text me-2"></i> Subir Documento
                    </CButton>
                </CButtonGroup>
            </CRow>

        </CCol>
    </CRow>
    <br>
    <CRow class="table-responsive">
        <CTable small hover responsive>
            <CTableHead color="dark">
                <CTableRow>
                    <CTableHeaderCell scope="col">#</CTableHeaderCell>
                    <CTableHeaderCell scope="col">Doc.</CTableHeaderCell>
                    <CTableHeaderCell scope="col">Datos</CTableHeaderCell>
                    <CTableHeaderCell scope="col" :style="{ minWidth: '200px' }">Detalle</CTableHeaderCell>
                    <CTableHeaderCell scope="col">Importe</CTableHeaderCell>
                    <CTableHeaderCell scope="col" v-for="columna in datos.aprobadores" :key="columna.clave">
                    </CTableHeaderCell>
                    <CTableHeaderCell scope="col" v-if="datos.isEdit">Acciones</CTableHeaderCell>
                </CTableRow>
            </CTableHead>
            <CTableBody>
                <CTableRow v-for="(value, index) in facturasFiltradas" :key="value.idDetalle">
                    <CTableHeaderCell scope="row">{{ index + 1 }}</CTableHeaderCell>
                    <CTableDataCell>
                        <img :src="getImg(value.archivo, '/sn100.png', img100)" class="img-fluid " alt="..."
                            @click="getModal('view', value.idDetalle)">
                    </CTableDataCell>
                    <CTableDataCell>
                        <div class="small text-body-secondary text-nowrap">
                            <span><strong>Fecha : </strong>{{ fecha(value.fecha) }}</span><br>
                            <span><strong>Tipo Gasto : </strong>{{ value.cuenta.tipo }}</span> <br>
                            <span><strong>Tipo Doc. : </strong>{{ value.documento }}</span><br>
                            <span><strong>Numero : </strong>{{ value.numero }}</span>
                        </div>
                    </CTableDataCell>

                    <CTableDataCell>{{ value.detalle }}</CTableDataCell>
                    <CTableDataCell><span class="text-nowrap">{{ formatearNumero(value.importe) }} {{ datos.moneda
                            }}</span></CTableDataCell>

                    <CTableDataCell v-for="columna in value.aprobado.estado" :key="columna.clave">
                        <i :class="columna === true ? 'bi bi-check2-square text-success' : 'bi bi-x text-danger'"></i>
                    </CTableDataCell>
                    <!--Acciones de Documentos-->
                    <CTableDataCell v-if="datos.isEdit">
                        <CButtonGroup v-if="fileEdit(value.aprobado.estado)" role=" group" size="sm">
                            <CButton color="secondary" variant="outline" @click="getModal('editar', value.idDetalle)">
                                <i class="bi bi-pencil-square"></i>
                            </CButton>

                            <CButton color="secondary" variant="outline" @click="getReplace(value.idDetalle)">
                                <i class="bi bi-folder-x"></i>
                            </CButton>

                            <CButton color="danger" class="font" @click="eliminarFile(value.idDetalle)">
                                <i class="bi bi-trash3"></i>
                            </CButton>
                        </CButtonGroup>
                    </CTableDataCell>
                    <!--End Acciones de Documentos-->
                </CTableRow>

                <CTableRow active>
                    <CTableHeaderCell scope="row" colspan="3" active>TOTAL GASTOS
                        REALIZADOS
                    </CTableHeaderCell>
                    <CTableDataCell colspan="2" class="text-end">
                        <label class="total ">{{ formatearNumero(datos.gasto) }} {{ datos.moneda }} </label>
                    </CTableDataCell>
                    <CTableDataCell></CTableDataCell>
                </CTableRow>

                <CTableRow active>
                    <CTableHeaderCell scope="row" colspan="3" active>SALDO
                    </CTableHeaderCell>
                    <CTableDataCell colspan="2" class="text-end">
                        <label class="total">{{ formatearNumero(datos.saldo) }} {{ datos.moneda }}</label>
                    </CTableDataCell>
                    <CTableDataCell></CTableDataCell>
                </CTableRow>

            </CTableBody>
        </CTable>
    </CRow>
    <CRow>
        <CAlert v-if="datos.rembolso > 0" class="text-end">
            Fondos por reembolsar
            <CChip variant="outline" color="success">
                <label class="total">{{ formatearNumero(datos.rembolso) }}</label> {{ datos.moneda }}
            </CChip>
        </CAlert>

    </CRow>
    <CRow v-if="datos.devolver > 0">
        <div class="text-end">
            Fondos por devolver a la oficina
            <CChip variant="outline" color="danger">
                <label class="total">{{ formatearNumero(datos.devolver) }}</label> {{ datos.moneda }}
            </CChip>
        </div>
    </CRow>

    <!-- Modal  Ver, Editar o Agregar -->
    <CModal :visible="modalDocumento" :size="preview" backdrop="static" @close="clickModalDocumento(false)">
        <CForm @submit.prevent="guardarDocumento">
            <!-- Header -->
            <CModalHeader class="headercolor" dismiss @close="clickModalDocumento(false)">
                <CModalTitle>
                    <h6>
                        <CIcon :icon="icono" size="lg" class="me-2" />{{ titulo }}
                    </h6>
                </CModalTitle>
            </CModalHeader>
            <!-- Body -->
            <CModalBody>
                <CRow>
                    <!-- Previsualización de Imagen / PDF -->
                    <CCol v-if="preview === 'lg'" :xs="12" :sm="7" :md="7" :lg="7">
                        <ComponenteImagen :imagen="rdgPdf" />
                    </CCol>

                    <!-- Campos del Formulario -->
                    <CCol :xs="12" :sm="preview === 'lg' ? 5 : 12" :md="preview === 'lg' ? 5 : 12"
                        :lg="preview === 'lg' ? 5 : 12">
                        <br>
                        <!-- Fecha -->
                        <CInputGroup size="sm" class="mb-3">
                            <CInputGroupText as="label" class="headercolor">
                                <i class="bi bi-calendar3-week me-2"></i>Fecha : 
                            </CInputGroupText>
                            <CFormInput type="date" v-model="gasto.fecha" :min="hoy" :max="maximo"
                                @change="validarFecha" @keydown="bloquearTeclado" :disabled="modo === 'ver'" required />
                        </CInputGroup>

                        <!-- Tipo de Gasto (En modo 'ver' es Input bloqueado; en 'editar'/'agregar' es Select) -->
                        <CInputGroup size="sm" class="mb-3">
                            <CInputGroupText as="label" class="headercolor">
                                <i class="bi bi-wallet2 me-2"></i>Tipo de Gasto : 
                            </CInputGroupText>
                            <CFormInput v-if="modo === 'ver'" type="text" v-model="gasto.tipo" disabled />
                            <CFormSelect v-else v-model="gasto.tipo" required>
                                <option v-if="modo === 'editar'">{{ gasto.tipo }}</option>
                                <option v-else>Seleccionar</option>
                                <option v-for="value in datos.listaCuenta" :key="value.id" :value="value.id">
                                    {{ value.tipo }}
                                </option>
                            </CFormSelect>
                        </CInputGroup>

                        <!-- Tipo de Documento -->
                        <CInputGroup size="sm" class="mb-3">
                            <CInputGroupText as="label" class="headercolor">
                                <i class="bi bi-file-earmark-text me-2"></i>Tipo de Documento : 
                            </CInputGroupText>
                            <CFormInput v-if="modo === 'ver'" type="text" v-model="gasto.documento" disabled />
                            <CFormSelect v-else v-model="gasto.documento" required>
                                <option value="">Seleccionar Documento</option>
                                <option value="FACTURA">Factura</option>
                                <option value="BOLETA">Boleta</option>
                                <option value="OD">Otros Documentos</option>
                                <option value="SD">Sin Documento</option>
                            </CFormSelect>
                        </CInputGroup>

                        <!-- Número de Documento -->
                        <CInputGroup size="sm" class="mb-3" v-if="gasto.documento !== 'SD'">
                            <CInputGroupText as="label" class="headercolor">
                                <i class="bi bi-clipboard-minus me-2"></i>No. {{ gasto.documento || '' }} :
                            </CInputGroupText>
                            <CFormInput type="text" v-model="gasto.numero"
                                :required="modo !== 'ver' && gasto.documento !== 'SD'"
                                :disabled="modo === 'ver' || gasto.documento === 'SD'" />
                        </CInputGroup>

                        <!-- Detalle -->
                        <CFormTextarea label="Detalle : " v-model="gasto.detalle" rows="2" maxlength="150"
                            :disabled="modo === 'ver'" required>
                        </CFormTextarea>
                        <hr>
                        <!-- Importe y Moneda -->
                        <input type="hidden" v-maska="maskOptions" v-model="gasto.importe">
                        <CInputGroup size="sm" class="mb-3">
                            <CInputGroupText as="label" class="headercolor">
                                <i class="bi bi-cash-coin me-2"></i>Importe : 
                            </CInputGroupText>
                            <CFormInput type="text" v-model="gasto.importe" required :disabled="modo === 'ver'" />
                            <CFormSelect v-model="datos.moneda" disabled required>
                                <option value="">Moneda</option>
                                <option value="USD">Dollar</option>
                                <option value="PESOS">Pesos</option>
                                <option value="EUR">Euros</option>
                            </CFormSelect>
                        </CInputGroup>
                    </CCol>
                </CRow>
            </CModalBody>
            <!-- Footer -->
            <CModalFooter>
                <CButton @click="clickModalDocumento(false)" color="danger" class="font" size="sm">
                    <CIcon icon="cil-x" class="me-2" />Cancelar
                </CButton>
                <CButton v-if="modo !== 'ver'" type="submit" class="font" :color="colorboton" size="sm">
                    <CIcon :icon="icono" class="me-2" />
                    <span>{{ boton }}</span>
                </CButton>
            </CModalFooter>
        </CForm>
    </CModal>

    <!-- Modal  Subir File-->
    <CModal backdrop="static" :visible="modalFile" @close="clickModalFile(false)">
        <CForm @submit.prevent="uploadDocument" enctype="multipart/form-data">
            <CModalHeader class="headercolor" dismiss @close="clickModalFile(false)">
                <CModalTitle>
                    <h6>
                        <CIcon :icon="icono" size="lg" class="me-2" />{{ titulo }}
                    </h6>
                </CModalTitle>
            </CModalHeader>

            <CModalBody>
                <!-- INPUT -->
                <CInputGroup class="mb-3">
                    <CInputGroupText as="label" class="headercolor" for="filedoc">Documento : </CInputGroupText>
                    <CFormInput type="file" ref="fileInput" id="filedoc" accept="image/png, image/jpeg, application/pdf"
                        @change="selectFile" :valid="fileValid" :disabled="uploading" required />
                    <CInputGroupText v-if="fileValid">
                        <CIcon icon="cil-check-alt" class="text-success" />
                    </CInputGroupText>
                </CInputGroup>

                <!-- PREVIEW -->
                <div class="md-3 text-center" v-if="rdgPdf">
                    <img v-if="!pdf" :src="rdgPdf" class="img-fluid rounded shadow-sm" />
                    <VuePdfEmbed v-if="pdf" :source="rdgPdf" :scale="escala" />
                </div>
                <!-- PROGRESS -->
                <CProgress v-if="uploading" :height="50" class="mb-3">
                    <CProgressBar :value="uploadProgress" :color="uploadProgress === 100 ? 'success' : 'warning'"
                        animated>
                        {{ uploadProgress < 100 ? `Subiendo... ${uploadProgress}%` : 'Procesando imagen...' }}
                            </CProgressBar>
                </CProgress>
                <!-- ERROR -->
                <div v-if="errorMsg" class="alert alert-danger text-center">
                    {{ errorMsg }}
                </div>
            </CModalBody>

            <CModalFooter>
                <CButton @click="clickModalFile(false)" color="danger" class="font" size="sm" :disabled="uploading">
                    <CIcon icon="cil-x" class="me-2" />Cancelar
                </CButton>

                <CButton type="submit" class="font" :color="colorboton" size="sm" :disabled="!fileValid || uploading">
                    <CIcon :icon="icono" class="me-2" />
                    <span v-if="uploading">Subiendo...</span>
                    <span v-else>{{ boton }}</span>
                </CButton>
            </CModalFooter>
        </CForm>
    </CModal>
    <!-- End Modal  Subir-->

</template>

<script setup>
const props = defineProps({
    datos: {
        type: Object,
        required: true
    },
    valores: {
        type: Object,
        required: true
    }
})

import 'bootstrap-icons/font/bootstrap-icons.css'
import { vMaska } from "maska/vue"
import { ref, reactive, watch, computed } from 'vue'
import VuePdfEmbed from 'vue-pdf-embed'

import ComponenteImagen from '@/components/imagen/ComponenteImagen.vue'
import { useFunction } from '@/composables/useFunction'
const { formatearNumero, getImg, fecha } = useFunction()

import { useAlert } from '@/composables/useAlert'
const { info, confirm, preguntar, error } = useAlert()

import { uploadFile } from '@/services/uploadService'

import { API_FILE_IMG100, API_FILE_IMG800 } from "@/env"
const img100 = API_FILE_IMG100
const img800 = API_FILE_IMG800

const guardar = ref(false)
const escala = ref(1.0)
const rdgPdf = ref('')
const preview = ref(null)
const modalDocumento = ref(false)
const fileValid = ref(false)
const modo = ref('agregar')
const titulo = ref('')
const icono = ref('')
const boton = ref('')
const colorboton = ref('')
const archivo = ref(null)
const uploadProgress = ref(0)
const uploading = ref(false)
const errorMsg = ref(null)
const pdf = ref(false)
const nombreDocumento = ref('')

const fechaDel = ref(null)
const fechaAl = ref(null)
const hoy = ref(null)
const maximo = ref(null)
const fechaSeleccionada = ref('')
const modalFile = ref(false)

const gasto = reactive({
    id: '',
    fecha: '',
    tipo: '',
    idCuenta: 0,
    documento: 'Documento',
    numero: '',
    detalle: '',
    importe: '',
    moneda: '',
    archivo: '',
    agregado: '',
    estado: '',
    aprobado: null
})

const clickModalDocumento = (value) => {
    modalDocumento.value = value
}

const clickModalFile = (value) => {
    modalFile.value = value
}

const getModal = async (value, idFactura) => {
    if (Number(props.datos.devolver) > 0 && value === 'editar') {
        await info('Fondos por devolver a la oficina', 'Debes de Eliminar Tu Comprobante Antes de Realizar cualquier Cambio', '')
    }
    else {
        preview.value = 'xl'
        if (value === 'editar') {
            getAction('editar', 'Editar Documento', 'cil-save', 'Guardar Cambios', 'primary')
        } else {
            getAction('ver', 'Documento', 'cil-description', 'Aceptar', 'success')
        }
        const gastoEncontrado = props.datos.factura.find(el => Number(el.idDetalle) === Number(idFactura))
        getGasto(gastoEncontrado)
        if (gastoEncontrado.archivo !== 'ninguno') {
            rdgPdf.value = getImg(gastoEncontrado.archivo, '/sn100.png', img800)            
            preview.value = 'lg'
        }
        clickModalDocumento(true)
    }
}

const fileEdit = (value) => {
    return !value.some(elemento => elemento === true)
}

const validarFecha = (e) => {
    const valor = e.target.value
    if (valor && valor < hoy) {
        fechaSeleccionada.value = hoy
    }
}

const bloquearTeclado = (e) => {
    e.preventDefault()
}

const maskOptions = reactive({
    mask: "0.99",
    tokens: {
        "0": { pattern: /\d/, multiple: true },
        "9": { pattern: /\d/, optional: true }
    }
})

const guardarDocumento = () => {
    if (modo.value === 'agregar') {
        agregarDocumento()
    } else if (modo.value === 'editar') {
        actualizarFacturas()
    }
}

const actualizarFacturas = () => {
    clickModalDocumento(false)
    guardar.value = true
    props.datos.gasto = 0
    let cuentaEncontrada = null
    if (!isNaN(gasto.tipo) && gasto.tipo.trim() !== '') {
        cuentaEncontrada = props.datos.listaCuenta.find(el => Number(el.id) === Number(gasto.tipo))
    } else {
        cuentaEncontrada = props.datos.listaCuenta.find(el => el.tipo === gasto.tipo)
    }

    props.datos.factura.forEach(element => {
        if (element.idDetalle === gasto.id && element.agregado === "SI") {
            element.fecha = gasto.fecha
            element.cuenta.idCuenta = cuentaEncontrada.id
            element.cuenta.tipo = cuentaEncontrada.tipo
            element.idCuenta = cuentaEncontrada.id
            element.documento = gasto.documento
            element.numero = gasto.numero
            element.detalle = gasto.detalle
            element.importe = gasto.importe
            element.moneda = gasto.moneda
            element.archivo = gasto.archivo
        }
        props.datos.gasto = Number(props.datos.gasto) + Number(element.importe)
    })
    getSaldo()
}

const selectFile = (e) => {
    pdf.value = false
    const file = e.target.files[0]
    if (!file) return
    if (file && file.type === 'application/pdf') {
        pdf.value = true
    }
    archivo.value = file
    fileValid.value = true
    rdgPdf.value = URL.createObjectURL(file)
}

const uploadDocument = () => {
    if (!archivo.value) return

    uploading.value = true
    uploadProgress.value = 0
    errorMsg.value = null

    uploadFile({
        file: archivo.value,

        onProgress: (progress) => {
            uploadProgress.value = progress
        },

        onSuccess: async (data) => {
            clickModalFile(false)
            rdgPdf.value = img800 + data + '.jpg'
            nombreDocumento.value = data
            pdf.value = false
            if (modo.value === 'editar') {
                gasto.archivo = nombreDocumento.value
                getAction('editar', 'Editar Documento', 'cil-save', 'Guardar Cambios', 'primary')
            } else {
                getAction('agregar', 'Agregar Documento', 'cil-description', 'Aceptar', 'success')
            }

            clickModalDocumento(true)
        },
        onError: async (err) => {
            errorMsg.value = 'Error al subir archivo' + err
            await error(errorMsg.value)
        }
    })
        .finally(() => {
            uploading.value = false
        })
}

const getFile = async () => {
    if (Number(props.datos.devolver) > 0) {
        await info('Fondos por devolver a la oficina', 'Debes de Eliminar Tu Comprobante Antes de Realizar cualquier Cambio', '')
    }
    else {
        rdgPdf.value = '/sn100.png'
        fileValid.value = false
        preview.value = null
        Object.assign(gasto, { id: 0, fecha: '', tipo: '', documento: '', numero: '', detalle: '', importe: '', moneda: '', nombreTipo: '', image: '' })
        getAction('agregar', 'Agregar Documento', 'cil-cloud-upload', 'Subir', 'success')
        getCalendar()
        const resultAlert = await preguntar('Tiene un Documento?', 'Si Tiene un Documento Puede Subirlo', '')
        if (resultAlert.isConfirmed) {
            titulo.value = 'Subir Documento'
            preview.value = 'lg'
            clickModalFile(true)
        } else if (resultAlert.isDenied) {
            nombreDocumento.value = "no"
            titulo.value = 'Registrar Documento'
            clickModalDocumento(true)
        }
    }
}

const eliminarFile = async (value) => {
    if (Number(props.datos.devolver) > 0) {
        await info('Fondos por devolver a la oficina', 'Debes de Eliminar Tu Comprobante Antes de Realizar cualquier Cambio', '')
    }
    else {
        const resultAlert = await confirm('Eliminar Documento', 'Desea Eliminar Documento de la Lista ??', '')
        if (resultAlert.isConfirmed) {
            props.datos.factura.forEach(element => {
                if (Number(element.idDetalle) === Number(value)) {
                    element.agregado = "NO"
                    props.datos.gasto = Number(Number(props.datos.gasto) - Number(element.importe)).toFixed(2)
                    getSaldo()
                }
            })
        }
    }
}

const agregarDocumento = () => {
    clickModalDocumento(false)
    if (nombreDocumento.value === "no") {
        nombreDocumento.value = 'ninguno'
    } 
    gasto.image = getImg(nombreDocumento.value, '/sn100.png', img100)
    const cuentaEncontrada = props.datos.listaCuenta.find(el => Number(el.id) === Number(gasto.tipo))
    props.datos.gasto = Number(Number(props.datos.gasto) + Number(gasto.importe)).toFixed(2)
    getSaldo()
    const nuevoId = Date.now()
    let estados = props.datos.factura[0].aprobado.estado.length
    const documento = {
        agregado: 'SI',
        aprobado: { estado: Array.from({ length: estados }, () => false) },
        archivo: nombreDocumento.value,
        cuenta: { idCuenta: cuentaEncontrada.id, tipo: cuentaEncontrada.tipo },
        detalle: gasto.detalle,
        documento: gasto.documento,
        estado: 'PENDIENTE',
        fecha: gasto.fecha,
        id: nuevoId,
        idDetalle: nuevoId,
        idCuenta: cuentaEncontrada.id,
        importe: gasto.importe,
        moneda: props.datos.moneda,
        numero: gasto.numero,
        token: 'NUEVO'
    }
    props.datos.factura.push(documento)
}

const getCalendar = () => {
    fechaDel.value = new Date(props.datos.del)
    fechaAl.value = new Date(props.datos.al)
    fechaDel.value.setDate(fechaDel.value.getDate())
    fechaAl.value.setDate(fechaAl.value.getDate())
    hoy.value = fechaDel.value.toISOString().split('T')[0]
    maximo.value = fechaAl.value.toISOString().split('T')[0]
}

const getSaldo = () => {
    props.datos.saldo = Number(Number(props.datos.importe) - Number(props.datos.gasto)).toFixed(2)

    if (Number(props.datos.saldo) > 0) {
        props.datos.devolver = Number(props.datos.saldo).toFixed(2)
        props.datos.rembolso = 0
    } else {
        props.datos.rembolso = Number(props.datos.saldo).toFixed(2) * -1
        props.datos.devolver = 0
    }
}

const facturasFiltradas = computed(() => {
    return props.datos.factura.filter(value => value.agregado !== 'NO')
})

const getGasto = (gastoEncontrado) => {
    gasto.id = gastoEncontrado.idDetalle
    gasto.fecha = fecha(gastoEncontrado.fecha)
    gasto.idCuenta = gastoEncontrado.cuenta.idCuenta
    gasto.tipo = gastoEncontrado.cuenta.tipo
    gasto.documento = gastoEncontrado.documento
    gasto.numero = gastoEncontrado.numero
    gasto.detalle = gastoEncontrado.detalle
    gasto.importe = gastoEncontrado.importe
    gasto.moneda = gastoEncontrado.moneda
    gasto.aprobado = gastoEncontrado.aprobado
    gasto.estado = gastoEncontrado.estado
    gasto.agregado = gastoEncontrado.agregado
    gasto.archivo = gastoEncontrado.archivo
}

const getAction = (isEdit, title, icon, buton, color) => {
    modo.value = isEdit
    titulo.value = title
    icono.value = icon
    boton.value = buton
    colorboton.value = color
}

const getReplace = async (value) => {
    if (Number(props.datos.devolver) > 0) {
        await info('Fondos por devolver a la oficina', 'Debes de Eliminar Tu Comprobante Antes de Realizar cualquier Cambio', '')
    }
    else {
        const gastoEncontrado = props.datos.factura.find(el => Number(el.idDetalle) === Number(value))
        getGasto(gastoEncontrado)
        getAction('editar', 'Remplazar Documento', 'cil-save', 'Guardar Cambios', 'primary')
        preview.value = 'lg'
        rdgPdf.value = getImg(gastoEncontrado.archivo, '/sn100.png', img800)
        clickModalFile(true)
    }
}

watch(
    () => gasto.documento,
    (nuevoDocumento) => {
        if (nuevoDocumento === 'SD') {
            gasto.numero = 0
        } else if (gasto.numero === 0) {
            gasto.numero = ''
        }
    }
)

</script>