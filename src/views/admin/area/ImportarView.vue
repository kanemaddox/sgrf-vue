<template>
    <CRow>
        <!-- ================================================================================ -->
        <!-- Tabla de centros de costos exportados desde Excel                                         -->
        <!-- ================================================================================ -->
        <CCol :xs="12">
            <CCard>
                <CCardHeader class="headercolor justify-content-between align-items-center">
                    <CIcon icon="cil-data-transfer-down" size="lg" class="me-2 text-light" />
                    <label class="mb-0 fs-6 text-white">Importar Centros de Costo</label>
                </CCardHeader>
                <CCardBody>
                    <div class="table-responsive">
                        <CTable hover responsive>
                            <CTableHead>
                                <CTableRow>
                                    <CTableHeaderCell>#</CTableHeaderCell>
                                    <CTableHeaderCell>Nivel</CTableHeaderCell>
                                    <CTableHeaderCell>Codigo</CTableHeaderCell>
                                    <CTableHeaderCell>Nombre del Centro de Costos</CTableHeaderCell>
                                </CTableRow>
                            </CTableHead>
                            <CTableBody>
                                <CTableRow v-for="(item, index) in area" :key="index"
                                    :color="item.estado ? 'success' : 'warning'">
                                    <CTableDataCell>{{ index + 1 }}</CTableDataCell>
                                    <CTableDataCell>{{ item.nivel }}</CTableDataCell>
                                    <CTableDataCell>
                                        {{ item.codigo }}
                                    </CTableDataCell>
                                    <CTableDataCell>
                                        {{ item.nombre }}
                                    </CTableDataCell>
                                </CTableRow>
                            </CTableBody>
                        </CTable>
                    </div>
                </CCardBody>
            </CCard>
        </CCol>
    </CRow>

    <!-- ==================================================================== -->
    <!-- Modal para seleccionar Archivo Excel                                 -->
    <!-- ==================================================================== -->
    <CModal backdrop="static" alignment="center" size="lg" :visible="modalImportar" @close="clickModalImportar(false)">
        <CForm @submit.prevent="uploadTable">
            <!-- Encabezado del Modal -->
            <CModalHeader class="headercolor text-white py-3">
                <CModalTitle class="d-flex align-items-center">
                    <CIcon icon="cil-data-transfer-down" size="lg" class="me-2 text-light" />
                    <span class="fs-6">Importar Centros de Costo</span>
                </CModalTitle>
            </CModalHeader>

            <!-- Cuerpo del Modal -->
            <CModalBody class="py-4">
                <!-- Grupo de Entrada de Archivo -->
                <div class="mb-4">
                    <label for="filedoc" class="form-label fw-semibold text-body-secondary mb-2">
                        Seleccione el archivo de los centros de costo (.xls, .xlsx):
                    </label>
                    <CInputGroup class="mb-3">
                        <CInputGroupText as="label" for="filedoc" class="headercolor">
                            <CIcon icon="cil-file" size="lg" />
                        </CInputGroupText>
                        <CFormInput type="file" ref="fileInput" id="filedoc" accept=".xls,.xlsx" @change="selectFile"
                            :valid="fileValid" :disabled="uploading" required />
                        <CInputGroupText v-if="fileValid" class="bg-success-subtle">
                            <CIcon icon="cil-check" class="text-success" />
                        </CInputGroupText>
                    </CInputGroup>
                </div>

                <!-- Barra de Progreso de Carga -->
                <div v-if="uploading" class="mb-4">
                    <div class="d-flex justify-content-between mb-1 small fw-semibold text-body-secondary">
                        <span>{{ uploadProgress < 100 ? 'Subiendo archivo...' : 'Procesando registros...' }}</span>
                                <span>{{ uploadProgress }}%</span>
                    </div>
                    <CProgress :height="20" class="rounded-pill shadow-sm">
                        <CProgressBar :value="uploadProgress" :color="uploadProgress === 100 ? 'success' : 'primary'"
                            variant="striped" animated />
                    </CProgress>
                </div>

                <!-- Alerta de Error -->
                <CAlert v-if="errorMsg" color="danger" class="d-flex align-items-start shadow-sm border-0 mb-3">
                    <CIcon icon="cil-x-circle" size="xl" class="me-3 mt-1 flex-shrink-0" />
                    <div>
                        <h5 class="alert-heading fw-bold fs-6 mb-1">¡Atención con algunos registros!</h5>
                        <p class="mb-1 small">No se pudo cargar todo el archivo. Verifique el correo electrónico de los
                            registros afectados.</p>
                        <hr class="my-2" />
                        <span class="small font-monospace">{{ errorMsg }}</span>
                    </div>
                </CAlert>

                <!-- Alerta de Éxito / Archivo Válido -->
                <CAlert v-if="fileValid && !uploading" color="success"
                    class="d-flex align-items-center shadow-sm border-0 mb-3">
                    <CIcon icon="cil-check-circle" size="xl" class="me-3 flex-shrink-0" />
                    <div>
                        <h5 class="alert-heading fw-bold fs-6 mb-1">¡Archivo listo!</h5>
                        <p class="mb-0 small">El archivo se ha leído correctamente y cumple con el formato requerido.
                        </p>
                    </div>
                </CAlert>

            </CModalBody>

            <!-- Pie de Página / Botones de Acción -->
            <CModalFooter class="bg-body-tertiary px-4 py-3">
                <CButton @click="clickModalImportar(false)" color="danger" class="text-white" size="sm"
                    :disabled="uploading">
                    <CIcon icon="cil-x" class="me-1" />
                    Cancelar
                </CButton>
                <CButton type="submit" color="success" class="text-white" size="sm" :disabled="!fileValid || uploading">
                    <CIcon icon="cil-data-transfer-down" class="me-1" />
                    <span v-if="uploading">Subiendo...</span>
                    <span v-else> Importar</span>
                </CButton>
            </CModalFooter>
        </CForm>
    </CModal>

    <!-- ==================================================================== -->
    <!-- Modal para exportar datos a la Base de Datos    -->
    <!-- ==================================================================== -->
    <CModal backdrop="static" alignment="center" size="lg" :visible="modalExportar" @close="clickModalExportar(false)">
        <CForm @submit.prevent="uploadDatos">
            <!-- Encabezado del Modal -->
            <CModalHeader class="headercolor text-white py-3">
                <CModalTitle class="d-flex align-items-center">
                    <CIcon icon="cil-cloud-upload" size="lg" class="me-2 text-light" />
                    <span class="fs-6 fw-semibold">Exportar Centros de Costo a la Base de Datos</span>
                </CModalTitle>
            </CModalHeader>

            <!-- Cuerpo del Modal -->
            <CModalBody class="py-4">
                <!-- Alerta de Preparación / Advertencia inicial -->
                <CAlert v-if="preparing" color="warning" class="d-flex align-items-start shadow-sm border-0 mb-3">
                    <CIcon icon="cil-warning" size="xl" class="me-3 mt-1 flex-shrink-0" />
                    <div>
                        <h5 class="alert-heading fw-bold fs-6 mb-1">¡Preparando Datos para Transferencia!</h5>
                        <p class="mb-0 small">Se subirán <strong>{{ registros }}</strong> registros a la base de datos.
                            Por favor, asegúrese de que la información sea correcta antes de continuar.</p>
                    </div>
                </CAlert>

                <!-- Barra de Progreso Dinámica -->
                <div v-if="uploading" class="mb-4">
                    <div class="d-flex justify-content-between mb-1 small fw-semibold text-body-secondary">
                        <span>{{ uploadProgress < 100 ? 'Subiendo registros...' : 'Finalizando transferencia...'
                                }}</span>
                                <span>{{ uploadProgress }}%</span>
                    </div>
                    <CProgress :height="20" class="rounded-pill shadow-sm">
                        <CProgressBar :value="uploadProgress" :color="uploadProgress === 100 ? 'success' : 'warning'"
                            variant="striped" animated />
                    </CProgress>
                </div>

                <!-- Alerta de Error -->
                <CAlert v-if="errorMsg" color="danger" class="d-flex align-items-start shadow-sm border-0 mb-3">
                    <CIcon icon="cil-x-circle" size="xl" class="me-3 mt-1 flex-shrink-0" />
                    <div>
                        <h5 class="alert-heading fw-bold fs-6 mb-1">¡Error en la exportación!</h5>
                        <p class="mb-1 small">No se pudo cargar todo el archivo.</p>
                        <hr class="my-2" />
                        <span class="small font-monospace">{{ errorMsg }}</span>
                    </div>
                </CAlert>

                <!-- Alerta de Éxito / Completado -->
                <CAlert v-if="fileValid" color="success" class="d-flex align-items-start shadow-sm border-0 mb-3">
                    <CIcon icon="cil-check-circle" size="xl" class="me-3 mt-1 flex-shrink-0" />
                    <div>
                        <h5 class="alert-heading fw-bold fs-6 mb-1">¡Operación Exitosa!</h5>
                        <p class="mb-0 small">Se subieron correctamente los <strong>{{ registros }}</strong> registros a
                            la Base de Datos.</p>
                    </div>
                </CAlert>

            </CModalBody>

            <!-- Pie de Página / Botones de Acción -->
            <CModalFooter class="bg-body-tertiary px-4 py-3">
                <!-- Botón Cancelar -->
                <CButton @click="clickModalExportar(false)" color="danger" class="text-white" size="sm"
                    :disabled="uploading">
                    <CIcon icon="cil-x" class="me-1" />
                    Cancelar
                </CButton>

                <!-- Botón de Exportar (Visible durante la preparación) -->
                <CButton v-if="preparing" type="submit" color="success" class="text-white" size="sm"
                    :disabled="registros === 0 || uploading">
                    <CIcon icon="cil-cloud-upload" class="me-1" />
                    <span> Exportar Datos</span>
                </CButton>

                <!-- Botón de Aceptar (Visible al finalizar con éxito o error) -->
                <CButton v-if="fileValid || errorMsg" @click="getArea" color="success"
                    class="text-white" size="sm">
                    <CIcon icon="cil-check-alt" class="me-1" />
                    <span> Aceptar</span>
                </CButton>
            </CModalFooter>
        </CForm>
    </CModal>
    <!-- End Modal Exportar Datos-->
</template>

<script setup>
/**Import de librerias */
import 'bootstrap-icons/font/bootstrap-icons.css'

import { ref, onMounted, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'
const router = useRouter()
import { useBreadcrumb } from '@/composables/useBreadcrumb'
const { setActions, clearActions } = useBreadcrumb()

import readSheet from 'read-excel-file/browser'

import { useAlert } from '@/composables/useAlert'
const { success, confirm, error } = useAlert()

import { useArea } from '@/composables/useArea'
const { createDatosUse } = useArea()

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

const area = ref([])

/**Variables para Modales */
const modalImportar = ref(false)
const modalExportar = ref(false)
const exportar = ref(false)

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
            headers.value = response[0].data[0]
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

const uploadTable = async () => {
    clickModalImportar(false)
    area.value = []
    rows.value.slice(1).forEach(fila => {
        const datos = {
            nivel: fila[0],
            codigo: fila[1],
            nombre: fila[2],
            estado: true
        }
        area.value.push(datos)
    })
    registros.value = area.value.length
    if (Number(registros.value) > 0) {
        exportar.value = true
        getAction()
    }
    await success('Centros de Costos Importados', 'Se Importaron ' + registros.value + ' Centros de Costos.')
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
        const listaCarga = [...area.value];

        for (const value of listaCarga) {
            try {
                const resultService = await createDatosUse(value)
                if (resultService.status !== 201) {
                    errores++
                }
                area.value = area.value.filter(item => item.codigo !== value.codigo)
            } catch (err) {
                errores++
                value.estado = false
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

const importar = () => {
    clickModalImportar(true)
}
const clickModalImportar = (value) => {
    modalImportar.value = value
    fileValid.value = false
}

const getExportar = () => {
    clickModalExportar(true)
}

const clickModalExportar = (value) => {
    modalExportar.value = value
    preparing.value = true
    fileValid.value = false
}

const cancelar = () => {
    getCancelar()
}

const getCancelar = async () => {
    const resultAlert = await confirm('Cancelar de Datos', 'Desea Salir de Importacion de Datos ?', '')
    if (resultAlert.isConfirmed) {
        getSalir()
    }
}

const getArea = () => {
    exportar.value = false
    clickModalExportar(false)
    router.push({ name: 'ListaArea' })
}

const salir = () => {
    getSalir()
}

const getSalir = () => {
    router.push({ name: 'MenuArea' })
}

const getAction = () => {
    setActions([
        {
            visible: true,
            label: 'Importar ',
            icon: 'cil-data-transfer-down',
            color: 'success',
            variant: 'ghost',
            disabled: false,
            movile: 'd-none d-md-inline',
            onClick: importar
        },
        {
            visible: true,
            label: 'Exportar',
            icon: 'cil-cloud-upload',
            color: exportar.value ? 'success' : 'secondary',
            variant: 'ghost',
            disabled: !exportar.value,
            movile: 'd-none d-md-inline',
            onClick: getExportar
        },
        {
            visible: true,
            label: 'Cancelar',
            icon: 'cil-x',
            color: 'danger',
            variant: 'ghost',
            disabled: false,
            movile: 'd-none d-md-inline',
            onClick: cancelar
        },
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


onMounted(async () => {
    const tooltips = document.querySelectorAll('.tooltip')
    tooltips.forEach(tooltip => tooltip.remove())
    getAction()
})
onUnmounted(() => {
    clearActions()
})
</script>