<template>
    <CRow>
        <CCol :xs="12">
            <CCard>
                <CCardHeader class="headercolor justify-content-between align-items-center">
                    <CRow>
                        <CCol :xs="7" :sm="6" :md="6" :lg="6">
                            <div class="align-items-center">
                                <CIcon icon="cil-data-transfer-down" size="lg" class="me-2 text-light" />
                                <label class="mb-0 fs-6 text-white">Importar Usuarios</label>
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
                                    <CDropdownItem style="cursor: pointer;" @click="clickModalImportar(true)">
                                        <CIcon icon="cil-data-transfer-down" /> Importar Usuarios
                                    </CDropdownItem>
                                    <CDropdownDivider />
                                    <CDropdownItem style="cursor: pointer;" @click="clickModalExportar(true)">
                                        <CIcon icon="cil-cloud-upload" /> Cargar Usuarios DB
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
                                    <CTableHeaderCell>IDP</CTableHeaderCell>
                                    <CTableHeaderCell>Datos Personales</CTableHeaderCell>
                                    <CTableHeaderCell>Area</CTableHeaderCell>
                                    <CTableHeaderCell>Datos Bancarios</CTableHeaderCell>
                                    <CTableHeaderCell>Responsable</CTableHeaderCell>
                                    <CTableHeaderCell>Estado</CTableHeaderCell>
                                </CTableRow>
                            </CTableHead>
                            <CTableBody>
                                <CTableRow v-for="(item, index) in usuarios" :key="index" :color="item.estado?'success':'warning'">
                                    <CTableDataCell>{{ index + 1 }}</CTableDataCell>
                                    <CTableDataCell>{{ item.idp }}</CTableDataCell>
                                    <CTableDataCell>
                                        {{ item.nombre }} {{ item.paterno }} {{ item.materno }}
                                        <div class="small text-body-secondary text-nowrap">
                                            <span><strong>Email : </strong>{{ minuscula(item.email) }}</span><br>
                                            <span><strong>Profesion :</strong>
                                                {{ minuscula(len(item.profesion)) }}

                                            </span> <br>
                                            <span><strong>Cargo:</strong>
                                                {{ minuscula(len(item.cargoNombre)) }} | {{ item.tipo }}</span>
                                        </div>

                                    </CTableDataCell>
                                    <CTableDataCell>
                                        {{ item.nombreArea }}
                                        <div class="small text-body-secondary text-nowrap">
                                            <span> {{ item.nombreSucursal }} | {{ item.codigoSucursal }}</span><br>
                                            <span> {{ item.nombreCentroCostos }} | {{ item.codigoCentroCostos }}</span>
                                        </div>
                                    </CTableDataCell>

                                    <CTableDataCell>
                                        Banco : {{ item.bancoNombre }}
                                        <div class="small text-body-secondary text-nowrap">
                                            <span>Tipo de Cuenta : {{ item.tipoCuenta }}</span> <br>
                                            <span>Numero de Cuenta : {{ item.numero }}</span>
                                        </div>
                                    </CTableDataCell>
                                    <CTableDataCell>
                                        <div class="small text-body-secondary text-nowrap">
                                            <strong>{{ item.jefe }}</strong><br>
                                            <span>{{ item.idpJefe }}</span>
                                        </div>
                                    </CTableDataCell>
                                    <CTableDataCell>{{ item.estado }}</CTableDataCell>
                                </CTableRow>
                            </CTableBody>
                        </CTable>
                    </div>
                </CCardBody>
            </CCard>
        </CCol>
    </CRow>

    <!-- Modal  Importar datos-->
    <CModal backdrop="static" :visible="modalImportar" @close="clickModalImportar(false)">
        <CForm @submit.prevent="uploadTable">
            <CModalHeader class="headercolor" dismiss @close="clickModalImportar(false)">
                <CModalTitle>
                    <h6>
                        <CIcon icon="cil-data-transfer-down" size="lg" class="me-2" />Importar Datos de Usuario
                    </h6>
                </CModalTitle>
            </CModalHeader>

            <CModalBody>
                <!-- INPUT -->
                <CInputGroup class="mb-3">
                    <CInputGroupText as="label">Archivo</CInputGroupText>
                    <CFormInput type="file" ref="fileInput" id="filedoc" accept=".xls,.xlsx" @change="selectFile"
                        :valid="fileValid" :disabled="uploading" required />
                    <CInputGroupText v-if="fileValid">
                        <CIcon icon="cil-check" class="text-success" />
                    </CInputGroupText>
                </CInputGroup>

                <!-- PROGRESS -->
                <CProgress v-if="uploading" :height="50" class="mb-3">
                    <CProgressBar :value="uploadProgress" :color="uploadProgress === 100 ? 'success' : 'warning'"
                        animated>
                        {{ uploadProgress < 100 ? `Subiendo... ${uploadProgress}%` : 'Procesando imagen...' }}
                            </CProgressBar>
                </CProgress>
                <!-- ERROR -->

                <CAlert v-if="errorMsg" color="danger" class="d-flex align-items-center">
                    <CRow>
                        <CAlertHeading>Error!</CAlertHeading>
                        <CCol :xs="2">
                            <CIcon icon="cil-x-circle" size="3xl" />
                        </CCol>
                        <CCol :xs="10">
                            <p>No sepudo cargar todo el archivo, verifique el correo electronico de los registros afectados</p>
                            <hr />
                            {{ errorMsg }}
                        </CCol>
                    </CRow>
                </CAlert>

                <CAlert v-if="fileValid" color="success" class="d-flex align-items-center">
                    <CRow>
                        <CAlertHeading>Well done!</CAlertHeading>
                        <CCol :xs="2">
                            <CIcon icon="cil-check-circle" size="3xl" />
                        </CCol>
                        <CCol :xs="10">
                            <p>Archivo leido correctamente....</p>
                            <hr />
                        </CCol>
                    </CRow>
                </CAlert>

            </CModalBody>

            <CModalFooter>
                <CButton @click="clickModalImportar(false)" color="danger" class="font" size="sm" :disabled="uploading">
                    <CIcon icon="cil-x" class="me-2" />
                    Cancelar
                </CButton>

                <CButton type="submit" class="font" color="success" size="sm" :disabled="!fileValid || uploading">
                    <CIcon icon="cil-data-transfer-down" class="me-2" />
                    <span v-if="uploading">Subiendo...</span>
                    <span v-else>Importar</span>
                </CButton>
            </CModalFooter>

        </CForm>
    </CModal>
    <!-- End Modal Importar Datos-->

    <!-- Modal  Exportar datos-->
    <CModal backdrop="static" :visible="modalExportar" @close="clickModalExportar(false)">
        <CForm @submit.prevent="uploadDatos">
            <CModalHeader class="headercolor" dismiss @close="clickModalExportar(false)">
                <CModalTitle>
                    <h6>
                        <CIcon icon="cil-cloud-upload" size="lg" class="me-2" />Exportar Datos de Usuario a la Base de
                        Datos
                    </h6>
                </CModalTitle>
            </CModalHeader>

            <CModalBody>
                <!-- INPUT -->
                <CAlert v-if="preparing" color="warning" class="d-flex align-items-center">
                    <CRow>
                        <CAlertHeading>Preparando Datos para Transferencia!</CAlertHeading>
                        <CCol :xs="2">
                            <CIcon icon="cil-warning" size="3xl" />
                        </CCol>
                        <CCol :xs="10">
                            <p>Se subiran {{ registros }} registros a la base de datos.</p>
                            <hr />
                        </CCol>
                    </CRow>
                </CAlert>

                <!-- PROGRESS -->
                <CProgress v-if="uploading" :height="50" class="mb-3">
                    <CProgressBar :value="uploadProgress" :color="uploadProgress === 100 ? 'success' : 'warning'"
                        animated>
                        {{ uploadProgress < 100 ? `Subiendo... ${uploadProgress}%` : 'Subiendo Registros...' }}
                            </CProgressBar>
                </CProgress>

                <!-- ERROR -->
                <CAlert v-if="errorMsg" color="danger" class="d-flex align-items-center">
                    <CRow>
                        <CAlertHeading>Error!</CAlertHeading>
                        <CCol :xs="2">
                            <CIcon icon="cil-x-circle" size="3xl" />
                        </CCol>
                        <CCol :xs="10">
                            <p>No sepudo cargar todo el archivo, verifique el correo electronico de los registros afectados.</p>
                            <hr />
                            {{ errorMsg }}
                        </CCol>
                    </CRow>
                </CAlert>

                <CAlert v-if="fileValid" color="success" class="d-flex align-items-center">
                    <CRow>
                        <CAlertHeading>Well done!</CAlertHeading>
                        <CCol :xs="2">
                            <CIcon icon="cil-check-circle" size="3xl" />
                        </CCol>
                        <CCol :xs="10">
                            <p>Se subieron Correctamente los {{ registros }} registros a la Base de Datos..</p>
                            <hr />
                        </CCol>
                    </CRow>
                </CAlert>

            </CModalBody>

            <CModalFooter>
                <CButton @click="clickModalExportar(false)" color="danger" class="font" size="sm" :disabled="uploading">
                    <CIcon icon="cil-x" class="me-2" />
                    Cancelar
                </CButton>

                <CButton v-if="preparing" type="submit" class="font" color="success" size="sm"
                    :disabled="registros == 0">
                    <CIcon icon="cil-cloud-upload" class="me-2" />
                    <span>Exportar</span>
                </CButton>

                <CButton v-if="fileValid || errorMsg" @click="clickModalExportar(false)" class="font" color="success"
                    size="sm">
                    <CIcon icon="cil-check-alt" class="me-2" />
                    <span>Aceptar</span>
                </CButton>
            </CModalFooter>

        </CForm>
    </CModal>
    <!-- End Modal Exportar Datos-->
</template>

<script setup>
/**Import de librerias */
import { reactive, ref, onMounted } from 'vue'
import readSheet from 'read-excel-file/browser'

import { useFunction } from '@/composables/useFunction'
const { len, minuscula, jerarquia, updateUser } = useFunction()

import { useAlert } from '@/composables/useAlert'
const { success, confirm, error } = useAlert()

import { useUsuario } from '@/composables/useUsuario'
const { addDatosUse, setEstadoUse, getEmpleadosFileUse, loading, errorUse } = useUsuario()

/**VAriables para el Archivo */
const archivo = ref(null)
const uploadProgress = ref(0)
const uploading = ref(false)
const errorMsg = ref(null)
const fileValid = ref(false)
const preparing = ref(true)

const headers = ref([])
const rows = ref([])
const registros = ref(0)

const usuarios = ref([])
const usuariosDb = ref([])
const nuevaLista = ref([])
let listaJefe = ref([])

/**Variables para Modales */
const modalImportar = ref(false)
const modalExportar = ref(false)

/** Funciones  */

const selectFile = async (e) => {
    const file = e.target.files[0]
    if (!file) return

    uploading.value = true
    uploadProgress.value = 0

    const interval = setInterval(() => {
        if (uploadProgress.value < 90) {
            uploadProgress.value += 10
        }
    }, 100)

    try {
        const response = await readSheet(file)
        if (!response) {
            fileValid.value = false
        }
        else {
            fileValid.value = true
            archivo.value = file
            headers.value = response[0].data[0];
            rows.value = response[0].data
        }
        uploadProgress.value = 100

    } catch (error) {
        errorMsg.value = error
        console.error(error)
    } finally {
        clearInterval(interval)

        setTimeout(() => {
            uploading.value = false
        }, 500)
    }
}

const uploadTable = () => {
    clickModalImportar(false)
    usuarios.value = []
    const usuario = ref([])
    rows.value.slice(1).forEach(fila => {
        const datos = {
            idp: fila[0],
            nombre: fila[1],
            paterno: fila[2] || '',
            materno: fila[3] || '',
            email: fila[11],
            profesion: fila[4] || 'Ninguno',
            cargoNombre: fila[5] || 'Ninguno',
            numero: fila[14] || 'Ninguno',
            tipoCuenta: fila[12] || 'Ninguno',
            bancoNombre: fila[13] || 'Ninguno',
            codigoSucursal: fila[6] || 'Ninguno',
            nombreSucursal: fila[7] || 'Ninguno',
            codigoCentroCostos: fila[8] || 'Ninguno',
            nombreCentroCostos: fila[9] || 'Ninguno',
            nombreArea: fila[15] || 'Ninguno',
            idpJefe: fila[17] || '',
            jefe: fila[16],
            estado: true,
            tipo: false
        }
        const datosJefe = {
            idp: fila[17],
            idpJefe: ''
        }
        usuario.value.push(datos)
        listaJefe.value.push(datosJefe)
    });

    usuarios.value = jerarquia(usuario, listaJefe)
    registros.value = usuarios.value.length
    success('Registros subidos', 'Se subieron ' + usuarios.value.length + ' registros.')
}

const uploadDatos = async () => {
    preparing.value = false
    const resultAlert = await confirm('Carga de Datos', 'Esta seguro de subir los ' + registros.value + ' registros a la Base de Datos ?')
    if (resultAlert.isConfirmed) {
        uploading.value = true
        uploadProgress.value = 0
        errorMsg.value = null
        let procesados = 0
        let errores = 0
        const listaCarga = [...usuarios.value]; 
        const result = await setEstadoUse(false)
        
        if (result == 200) {
            for (const value of listaCarga) {
                try {
                    const resultService = await addDatosUse(value)
                    if (resultService.status !== 201) {
                        errores++
                    }
                    usuarios.value=usuarios.value.filter(item => item.idp !== value.idp)
                } catch (err) {
                    errores++
                    value.estado = false
                    console.log(value)
                }
                procesados++
                uploadProgress.value = Math.round((procesados / registros.value) * 100)
            }
            uploading.value = false
            if (errores > 0) {
                errorMsg.value = 'Se completó con ' + errores + ' errores'
                fileValid.value = false
            } else {
                uploadProgress.value = 100
                fileValid.value = true
            }
        }
        else {
            await error('Datos Cancelados')
        }
    }
    else {
        await error('Datos Cancelados')
    }
}

const clickModalImportar = (value) => {
    modalImportar.value = value
    fileValid.value = false
}
const clickModalExportar = (value) => {
    modalExportar.value = value
    preparing.value = true
    fileValid.value = false
}

onMounted(async () => {
    const tooltips = document.querySelectorAll('.tooltip');
    tooltips.forEach(tooltip => tooltip.remove());
})
</script>