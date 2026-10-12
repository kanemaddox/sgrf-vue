<template>
    <CInputGroup size="sm" class="mb-3">
        <CInputGroupText class="headercolor" as="label">
            <i class="bi bi-pencil-square me-2"></i>Profesion :
        </CInputGroupText>
        <CFormInput type="text" :value="archivo.profesion" disabled />
        <CButton type="button" color="success" class="font" size="sm" @click="clickModalProfesion(true)">
            <CIcon icon="cil-list" size="sm" class="me-2 text-light" />
            <span class="d-none d-md-inline"> Listar</span>
        </CButton>
    </CInputGroup>

    <CInputGroup size="sm" class="mb-3">
        <CInputGroupText class="headercolor" as="label">
            <i class="bi bi-person-badge-fill me-2"></i>Cargo :
        </CInputGroupText>
        <CFormInput type="text" :value="archivo.cargo" disabled />
        <CButton type="button" color="success" class="font" size="sm" @click="clickModalCargo(true)">
            <CIcon icon="cil-list" size="sm" class="me-2 text-light" />
            <span class="d-none d-md-inline"> Listar</span>
        </CButton>
    </CInputGroup>

    <CInputGroup size="sm" class="mb-3">
        <CInputGroupText class="headercolor" as="label">
            <i class="bi bi-envelope-check-fill me-2"></i>Email Corporativo :
        </CInputGroupText>
        <CFormInput type="text" :value="archivo.corporativo" disabled />
    </CInputGroup>

    <!--PC-->
    <div class="d-none d-md-flex">
        <CInputGroup size="sm" class="mb-3">
            <CInputGroupText class="headercolor" as="label">
                <i class="bi bi-person-bounding-box me-2"></i> Jefe :
            </CInputGroupText>
            <CFormInput type="text" :value="archivo.jefe" disabled />
            <CInputGroupText class="headercolor" as="label">
                <i class="bi bi-person-vcard me-2"></i>{{ archivo.idpName }} :
            </CInputGroupText>
            <CFormInput type="text" :value="archivo.idpJefe" disabled />
        </CInputGroup>
    </div>
    <!--PC-->

    <!--Movil-->
    <div class="d-md-none mb-3">
        <CInputGroup size="sm" class="mb-3">
            <CInputGroupText class="headercolor" as="label">
                <i class="bi bi-person-bounding-box me-2"></i> Jefe :
            </CInputGroupText>
            <CFormInput type="text" :value="archivo.jefe" disabled />
        </CInputGroup>
        <CInputGroup size="sm" class="mb-3">
            <CInputGroupText class="headercolor" as="label">
                <i class="bi bi-person-vcard me-2"></i>{{ archivo.idpName }} :
            </CInputGroupText>
            <CFormInput type="text" :value="archivo.idpJefe" disabled />
        </CInputGroup>
    </div>
    <!--Movil-->
    <CWidgetStatsB class="mb-3" :progress="{ color: archivo.estado ? 'success' : 'danger', value: 100 }">
        <template #value></template>
        <template #title>{{ archivo.nombreArea }}</template>
        <template #text>
            <ul>
                <li>{{ archivo.codigoArea }} | {{ archivo.nombreArea}}</li>
            </ul>
        </template>
    </CWidgetStatsB>


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

</template>

<script setup>
const props = defineProps({
    archivo: {
        type: Object,
        required: true
    }
})
import 'bootstrap-icons/font/bootstrap-icons.css'
import { ref} from 'vue'
/**End Cargos del Usuario  */
import { useEmpleado } from '@/composables/useEmpleado'
const { listaCargos, getEmpleadoCargoUsuarioUse } = useEmpleado()
/**End Cargos del Usuario  */

/**End Profesiones del Usuario  */
import { usePersona } from '@/composables/usePersona'
const { listaProfesiones, getPersonaProfesionUsuarioUse } = usePersona()
/**End Profesiones del Usuario  */

const modalCargo = ref(false)
const modalProfesion = ref(false)

const clickModalCargo = async (value) => {
    if (value) {
        await getEmpleadoCargoUsuarioUse(props.archivo.id)
    }
    modalCargo.value = value
}

const clickModalProfesion = async (value) => {
    if (value) {
        await getPersonaProfesionUsuarioUse(props.archivo.id)
    }
    modalProfesion.value = value
}
</script>