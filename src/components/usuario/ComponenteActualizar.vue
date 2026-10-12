<template>
    <!--PC-->
    <CInputGroup size="sm" class="mb-3 d-none d-md-flex">
        <CInputGroupText class="headercolor" as="label">
            <i class="bi bi-person-vcard me-2"></i>{{ actualizar.idpName }} :
        </CInputGroupText>
        <CFormInput type="text" :value="actualizar.idp" disabled />
        <CInputGroupText class="headercolor" as="label">ID Usuario :
        </CInputGroupText>
        <CFormInput type="text" :value="actualizar.id" disabled />
    </CInputGroup>

    <CInputGroup size="sm" class="mb-3 d-none d-md-flex">
        <CInputGroupText class="headercolor" as="label">
            <i class="bi bi-envelope-at me-2"></i>Email :
        </CInputGroupText>
        <CFormInput type="text" :value="actualizar.email" disabled />
        <CInputGroupText class="headercolor" as="label">
            <i class="bi bi-phone me-2"></i>Celular :
        </CInputGroupText>
        <CFormInput type="text" :value="actualizar.celular" disabled />
        <CButton type="button" color="success" class="font" size="sm" @click="clickModalCelular(true)">
            <i class="bi bi-arrow-clockwise me-2"></i>Actualizar
        </CButton>
    </CInputGroup>
    <!--PC-->

    <!--Movil-->
    <div class="d-md-none mb-3">
        <CInputGroup size="sm" class="mb-3">
            <CInputGroupText class="headercolor" as="label">
                <i class="bi bi-person-vcard me-2"></i>{{ actualizar.idpName }} :
            </CInputGroupText>
            <CFormInput type="text" :value="actualizar.idp" disabled />
        </CInputGroup>
        <CInputGroup size="sm" class="mb-3">
            <CInputGroupText class="headercolor" as="label">ID Usuario :
            </CInputGroupText>
            <CFormInput type="text" :value="actualizar.id" disabled />
        </CInputGroup>

        <CInputGroup size="sm" class="mb-3">
            <CInputGroupText class="headercolor" as="label">
                <i class="bi bi-envelope-at me-2"></i>Email :
            </CInputGroupText>
            <CFormInput type="text" :value="actualizar.email" disabled />
        </CInputGroup>
        <CInputGroup size="sm" class="mb-3">
            <CInputGroupText class="headercolor" as="label">
                <i class="bi bi-phone me-2"></i>Celular :
            </CInputGroupText>
            <CFormInput type="text" :value="actualizar.celular" disabled />
            <CButton type="button" color="success" class="font" size="sm" @click="clickModalCelular(true)">
                <i class="bi bi-arrow-clockwise me-2"></i>
            </CButton>
        </CInputGroup>
    </div>
    <!--Movil-->

    <CInputGroup size="sm" class="mb-3">
        <CInputGroupText class="headercolor" as="label">
            <i class="bi bi-key me-2"></i> Password :
        </CInputGroupText>
        <CFormInput type="text" value="***************" disabled />
        <CButton type="button" color="success" class="font" size="sm" @click="restablecerPassword">
            <i class="bi bi-arrows-collapse-vertical me-2"></i>
            <span class="d-none d-md-inline"> Restablecer Contraseña</span>
        </CButton>
    </CInputGroup>

    <!-- Modal  Actualizar Celular-->
    <CModal :visible="modalCelular" backdrop="static" @close="clickModalCelular(false)">
        <CForm @submit.prevent="updateCelular">
            <CModalHeader class="headercolor" dismiss @close="clickModalCelular(false)">
                <CModalTitle>
                    <h6><CIcon icon="cil-pencil" size="lg" class="me-2" />Actualizar Numero de Celular</h6>
                </CModalTitle>
            </CModalHeader>
            <CModalBody>
                <ComponenteNombres :datos="actualizar.datos" />
                <CInputGroup class="mb-3">
                    <CInputGroupText as="label" class="headercolor">
                        <i class="bi bi-phone me-2"></i>Nuevo Numero :
                    </CInputGroupText>
                    <CFormInput type="text" v-model="celular.celular" required />
                </CInputGroup>
            </CModalBody>
            <CModalFooter>
                <CButton @click="clickModalCelular(false)" color="danger" class="font" size="sm">
                    <CIcon icon="cil-x" class="me-2" />Cancelar
                </CButton>

                <CButton type="submit" class="font" color="success" size="sm">
                    <CIcon icon="cil-check-alt" class="me-2" />
                    <span>Actualizar</span>
                </CButton>
            </CModalFooter>
        </CForm>
    </CModal>
    <!-- End Modal  Actualizar Celular-->
</template>

<script setup>
const props = defineProps({
    actualizar: {
        type: Object,
        required: true
    }
})
import 'bootstrap-icons/font/bootstrap-icons.css'
import { ref, reactive} from 'vue'
import ComponenteNombres from '@/components/usuario/ComponenteNombres.vue'
import { useUsuario } from '@/composables/useUsuario'
const { updatePasswordUse } = useUsuario()

/**End Profesiones del Usuario  */
import { usePersona } from '@/composables/usePersona'
const { updateCelularUse } = usePersona()
/**End Profesiones del Usuario  */

const modalCelular = ref(false)
const celular = reactive({
    id: '',
    celular: ''
})

const clickModalCelular = (value) => {
    if(value){
        celular.celular = props.actualizar.celular
    }
    modalCelular.value = value
}

const restablecerPassword = async () => {
    await updatePasswordUse(props.actualizar.id, props.actualizar.nombre, props.actualizar.apellido)
}

const updateCelular = async () => {
    clickModalCelular(false)
    celular.id = props.actualizar.idPersona
    const resultService = await updateCelularUse(celular)
    if (resultService) {
        location.reload()
    }
}

</script>