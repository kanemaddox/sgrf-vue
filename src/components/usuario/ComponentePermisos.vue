<template>
    <CTabs activeItemKey="pUsuario">
        <CTabList variant="underline-border">
            <CTab class="d-flex align-items-center gap-2 px-3 " itemKey="pUsuario">
                <CIcon icon="cil-user"></CIcon>
                <span class="d-none d-md-inline">Usuario</span>
            </CTab>
            <CTab class="d-flex align-items-center gap-2 px-3 " itemKey="pAdmin">
                <CIcon icon="cil-settings"></CIcon>
                <span class="d-none d-md-inline">Administracion</span>
            </CTab>
        </CTabList>
        <CTabContent>
            <!--Panel Pernicions Usuario-->
            <CTabPanel class="p-3" itemKey="pUsuario">
                <CRow>
                    <CCol :xs="12" :sm="12" :md="6" :lg="6">
                        <CFormCheck type="checkbox" v-model="user.pernicions.mi_cuenta" label="Cuenta Usuario" />
                        <CAlert v-if="user.pernicions.mi_cuenta" color="secondary">
                            <CFormCheck type="checkbox" v-model="user.pernicions.perfil" label="Perfil" />
                            <CFormCheck type="checkbox" v-model="user.pernicions.cuenta_bancaria"
                                label="Cuenta Bancaria" />
                        </CAlert>

                    </CCol>
                    <CCol :xs="12" :sm="12" :md="6" :lg="6">
                        <CFormCheck type="checkbox" label="Formulario de Solicitud"
                            v-model="user.pernicions.formulario_solicitud" />
                        <CAlert v-if="user.pernicions.formulario_solicitud" color="secondary">
                            <CFormCheck label="Crear Solicitudes" v-model="user.pernicions.crear_solicitud" />
                            <CFormCheck label="Listar Solicitudes" v-model="user.pernicions.listar_solicitud" />
                            <CFormCheck label="Aprobar Solicitudes" v-model="user.pernicions.aprobar_solicitud" />
                        </CAlert>

                        <CFormCheck type="checkbox" label="Formulario de Repocicion"
                            v-model="user.pernicions.formulario_repocicion" />
                        <CAlert v-if="user.pernicions.formulario_repocicion" color="secondary">
                            <CFormCheck label="Crear Repociciones" v-model="user.pernicions.crear_repocicion" />
                            <CFormCheck label="Listar Repociciones" v-model="user.pernicions.listar_repocicion" />
                            <CFormCheck label="Aprobar Repociciones" v-model="user.pernicions.aprobar_repocicion" />
                        </CAlert>
                    </CCol>
                    <CCol :xs="12">
                        <hr>
                        <CButton color="secondary" variant="outline" size="sm" @click="updatePernisions">
                            <CIcon icon="cil-check-alt" class="me-2" />
                            <span>Actualizar Permisos</span>
                        </CButton>
                    </CCol>
                </CRow>

            </CTabPanel>

            <!--Panel Pernicions Adminsitracion-->
            <CTabPanel class="p-3" itemKey="pAdmin">
                <fieldset :disabled="user.rol === 'USER'">
                    <CRow>
                        <CCol :xs="12" :sm="12" :md="6" :lg="6">
                            <CFormCheck type="checkbox" label="Administracion"
                                v-model="user.pernicions.menuAdmin" />
                            <CAlert v-if="user.pernicions.menuAdmin" color="secondary">
                                <CFormCheck type="checkbox" v-model="user.pernicions.admins"
                                    label="Admin Administradores" />
                                <CFormCheck type="checkbox" v-model="user.pernicions.usuarios" label="Admin Usuarios" />
                                <CFormCheck type="checkbox" v-model="user.pernicions.jefes" label="Admin Jefes" />
                                <CFormCheck type="checkbox" v-model="user.pernicions.areas" label="Admin Areas" />
                                <CFormCheck type="checkbox" v-model="user.pernicions.sucursales"
                                    label="Admin Sucursales" />
                            </CAlert>
                        </CCol>
                        <CCol :xs="12" :sm="12" :md="6" :lg="6">
                            <CFormCheck type="checkbox" label="Configuracion"
                                v-model="user.pernicions.menuSettings" />
                            <CAlert v-if="user.pernicions.menuSettings" color="secondary">
                                <CFormCheck label="Sistema" v-model="user.pernicions.system" />
                                <CFormCheck label="Formularios" v-model="user.pernicions.formularios" />
                                
                            </CAlert>
                        </CCol>
                        <CCol :xs="12">
                            <hr>
                            <CButton color="secondary" variant="outline" size="sm" @click="updatePernisions">
                                <CIcon icon="cil-check-alt" class="me-2" />
                                <span>Actualizar Permisos</span>
                            </CButton>
                        </CCol>
                    </CRow>
                </fieldset>

            </CTabPanel>
        </CTabContent>
    </CTabs>
</template>

<script setup>
import { ref, watch } from 'vue'
import { useUsuario } from '@/composables/useUsuario'
const { updateUsuarioPernicionsUse } = useUsuario()

import { useAlert } from '@/composables/useAlert'
const { confirm, error, success } = useAlert()

const props = defineProps({
    userPernicions: {
        type: Object,
        required: true
    }
})

const user = ref({
    id: null,
    rol: null,
    pernicions: {}
})

watch(() => props.userPernicions,
    (newValue) => {
        if (newValue) {
            user.value.id = newValue.id
            user.value.rol = newValue.rol
            console.log(user.value.rol)

            user.value.pernicions = {
                mi_cuenta: newValue.pernicions?.mi_cuenta || false,
                perfil: newValue.pernicions?.perfil || false,
                cuenta_bancaria: newValue.pernicions?.cuenta_bancaria || false,
                formulario_solicitud: newValue.pernicions?.formulario_solicitud || false,
                crear_solicitud: newValue.pernicions?.crear_solicitud || false,
                listar_solicitud: newValue.pernicions?.listar_solicitud || false,
                aprobar_solicitud: newValue.pernicions?.aprobar_solicitud || false,
                formulario_repocicion: newValue.pernicions?.formulario_repocicion || false,
                crear_repocicion: newValue.pernicions?.crear_repocicion || false,
                listar_repocicion: newValue.pernicions?.listar_repocicion || false,
                aprobar_repocicion: newValue.pernicions?.aprobar_repocicion || false,
                menuAdmin: newValue.pernicions?.menuAdmin || false,
                admins:newValue.pernicions?.admins || false,
                usuarios:newValue.pernicions?.usuarios||false,
                jefes:newValue.pernicions?.jefes|| false,
                areas:newValue.pernicions?.jefes ||false,
                sucursales:newValue.pernicions?.sucursales || false,
                menuSettings: newValue.pernicions?.menuSettings || false,
                system:newValue.pernicions?.system || false,
                formularios:newValue.pernicions?.formularios || false,
            }
        }
    },
    { immediate: true, deep: true }
)
watch(() => user.value.pernicions.mi_cuenta,
    (value) => {
        if (!value) {
            user.value.pernicions.perfil = false
            user.value.pernicions.cuenta_bancaria = false
        }
    })

watch(() => user.value.pernicions.formulario_solicitud,
    (value) => {
        if (!value) {
            user.value.pernicions.crear_solicitud = false
            user.value.pernicions.listar_solicitud = false
            user.value.pernicions.aprobar_solicitud = false
        }
    })

watch(() => user.value.pernicions.menuAdmin,
    (value) => {
        if (!value) {
            user.value.pernicions.admins = false
            user.value.pernicions.usuarios = false
            user.value.pernicions.jefes = false
            user.value.pernicions.areas = false
            user.value.pernicions.sucursales = false
        }
    })
watch(() => user.value.pernicions.menuSettings,
    (value) => {
        if (!value) {
            user.value.pernicions.system = false
            user.value.pernicions.formularios = false
        }
    })

watch(() => user.value.pernicions.formulario_repocicion,
    (value) => {
        if (!value) {
            user.value.pernicions.crear_repocicion = false
            user.value.pernicions.listar_repocicion = false
            user.value.pernicions.aprobar_repocicion = false
        }
    })

const updatePernisions = async () => {
    const resultAlert = await confirm('Actualizar Permisos de Usuario', 'Desea actualizar los Permisos del Usuario', '')
    if (resultAlert.isConfirmed) {
        try {
            const resultService = await updateUsuarioPernicionsUse(user.value)
            if (resultService.status == 200) {
                await success('Well Done!!!!', 'Los permisos fueron actualizados correctmente', '')
            }
            else {
                await error('Error de Datos!!!', 'Revise los datos e intente nuevamente')
            }
        } catch (errr) {
            await error('Error!!!', 'El Servicio no esta Disponible, intente mas tarde')
        }
    }
    else {
        await error('Datos Cancelados', '', '')
    }
}
</script>
