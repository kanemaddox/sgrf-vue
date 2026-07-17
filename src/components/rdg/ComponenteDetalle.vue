<template>
    <CAlert color="secondary">
        <CRow>
            <CCol :xs="12" :sm="8" :md="8" :lg="8">
                III. {{ valores.seccionTres }}
            </CCol>
            <CCol :xs="12" :sm="4" :md="4" :lg="4" class="d-grid gap-2 text-end">
                <CButton class="font" color="primary" size="sm" @click="getFile">
                    <i class="bi bi-file-earmark-text me-2"></i> Subir Documento
                </CButton>
            </CCol>
        </CRow>
    </CAlert>
    <CRow class="table-responsive">
        <CTable small hover responsive>
            <CTableHead color="dark">
                <CTableRow>
                    <CTableHeaderCell scope="col">#</CTableHeaderCell>
                    <CTableHeaderCell scope="col">Doc.</CTableHeaderCell>
                    <CTableHeaderCell scope="col">Datos</CTableHeaderCell>
                    <CTableHeaderCell scope="col">Detalle</CTableHeaderCell>
                    <CTableHeaderCell scope="col">Importe</CTableHeaderCell>
                    <CTableHeaderCell scope="col">

                    </CTableHeaderCell>
                </CTableRow>
            </CTableHead>
            <CTableBody>
                <CTableRow v-for="value in datos.listaGasto" :key="value.id">
                    <CTableHeaderCell scope="row">{{ value.id }}</CTableHeaderCell>
                    <CTableDataCell>
                        <img :src="value.image" class="img-fluid " alt="...">
                    </CTableDataCell>
                    <CTableDataCell>
                        <div class="small text-body-secondary text-nowrap">
                            <span><strong>Fecha : </strong>{{ value.fecha }}</span><br>
                            <span><strong>Tipo Gasto : </strong>{{ value.nombre }}</span> <br>
                            <span><strong>Tipo Doc. : </strong>{{ value.documento }}</span><br>
                            <span><strong>Numero : </strong>{{ value.numero }}</span>
                        </div>
                    </CTableDataCell>

                    <CTableDataCell>{{ value.detalle }}</CTableDataCell>
                    <CTableDataCell>{{ value.importe }} {{ datos.moneda }}
                    </CTableDataCell>
                    <CTableDataCell>
                        <CButtonGroup role="group" size="sm">
                            <CButton color="secondary" variant="outline" @click="getEditar(value.id)"
                                v-c-tooltip="{ content: 'Editar Documento', placement: 'top' }">
                                <i class="bi bi-pencil-square"></i>
                            </CButton>

                            <CButton color="secondary" variant="outline" @click="getReplace(value.id)"
                                v-c-tooltip="{ content: 'Cambiar Documento', placement: 'top' }">
                                <i class="bi bi-folder-x"></i>
                            </CButton>

                            <CButton color="danger" class="font" @click="eliminarFile(value.id)"
                                v-c-tooltip="{ content: 'Eliminar Documento', placement: 'top' }">
                                <i class="bi bi-trash3"></i>
                            </CButton>
                        </CButtonGroup>
                    </CTableDataCell>

                </CTableRow>

                <CTableRow active>
                    <CTableHeaderCell scope="row" colspan="4" active>TOTAL GASTOS
                        REALIZADOS
                    </CTableHeaderCell>
                    <CTableDataCell><label class="total">{{ datos.gasto }}</label> {{
                        datos.moneda }}
                    </CTableDataCell>
                    <CTableDataCell></CTableDataCell>
                </CTableRow>

                <CTableRow>
                    <CTableHeaderCell scope="row" colspan="4" active>TOTAL FONDOS
                        RECIBIDOS
                    </CTableHeaderCell>
                    <CTableDataCell><label class="total">{{ datos.importe }} </label>
                        {{ datos.moneda }}
                    </CTableDataCell>
                    <CTableDataCell></CTableDataCell>
                </CTableRow>

                <CTableRow active>
                    <CTableHeaderCell scope="row" colspan="4" active>SALDO
                    </CTableHeaderCell>
                    <CTableDataCell><label class="total">{{ datos.saldo }}</label> {{
                        datos.moneda }}
                    </CTableDataCell>
                    <CTableDataCell></CTableDataCell>
                </CTableRow>
            </CTableBody>
        </CTable>
    </CRow>
    <CAlert v-if="datos.rembolso > 0" color="success" class="text-end">
        Fondos por reembolsar <label class="total">{{ datos.rembolso }}</label> {{ datos.moneda }}
    </CAlert>
    <CAlert v-if="datos.devolver > 0" color="danger" class="text-end">
        Fondos por devolver a la oficina <label class="total">{{ datos.devolver }}</label> {{
            datos.moneda }}
    </CAlert>

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
                    <CCol v-if="preview === 'lg'" :xs="12" :sm="7" :md="7" :lg="7">
                        <ComponenteImagen :imagen="nuevafoto" />
                    </CCol>
                    <CCol :xs="12" :sm="preview === 'lg' ? 5 : 12" :md="preview === 'lg' ? 5 : 12"
                        :lg="preview === 'lg' ? 5 : 12">

                        <CInputGroup size="sm" class="mb-3">
                            <CInputGroupText as="label" class="headercolor">Fecha : </CInputGroupText>
                            <CFormInput type="date" v-model="gasto.fecha" required />
                        </CInputGroup>

                        <CInputGroup size="sm" class="mb-3">
                            <CInputGroupText as="label" class="headercolor">Tipo de Gasto : </CInputGroupText>
                            <CFormSelect v-model="gasto.tipo" required>
                                <option>Seleccionar</option>
                                <option v-for="value in datos.listaCuentaGasto" :key="value.idCuenta"
                                    :value="value.idCuenta">
                                    {{ value.tipo }}
                                </option>
                            </CFormSelect>
                        </CInputGroup>

                        <CInputGroup size="sm" class="mb-3">
                            <CInputGroupText as="label" class="headercolor">Tipo de Documento : </CInputGroupText>
                            <CFormSelect v-model="gasto.documento" required>
                                <option value="">Documento</option>
                                <option value="FACTURA">Factura</option>
                                <option value="BOLETA">Boleta</option>
                                <option value="OD">OD</option>
                                <option value="SD">S/D</option>
                            </CFormSelect>
                        </CInputGroup>

                        <CInputGroup size="sm" class="mb-3">
                            <CInputGroupText as="label" class="headercolor">No. {{ gasto.documento }} :
                            </CInputGroupText>
                            <CFormInput type="text" v-model="gasto.numero" :required="gasto.documento !== 'SD'"
                                :disabled="gasto.documento === 'SD'" />
                        </CInputGroup>

                        <CFormTextarea label="Detalle : " v-model="gasto.detalle" rows="2"
                            :text="getCantidadCaracteres(150, gasto.detalle.length)" maxlength="150" required>
                        </CFormTextarea>
                        <hr>
                        <input type="hidden" v-maska="maskOptions" v-model="gasto.importe">
                        <CInputGroup size="sm" class="mb-3">
                            <CInputGroupText as="label" class="headercolor">Importe : </CInputGroupText>
                            <CFormInput type="text" v-model="gasto.importe" required />
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
                <div class="md-3 text-center" v-if="nuevafoto">
                    <img v-if="!pdf" :src="nuevafoto" class="img-fluid rounded shadow-sm" />

                    <embed v-if="pdf" :src="nuevafoto" type="application/pdf" width="100%" height="500px" />

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
                    <CIcon icon="cil-x" class="me-2" />
                    Cancelar
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
import { ref, reactive, watch } from 'vue'

import { useAlert } from '@/composables/useAlert'
const { confirm, preguntar } = useAlert()
import { useFunction } from '@/composables/useFunction'
const { getDias, getCantidadCaracteres } = useFunction()

import ComponenteImagen from '@/components/imagen/ComponenteImagen.vue'

import { API_FILE_IMG100, API_FILE_IMG800 } from "@/env"
const img100 = API_FILE_IMG100
const img800 = API_FILE_IMG800

import { uploadFile } from '@/services/uploadService'

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
    moneda: ''
})

const nuevafoto = ref('/public/sn100.png')

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

const modalDocumento = ref(false)
const modalFile = ref(false)
const modalFileReplace = ref(false)

const clickModalDocumento = (value) => {
    modalDocumento.value = value
}
const clickModalFile = (value) => {
    modalFile.value = value
}

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
    if (nombreDocumento.value === "no") {
        gasto.image = '/public/sn100.png'
        nombreDocumento.value = 'ninguno'
    } else {
        gasto.image = img100 + nombreDocumento.value + '.jpg'
    }
    const cuentaEncontrada = props.datos.listaCuentaGasto.find(el => Number(el.idCuenta) === Number(gasto.tipo))
    gasto.nombreTipo = cuentaEncontrada ? cuentaEncontrada.tipo : ''
    props.datos.gasto = Number(Number(props.datos.gasto) + Number(gasto.importe)).toFixed(2)
    getSaldo()
    const nuevoId = props.datos.listaGasto.length + 1
    const documento = {
        id: nuevoId,
        image: gasto.image,
        fecha: gasto.fecha,
        tipo: gasto.tipo,
        nombre: gasto.nombreTipo,
        documento: gasto.documento,
        numero: gasto.numero,
        detalle: gasto.detalle,
        importe: gasto.importe,
        moneda: props.datos.moneda,
        archivo: nombreDocumento.value
    }
    props.datos.listaGasto.push(documento)
}

const editarDocumento = () => {
    if (nombreDocumento.value === "no") {
        gasto.image = '/public/sn100.png'
        nombreDocumento.value = 'ninguno'
    } else {
        gasto.image = img100 + nombreDocumento.value + '.jpg'
    }
    const cuentaEncontrada = props.datos.listaCuentaGasto.find(el => Number(el.idCuenta) === Number(gasto.tipo))
    gasto.nombreTipo = cuentaEncontrada ? cuentaEncontrada.tipo : ''
    let suma = 0
    props.datos.listaGasto.forEach(element => {
        if (Number(element.id) === Number(gasto.id)) {
            element.fecha = gasto.fecha
            element.tipo = gasto.tipo
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
        const cuentaEncontrada = props.datos.listaGasto.find(el => Number(el.id) === Number(value))
        props.datos.listaGasto = props.datos.listaGasto.filter(item => Number(item.id) !== Number(value))

        props.datos.gasto = Number(Number(props.datos.gasto) - Number(cuentaEncontrada.importe)).toFixed(2)

        getSaldo()
        let n = 1
        props.datos.listaGasto.forEach(element => {
            element.id = n
            n++
        })
    }
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

const getReplace = (value) => {
    isEditMode.value = true
    const gastoEncontrado = props.datos.listaGasto.find(el => Number(el.id) === Number(value))

    gasto.id = gastoEncontrado.id
    gasto.image = gastoEncontrado.image
    gasto.fecha = gastoEncontrado.fecha
    gasto.tipo = gastoEncontrado.tipo
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
    if (gastoEncontrado.archivo !== 'ninguno') {
        nuevafoto.value = img800 + gastoEncontrado.archivo + '.jpg'
    } else {
        nuevafoto.value = '/public/sn100.png'
    }

    clickModalFile(true)
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
            nuevafoto.value = img800 + data + '.jpg'
            nombreDocumento.value = data
            pdf.value = false
            titulo.value = isEditMode.value ? 'Editar Documento' : 'Registrar Documento'
            clickModalDocumento(true)
        },
        onError: async (err) => {
            errorMsg.value = 'Error al subir archivo'
            await error(errorMsg.value)
        }
    })
        .finally(() => {
            uploading.value = false
        })
}

const getFile = async () => {
    nuevafoto.value = '/public/sn100.png'
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
        clickModalFile(true)
    } else if (resultAlert.isDenied) {
        nombreDocumento.value = "no"
        titulo.value = 'Registrar Documento'
        clickModalDocumento(true)
    }
}

const getEditar = (value) => {
    fileValid.value = false
    isEditMode.value = true
    titulo.value = 'Editar Documento'
    icono.value = 'cil-pencil'
    boton.value = 'Actualizar'
    colorboton.value = 'info'
    preview.value = null

    const gastoEncontrado = props.datos.listaGasto.find(el => Number(el.id) === Number(value))
    gasto.id = gastoEncontrado.id
    gasto.image = gastoEncontrado.image
    gasto.fecha = gastoEncontrado.fecha
    gasto.tipo = gastoEncontrado.tipo
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

const maskOptions = reactive({
    mask: "0.99",
    tokens: {
        "0": { pattern: /\d/, multiple: true },
        "9": { pattern: /\d/, optional: true }
    }
})

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

<style scoped>
.pdf-container {
    width: 100%;
    height: 500px;
    overflow: hidden;
    /* Corta cualquier excedente */
    border: 1px solid #ced4da;
    border-radius: 0.375rem;
}

.pdf-embed {
    width: 100%;
    height: 100%;
}
</style>