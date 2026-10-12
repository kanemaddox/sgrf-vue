<template>
    <CRow>
        <CCol :xs="12" :sm="8" :md="8" :lg="8">
            <CAlert color="success">III. {{ valores.seccionTres }}</CAlert>
        </CCol>
        <CCol :xs="12" :sm="4" :md="4" :lg="4" class="gap-2 text-end">
            <CButton v-if="!comprobante" color="primary" size="sm" @click="getFile">
                <i class="bi bi-file-earmark-text me-2"></i> Subir Documento
            </CButton>
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
                    <CTableHeaderCell scope="col">Acciones</CTableHeaderCell>
                </CTableRow>
            </CTableHead>
            <CTableBody>
                <CTableRow v-for="(value, index) in facturasFiltradas" :key="value.idDetalle">
                    <CTableHeaderCell scope="row">{{ index + 1 }}</CTableHeaderCell>
                    <CTableDataCell>
                        <img :src="getImg(value.archivo,'/sn100.png',img100)" class="img-fluid " alt="...">
                    </CTableDataCell>
                    <CTableDataCell>
                        <div class="small text-body-secondary text-nowrap">
                            <span><strong>Fecha : </strong>{{ value.fecha }}</span><br>
                            <span><strong>Tipo Gasto : </strong>{{ getGasto(value.nombre, value.cuenta) }}</span> <br>
                            <span><strong>Tipo Doc. : </strong>{{ value.documento }}</span><br>
                            <span><strong>Numero : </strong>{{ value.numero }}</span>
                        </div>
                    </CTableDataCell>

                    <CTableDataCell>{{ value.detalle }}</CTableDataCell>
                    <CTableDataCell class="text-end">
                        <div class="text-body-secondary text-nowrap">
                            {{ formatearNumero(value.importe) }} {{ datos.moneda }}
                        </div>
                    </CTableDataCell>
                    <CTableDataCell v-if="!comprobante">
                        <CButtonGroup role="group" size="sm">
                            <CButton color="secondary" variant="outline" @click="getEditar(value.idDetalle)"
                                v-c-tooltip="{ content: 'Editar Documento', placement: 'top' }">
                                <i class="bi bi-pencil-square"></i>
                            </CButton>

                            <CButton color="secondary" variant="outline" @click="getReplace(value.idDetalle)"
                                v-c-tooltip="{ content: 'Cambiar Documento', placement: 'top' }">
                                <i class="bi bi-folder-x"></i>
                            </CButton>

                            <CButton color="danger" class="font" @click="eliminarFile(value.idDetalle)"
                                v-c-tooltip="{ content: 'Eliminar Documento', placement: 'top' }">
                                <i class="bi bi-trash3"></i>
                            </CButton>
                        </CButtonGroup>
                    </CTableDataCell>
                </CTableRow>

                <CTableRow>
                    <CTableHeaderCell scope="row" colspan="4">TOTAL GASTOS REALIZADOS</CTableHeaderCell>
                    <CTableDataCell>
                        <div class="text-body-secondary text-nowrap">
                            <label class="total">{{ formatearNumero(datos.gasto) }}</label>{{ datos.moneda }}
                        </div>
                    </CTableDataCell>
                    <CTableDataCell></CTableDataCell>
                </CTableRow>

                <CTableRow>
                    <CTableHeaderCell scope="row" colspan="4">TOTAL FONDOS RECIBIDOS</CTableHeaderCell>
                    <CTableDataCell>
                        <div class="text-body-secondary text-nowrap">
                            <label class="total">{{ formatearNumero(datos.importe) }} </label>{{ datos.moneda }}
                        </div>
                    </CTableDataCell>
                    <CTableDataCell></CTableDataCell>
                </CTableRow>
                <CTableRow>
                    <CTableHeaderCell scope="row" colspan="4">SALDO</CTableHeaderCell>
                    <CTableDataCell>
                        <div class="text-body-secondary text-nowrap">
                            <label class="total">{{ formatearNumero(datos.saldo) }}</label> {{datos.moneda }}
                        </div>
                    </CTableDataCell>
                    <CTableDataCell></CTableDataCell>
                </CTableRow>
            </CTableBody>
        </CTable>
    </CRow>
    <CRow v-if="datos.rembolso > 0">
        <CAlert class="text-end">
            Fondos por reembolsar <CChip variant="outline" color="success"><label class="total">{{
                formatearNumero(datos.rembolso) }}</label> {{ datos.moneda }}</CChip>
        </CAlert>
    </CRow>
    <CRow v-if="datos.devolver > 0">
        <CCol :xs="12" :sm="8" :md="8" :lg="8">
            <div class="text-end">
                Fondos por devolver a la oficina
                <CChip variant="outline" color="danger">
                    <label class="total">{{ formatearNumero(datos.devolver) }}</label> {{ datos.moneda }}
                </CChip>
            </div>
        </CCol>
        <CCol :xs="12" :sm="4" :md="4" :lg="4">
            <CButton v-if="!comprobante" color="danger" class="font custom-hover-btn" size="sm" @click="getComprobante">
                <i class="bi bi-cloud-plus me-2"></i> Agregar Comprobante
            </CButton>
        </CCol>
        <CCol :xs="12" :sm="12" :md="12" :lg="12">
            <br>
            <CTable small hover responsive>
                <CTableHead color="dark">
                    <CTableRow>
                        <CTableHeaderCell scope="col">#</CTableHeaderCell>
                        <CTableHeaderCell scope="col">Doc.</CTableHeaderCell>
                        <CTableHeaderCell scope="col">Datos</CTableHeaderCell>
                        <CTableHeaderCell scope="col" :style="{ minWidth: '200px' }">Detalle</CTableHeaderCell>
                        <CTableHeaderCell scope="col">Deposito</CTableHeaderCell>
                        <CTableHeaderCell scope="col">Acciones</CTableHeaderCell>
                    </CTableRow>
                </CTableHead>
                <CTableBody>
                    <CTableRow v-for="(value, index) in depositosFiltrados" :key="value.idDeposito">
                        <CTableHeaderCell scope="row">{{ index + 1 }}</CTableHeaderCell>
                        <CTableDataCell>
                            <img :src="getImg(value.archivo,'/sn100.png',img100)" class="img-fluid " alt="...">
                        </CTableDataCell>
                        <CTableDataCell>
                            <div class="small text-body-secondary text-nowrap">
                                <span><strong>Fecha : </strong>{{ value.fecha }}</span><br>
                                <span><strong>Ref. : </strong>{{ value.nombre }}</span><br>
                                <span><strong>Tipo Doc. : </strong>{{ value.documento }}</span><br>
                                <span><strong>Numero : </strong>{{ value.numero }}</span>
                            </div>
                        </CTableDataCell>

                        <CTableDataCell>{{ value.detalle }}</CTableDataCell>
                        <CTableDataCell class="text-end">
                            <div class="text-body-secondary text-nowrap">
                                {{ formatearNumero(value.deposito) }} {{ datos.moneda }}
                            </div>
                        </CTableDataCell>
                        <CTableDataCell>
                            <CButtonGroup role="group" size="sm">
                                <CButton color="danger" class="font" @click="eliminarFile(value.idDeposito)"
                                    v-c-tooltip="{ content: 'Eliminar Documento', placement: 'top' }">
                                    <i class="bi bi-trash3"></i>
                                </CButton>
                            </CButtonGroup>
                        </CTableDataCell>
                    </CTableRow>
                </CTableBody>
            </CTable>
        </CCol>
    </CRow>

    <!-- Modal  Documento-->
    <CModal :visible="modalDocumento" :size="preview" backdrop="static" @close="clickModalDocumento(false)">
        <CForm @submit.prevent="formDocumento">
            <CModalHeader class="headercolor" dismiss @close="clickModalDocumento(false)">
                <CModalTitle>
                    <h6>
                        <CIcon :icon="icono" size="lg" class="me-2" />{{ titulo }}
                    </h6>
                </CModalTitle>
            </CModalHeader>
            <CModalBody>
                <CRow>
                    <CCol v-if="preview === 'lg'" class="d-none d-sm-block" :sm="7" :md="7" :lg="7">
                        <ComponenteImagen :imagen="nuevafoto" />
                    </CCol>

                    <CCol :xs="12" :sm="preview === 'lg' ? 5 : 12" :md="preview === 'lg' ? 5 : 12"
                        :lg="preview === 'lg' ? 5 : 12">

                        <CInputGroup size="sm" class="mb-3">
                            <CInputGroupText as="label" class="headercolor">
                                <i class="bi bi-calendar-event me-2"></i>Fecha :
                            </CInputGroupText>
                            <CFormInput type="date" v-model="gasto.fecha" :min="hoy" :max="maximo"
                                @change="validarFecha" @keydown="bloquearTeclado" required />
                        </CInputGroup>

                        <!--Tipo de Gasto-->
                        <CInputGroup v-if="comprobante" size="sm" class="mb-3">
                            <CInputGroupText as="label" class="headercolor">
                                <i class="bi bi-wallet2 me-2"></i>Tipo de Gasto :
                            </CInputGroupText>
                            <CFormInput type="text" v-model="gasto.tipo" disabled />
                        </CInputGroup>

                        <CInputGroup v-else size="sm" class="mb-3">
                            <CInputGroupText as="label" class="headercolor">
                                <i class="bi bi-wallet2 me-2"></i>Tipo de Gasto :
                            </CInputGroupText>
                            <CFormSelect v-model="gasto.tipo" required>
                                <option>Seleccionar</option>
                                <option v-for="value in datos.listaCuentaGasto" :key="value.idCuenta"
                                    :value="value.idCuenta">
                                    {{ value.tipo }}
                                </option>
                            </CFormSelect>
                        </CInputGroup>
                        <!--Tipo de Gasto-->

                        <!--Tipo de Documento-->
                        <CInputGroup v-if="comprobante" size="sm" class="mb-3">
                            <CInputGroupText as="label" class="headercolor">
                                <i class="bi bi-file-earmark-text me-2"></i>Tipo de Documento :
                            </CInputGroupText>
                            <CFormInput type="text" v-model="gasto.documento" disabled />
                        </CInputGroup>

                        <CInputGroup v-else size="sm" class="mb-3">
                            <CInputGroupText as="label" class="headercolor">
                                <i class="bi bi-file-earmark-text me-2"></i>Tipo de Documento :
                            </CInputGroupText>
                            <CFormSelect v-model="gasto.documento" required>
                                <option value="">Documento</option>
                                <option value="FACTURA">Factura</option>
                                <option value="BOLETA">Boleta</option>
                                <option value="OD">Otro Documento</option>
                                <option value="SD">Sin Documento</option>
                            </CFormSelect>
                        </CInputGroup>
                        <!--Tipo de Documento-->

                        <CInputGroup size="sm" class="mb-3">
                            <CInputGroupText as="label" class="headercolor">
                                <i class="bi bi-clipboard-minus me-2"></i>No. {{ gasto.documento }} :
                            </CInputGroupText>
                            <CFormInput type="text" v-model="gasto.numero" :required="gasto.documento !== 'SD'"
                                :disabled="gasto.documento === 'SD'" />
                        </CInputGroup>

                        <CFormTextarea label="Detalle : " v-model="gasto.detalle" rows="2"
                            :text="getCantidadCaracteres(150, gasto.detalle.length)" maxlength="150" required>
                        </CFormTextarea>
                        <hr>

                        <!--Tipo de Importe-->
                        <input type="hidden" v-maska="maskOptions" v-model="gasto.importe">
                        <CInputGroup v-if="comprobante" size="sm" class="mb-3">
                            <CInputGroupText as="label" class="headercolor">
                                <i class="bi bi-cash-coin me-2"></i>Importe :
                            </CInputGroupText>
                            <CFormInput type="text" :value="`${gasto.importe} ${gasto.moneda}`" disabled />
                        </CInputGroup>

                        <CInputGroup v-else size="sm" class="mb-3">
                            <CInputGroupText as="label" class="headercolor">
                                <i class="bi bi-cash-coin me-2"></i>Importe :
                            </CInputGroupText>
                            <CFormInput type="text" v-model="gasto.importe" required />
                            <CFormSelect v-model="datos.moneda" disabled required>
                                <option value="">Moneda</option>
                                <option value="USD">Dollar</option>
                                <option value="PESOS">Pesos</option>
                                <option value="EUR">Euros</option>
                            </CFormSelect>
                        </CInputGroup>
                        <!--Tipo de Documento-->
                    </CCol>
                </CRow>
            </CModalBody>
            <CModalFooter>
                <CButton @click="clickModalDocumento(false)" color="danger" class="font" size="sm">
                    <CIcon icon="cil-x" class="me-2" />Cancelar
                </CButton>

                <CButton type="submit" class="font" :color="colorboton" size="sm">
                    <CIcon :icon="icono" class="me-2" />
                    <span>{{ boton }}</span>
                </CButton>
            </CModalFooter>
        </CForm>

    </CModal>
    <!-- End Modal  Documento-->

    <!-- Modal  Subir File-->
    <CModal backdrop="static" alignment="center" :visible="modalFile" @close="clickModalFile(false, accion)">
        <CForm @submit.prevent="uploadDocument" enctype="multipart/form-data">
            <CModalHeader class="headercolor" dismiss @close="clickModalFile(false, accion)">
                <CModalTitle>
                    <h6>
                        <CIcon :icon="icono" size="lg" class="me-2" />{{ titulo }}
                    </h6>
                </CModalTitle>
            </CModalHeader>

            <CModalBody>
                <!-- INPUT -->
                <CInputGroup class="mb-3">
                    <CInputGroupText as="label" class="headercolor" for="filedoc">
                        <i class="bi bi-card-image me-2"></i>Documento :
                    </CInputGroupText>
                    <CFormInput type="file" ref="fileInput" id="filedoc" accept="image/png, image/jpeg, application/pdf"
                        @change="selectFile" :valid="fileValid" :disabled="uploading" required />
                    <CInputGroupText v-if="fileValid">
                        <CIcon icon="cil-check-alt" class="text-success" />
                    </CInputGroupText>
                </CInputGroup>

                <!-- PREVIEW -->
                <div class="md-3 text-center" v-if="nuevafoto">
                    <img v-if="!pdf" :src="nuevafoto" class="img-fluid rounded shadow-sm" />
                    <VuePdfEmbed v-if="pdf" :source="nuevafoto" :scale="escala" />
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
                <CButton @click="clickModalFile(false, accion)" color="danger" class="font" size="sm"
                    :disabled="uploading">
                    <CIcon icon="cil-x" class="me-2" />Cancelar
                </CButton>

                <CButton type="submit" class="font" :color="colorboton" size="sm" :disabled="!fileValid || uploading">
                    <CIcon icon="cil-cloud-upload" class="me-2" />
                    <span v-if="uploading">Subiendo...</span>
                    <span v-else>Subir</span>
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

import { useAlert } from '@/composables/useAlert'
const { error, confirm, preguntar} = useAlert()
import { useFunction } from '@/composables/useFunction'
const { getImg,formatearNumero, getCantidadCaracteres } = useFunction()

import ComponenteImagen from '@/components/imagen/ComponenteImagen.vue'

import { API_FILE_IMG100, API_FILE_IMG800 } from "@/env"
const img100 = API_FILE_IMG100
const img800 = API_FILE_IMG800

import { uploadFile } from '@/services/uploadService'
const escala = ref(1.0)

const gasto = reactive({
    id: '',
    image: '',
    fecha: '',
    tipo: '',
    nombreTipo: '',
    documento: 'Documento',
    numero: '',
    detalle: '',
    importe: '',
    moneda: '',
    archivo: ''
})

const nuevafoto = ref('/sn100.png')

const archivo = ref(null)
const uploadProgress = ref(0)
const uploading = ref(false)
const errorMsg = ref(null)
const fileValid = ref(false)
const pdf = ref(false)
const nombreDocumento = ref('')

const preview = ref(null)
const isEditMode = ref(false)
const titulo = ref('')
const icono = ref('')
const boton = ref('')
const colorboton = ref('')
const comprobante = ref(false)

const modalDocumento = ref(false)
const modalFile = ref(false)
const accion = ref('')

const clickModalDocumento = (value) => {
    if (!value) {
        comprobante.value = false
    }
    modalDocumento.value = value
}
const clickModalFile = (value, texto) => {
    if (texto === 'comprobante') {
        comprobante.value = false
        accion.value = ''
    }
    modalFile.value = value
}
const facturasFiltradas = computed(() => {
    return props.datos.facturas.filter(value => value.agregado !== 'NO')
})

const depositosFiltrados = computed(() => {
    props.datos.crear = true
    const deposito = props.datos.depositos ? props.datos.depositos.filter(value => value.agregado !== 'NO') : []
    if (deposito.length > 0) {
        comprobante.value = true
        props.datos.crear = false
    }
    return deposito
})

const formDocumento = () => {
    if (isEditMode.value) {
        editarDocumento()
    } else {
        agregarDocumento()
    }
    Object.assign(gasto, { id: 0, fecha: '', tipo: '', documento: '', numero: '', detalle: '', importe: '', moneda: '', nombreTipo: '', image: '' })
    clickModalDocumento(false)
}

const agregarDocumento = () => {
    const documento = ref(null)
    if (nombreDocumento.value === "no") {
        nombreDocumento.value = 'ninguno'
    }
    gasto.image = getImg(nombreDocumento.value,'/sn100.png',img100)
    const nuevoId = props.datos.facturas.length + 1
    if (comprobante.value) {
        documento.value = {
            idDeposito: nuevoId,
            image: gasto.image,
            fecha: gasto.fecha,
            nombre: gasto.tipo,
            documento: gasto.documento,
            numero: gasto.numero,
            detalle: gasto.detalle,
            importe: props.datos.importe,
            deposito: gasto.importe,
            gasto: props.datos.gasto,
            moneda: gasto.moneda,
            archivo: nombreDocumento.value,
            agregado: "SI",
            token: "Nuevo"
        }
        props.datos.depositos.push(documento.value)
    } else {
        const cuentaEncontrada = props.datos.listaCuentaGasto.find(el => Number(el.idCuenta) === Number(gasto.tipo))
        gasto.nombreTipo = cuentaEncontrada ? cuentaEncontrada.tipo : ''
        props.datos.gasto = Number(Number(props.datos.gasto) + Number(gasto.importe)).toFixed(2)
        getSaldo()
        documento.value = {
            idDetalle: nuevoId,
            image: gasto.image,
            fecha: gasto.fecha,
            idCuenta: gasto.tipo,
            nombre: gasto.nombreTipo,
            documento: gasto.documento,
            numero: gasto.numero,
            detalle: gasto.detalle,
            importe: gasto.importe,
            moneda: props.datos.moneda,
            archivo: nombreDocumento.value,
            agregado: "SI",
            token: "Nuevo"
        }
        props.datos.facturas.push(documento.value)
    }
}

const editarDocumento = () => {
    if (nombreDocumento.value === "no") {
        nombreDocumento.value = 'ninguno'
    }
    gasto.image = getImg(nombreDocumento.value,'/sn100.png',img100)
    const cuentaEncontrada = props.datos.listaCuentaGasto.find(el => Number(el.idCuenta) === Number(gasto.tipo))
    gasto.nombreTipo = cuentaEncontrada ? cuentaEncontrada.tipo : ''
    let suma = 0
    props.datos.facturas.forEach(element => {
        if (Number(element.idDetalle) === Number(gasto.id)) {
            element.fecha = gasto.fecha
            element.idCuenta = gasto.tipo
            element.nombre = gasto.nombreTipo
            element.documento = gasto.documento
            element.numero = gasto.numero
            element.detalle = gasto.detalle
            element.importe = gasto.importe
            element.moneda = gasto.moneda
            element.archivo = nombreDocumento.value
            element.image = gasto.image
        }
        suma = Number(Number(element.importe) + Number(suma)).toFixed(2)
    })
    props.datos.gasto = suma
    getSaldo()
}

const eliminarFile = async (value) => {
    const resultAlert = await confirm('Eliminar Documento ??', 'Desea Eliminar Documento de la Lista', '')
    if (resultAlert.isConfirmed) {
        if (comprobante.value) {
            props.datos.depositos.forEach(element => {
                if (Number(element.idDeposito) === Number(value)) {
                    element.agregado = "NO"
                    comprobante.value = false
                    props.datos.crear = true
                }
            })
        } else {
            props.datos.facturas.forEach(element => {
                if (Number(element.idDetalle) === Number(value)) {
                    element.agregado = "NO"
                    props.datos.gasto = Number(Number(props.datos.gasto) - Number(element.importe)).toFixed(2)
                    getSaldo()
                }
            })
        }
    }
}

const getSaldo = () => {
    props.datos.saldo = Number(Number(props.datos.importe) - Number(props.datos.gasto)).toFixed(2)

    if (Number(props.datos.saldo) > 0) {
        props.datos.devolver = Number(props.datos.saldo).toFixed(2)
        props.datos.rembolso = 0
        props.datos.crear = true
    } else {
        props.datos.rembolso = Number(props.datos.saldo).toFixed(2) * -1
        props.datos.devolver = 0
        props.datos.crear = false
    }
}

const getReplace = (value) => {
    isEditMode.value = true
    const gastoEncontrado = props.datos.facturas.find(el => Number(el.idDetalle) === Number(value))

    gasto.id = gastoEncontrado.idDetalle
    //gasto.image = gastoEncontrado.image
    gasto.fecha = gastoEncontrado.fecha
    gasto.tipo = String(gastoEncontrado.idCuenta)
    gasto.nombreTipo = gastoEncontrado.nombreTipo
    gasto.documento = gastoEncontrado.documento
    gasto.numero = gastoEncontrado.numero
    gasto.detalle = gastoEncontrado.detalle
    gasto.importe = gastoEncontrado.importe
    gasto.moneda = gastoEncontrado.moneda
    titulo.value = 'Remplazar Documento'
    boton.value = 'Actualizar'
    colorboton.value = 'info'
    icono.value = 'cil-description'
    preview.value = 'lg'
    nuevafoto.value = getImg(gastoEncontrado.archivo,'/sn100.png',img800)
    clickModalFile(true, 'Remplazar')
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
    nuevafoto.value = URL.createObjectURL(file)
}


const uploadDocument = async () => {
    if (!archivo.value) return

    uploading.value = true
    uploadProgress.value = 0
    errorMsg.value = null

    try {
        await uploadFile({
            file: archivo.value,
            onProgress: (progress) => {
                uploadProgress.value = progress
            },

            onSuccess: async (data) => {
                try {
                    accion.value = 'upload'
                    clickModalFile(false, 'upload')
                    nuevafoto.value = img800 + data + '.jpg'
                    nombreDocumento.value = data
                    pdf.value = false
                    titulo.value = isEditMode.value ? 'Editar Documento' : 'Registrar Documento'
                    clickModalDocumento(true)
                } catch (err) {
                    errorMsg.value = 'Error al subir archivo: ' + err
                    await error(errorMsg.value)
                }
            },
            onError: async (err) => {
                errorMsg.value = 'Error al subir archivo'
                await error(errorMsg.value + err)
            }
        })

    } catch (err) {
        errorMsg.value = 'Error al subir archivo: ' + err
        await error(errorMsg.value)
    } finally {
        uploading.value = false
    }
}

const getFile = async () => {
    nuevafoto.value = '/sn100.png'
    fileValid.value = false
    isEditMode.value = false
    Object.assign(gasto, { id: 0, fecha: '', tipo: '', documento: '', numero: '', detalle: '', importe: '', moneda: '', nombreTipo: '', image: '' })

    icono.value = 'cil-description'
    boton.value = 'Agregar'
    colorboton.value = 'success'
    preview.value = null

    const resultAlert = await preguntar('Tiene un Documento?', 'Si Tiene un Documento Puede Subirlo', '')
    if (resultAlert.isConfirmed) {
        titulo.value = 'Subir Documento'
        preview.value = 'lg'
        clickModalFile(true, 'Agregar')
    } else if (resultAlert.isDenied) {
        nombreDocumento.value = "no"
        titulo.value = 'Registrar Documento'
        clickModalDocumento(true)
    }
}

const getComprobante = () => {
    nuevafoto.value = '/sn100.png'
    fileValid.value = false
    isEditMode.value = false
    comprobante.value = true
    accion.value = 'comprobante'
    Object.assign(gasto, { id: 0, fecha: '', tipo: 'DEVOLVER', documento: 'DEPOSITO', numero: '', detalle: 'Comprobante de deposito', importe: props.datos.devolver, moneda: props.datos.moneda, nombreTipo: '', image: '' })

    icono.value = 'cil-cloud-upload'
    boton.value = 'Agregar'
    colorboton.value = 'success'
    preview.value = null
    titulo.value = 'Agregar Comprobante'
    preview.value = 'lg'
    clickModalFile(true, 'Agregar')
}

const getEditar = (value) => {
    fileValid.value = false
    isEditMode.value = true
    titulo.value = 'Editar Documento'
    icono.value = 'cil-pencil'
    boton.value = 'Actualizar'
    colorboton.value = 'info'
    preview.value = null

    const gastoEncontrado = props.datos.facturas.find(el => Number(el.idDetalle) === Number(value))
    gasto.id = gastoEncontrado.idDetalle
    gasto.fecha = gastoEncontrado.fecha
    gasto.tipo = String(gastoEncontrado.idCuenta)
    gasto.nombreTipo = gastoEncontrado.nombreTipo
    gasto.documento = gastoEncontrado.documento
    gasto.numero = gastoEncontrado.numero
    gasto.detalle = gastoEncontrado.detalle
    gasto.importe = gastoEncontrado.importe
    gasto.moneda = gastoEncontrado.moneda
    nombreDocumento.value = "no"
    if (gastoEncontrado.archivo !== 'ninguno') {
        nuevafoto.value = img800 + gastoEncontrado.archivo + '.jpg'
        preview.value = 'lg'
        nombreDocumento.value = gastoEncontrado.archivo
    }
    clickModalDocumento(true)
}

const getGasto = (nombre, cuenta) => {
    if (typeof nombre === 'undefined') {
        return cuenta.tipo
    } else {
        return nombre
    }
}

const maskOptions = reactive({
    mask: "0.99",
    tokens: {
        "0": { pattern: /\d/, multiple: true },
        "9": { pattern: /\d/, optional: true }
    }
})

const fecha = new Date(props.datos.del)
const fechaAl = new Date(props.datos.al)
fecha.setDate(fecha.getDate())
fechaAl.setDate(fechaAl.getDate())
const hoy = fecha.toISOString().split('T')[0]
const maximo = fechaAl.toISOString().split('T')[0]
const fechaSeleccionada = ref('')

const validarFecha = (e) => {
    const valor = e.target.value
    if (valor && valor < hoy) {
        fechaSeleccionada.value = hoy // Forzamos a que sea hoy
    }
}

const bloquearTeclado = (e) => {
    e.preventDefault()
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