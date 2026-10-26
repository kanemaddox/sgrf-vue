<template>
    <CButtonGroup role="group">
        <CDropdown placement="bottom-end" variant="nav-item">
            <CDropdownToggle :caret="false">
                <CIcon icon="cil-settings" size="lg"></CIcon>
            </CDropdownToggle>
            
            <CDropdownMenu class="pt-0">
                <CDropdownHeader component="h6" class="bg-body-secondary text-body-secondary fw-semibold my-2">
                    Settings Local
                </CDropdownHeader>
                <div v-if="pernicions?.formularios && admin">
                    <CDropdownItem style="cursor: pointer;" @click="getLocalSettings">
                        <CIcon icon="cil-settings" /> Settings Local
                    </CDropdownItem>
                </div>
                <CDropdownDivider />
                <CDropdownHeader component="h6" class="bg-body-secondary text-body-secondary fw-semibold my-2">
                    Settings Forms
                </CDropdownHeader>
                <div v-if="pernicions?.formularios && admin">
                    <CDropdownItem style="cursor: pointer;" @click="getFormularioSolicitud">
                        <CIcon icon="cil-description" /> Formulario Solicitud
                    </CDropdownItem>
                    <CDropdownItem style="cursor: pointer;" @click="getFormularioRendicion">
                        <CIcon icon="cil-dollar" /> Formulario Rendicion
                    </CDropdownItem>
                </div>
                <CDropdownDivider />
            </CDropdownMenu>

        </CDropdown>
        <li class="nav-item py-1">
            <div class="vr h-100 mx-2 text-body text-opacity-75"></div>
        </li>

        <CDropdown placement="bottom-end" variant="nav-item">
            <CDropdownToggle :caret="false">
                <CIcon icon="cil-menu" size="lg"></CIcon>
            </CDropdownToggle>
            <CDropdownMenu class="pt-0">

                <CDropdownHeader component="h6" class="bg-body-secondary text-body-secondary fw-semibold my-2">
                    Usuarios
                </CDropdownHeader>

                <CDropdownItem style="cursor: pointer;" @click="getAdministradores" v-if="pernicions?.admins && admin">
                    <CIcon icon="cil-group" /> Administradores
                </CDropdownItem>
                <CDropdownItem style="cursor: pointer;" @click="getMenuUsuario" v-if="pernicions?.usuarios && admin">
                    <CIcon icon="cil-group" /> Usuarios
                </CDropdownItem>
                <CDropdownHeader component="h6" class="bg-body-secondary text-body-secondary fw-semibold my-2">
                    Dependencias
                </CDropdownHeader>

                <CDropdownItem style="cursor: pointer;" @click="getJefes" v-if="pernicions?.jefes && admin">
                    <CIcon icon="cil-contact" /> Jefes
                </CDropdownItem>

                <CDropdownItem style="cursor: pointer;" @click="getAreas" v-if="pernicions?.areas && admin">
                    <CIcon icon="cil-factory" /> Centros de Costo
                </CDropdownItem>

                <CDropdownItem style="cursor: pointer;" @click="getGastos" v-if="pernicions?.sucursales && admin">
                    <CIcon icon="cil-wallet" /> Gastos
                </CDropdownItem>

            </CDropdownMenu>

        </CDropdown>
        <li class="nav-item py-1">
            <div class="vr h-100 mx-2 text-body text-opacity-75"></div>
        </li>
    </CButtonGroup>

</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
const router = useRouter()

import { useAuthStore } from '@/stores/authStores'
const auth = useAuthStore()

const pernicions = ref(auth.pernicions)
const rol = ref(auth.rol)
const admin = ref(rol.value === 'ADMIN' ? true : false)

const getFormularioSolicitud = () => {
    router.push({ name: 'FormularioSRF' })
}
const getFormularioRendicion = () => {
    router.push({ name: 'FormularioRDG' })
}
const getMenuUsuario = () => {
    router.push({ name: 'Usuarios' })
}
const getAdministradores = () => {
    router.push({ name: 'Administradores' })
}

const getJefes = () => {
    router.push({ name: 'JEFES' })
}
const getAreas = () => {
    router.push({ name: 'AREA' })
}

const getLocalSettings = () => {
    router.push({ name: 'LocalSettings' })
}

const getGastos = () => {
    router.push({ name: 'GASTOS' })
}

</script>