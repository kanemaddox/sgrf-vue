<template>
    <CRow>
        <CCol :xs="12">
            <CCard>
                <CCardHeader class="headercolor justify-content-between align-items-center">
                    <CRow>
                        <CCol :lg="6">
                            <div class="align-items-center">
                                <CIcon icon="cil-data-transfer-down" size="lg" class="me-2 text-light" />
                                <label class="mb-0 fs-6 text-white">Importar Usuarios</label>
                            </div>
                        </CCol>
                        <CCol :lg="6" class="text-end">
                            <CDropdown variant="btn-group">
                                <CDropdownToggle class="font border-0" size="sm">
                                    <CIcon icon="cil-menu" color="dark" class="me-2 text-success"/>Opciones
                                </CDropdownToggle>
                                <CDropdownMenu class="pt-0">
                                    <CDropdownHeader component="h6"
                                        class="bg-body-secondary text-body-secondary fw-semibold mb-2 rounded-top">
                                        Opciones
                                    </CDropdownHeader>
                                    <CDropdownItem style="cursor: pointer;" @click="clickModalImportar(true)">
                                        <CIcon icon="cil-data-transfer-down" /> Importar Usuarios
                                    </CDropdownItem>
                                </CDropdownMenu>
                            </CDropdown>
                        </CCol>
                    </CRow>
                </CCardHeader>
                <CCardBody>
                    <div class="table-responsive">
                        <table id="personaTabla" class="table table-striped table-hover">
                            <thead>
                                <tr>
                                    <th>IDP</th>
                                    <th>Nombre</th>
                                    <th>A. Paterno</th>
                                    <th>A. Materno</th>
                                    <th>Email</th>
                                    <th>Profesión</th>
                                    <th>Cargo</th>
                                    <th>Codigo Centro Costo</th>
                                    <th>Centro Costo</th>
                                    <th>Codigo Sucursal</th>
                                    <th>Sucursal</th>
                                    <th>Banco</th>
                                    <th>Tipo de Cuenta</th>
                                    <th>Numero de Cuenta</th>
                                    <th>Area</th>
                                    <th>IDP-Jefe</th>
                                    <th>Jefe</th>
                                </tr>
                            </thead>
                            <tbody>
                                
                            </tbody>
                        </table>
                    </div>
                </CCardBody>
            </CCard>
        </CCol>
    </CRow>

    <!-- Modal  Importar datos-->
    <CModal backdrop="static" :visible="modalImportar" @close="clickModalImportar(false)">
        <CForm enctype="multipart/form-data">
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
                    <CFormInput type="file" ref="fileInput" id="filedoc" accept=".xls,.xlsx"
                        @change="selectFile" :valid="fileValid" :disabled="uploading" required />
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
                <div v-if="errorMsg" class="alert alert-danger text-center">
                    {{ errorMsg }}
                </div>

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
</template>

<script setup>
import {ref} from 'vue'

/**VAriables para el Archivo */
const archivo = ref(null)
const uploadProgress = ref(0)
const uploading = ref(false)
const errorMsg = ref(null)
const fileValid = ref(false)

/**Variables para Modales */
const modalImportar = ref(false)

/** Funciones  */

const selectFile = (e) => {
    const file = e.target.files[0]
    if (!file) return

    archivo.value = file
    fileValid.value = true
}


const clickModalImportar = (value) => {
    modalImportar.value = value
}
</script>