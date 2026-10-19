<template>
  <CDropdown placement="bottom-end" variant="nav-item">
    <CDropdownToggle class="py-0 pe-0" :caret="false">
      <CAvatar :src="imagen" size="md" />
    </CDropdownToggle>
    <CDropdownMenu class="pt-0">
      <CDropdownHeader component="h6" class="bg-body-secondary text-body-secondary fw-semibold my-2">
        Cuenta
      </CDropdownHeader>
      <CDropdownItem style="cursor: pointer;" @click="profile">
        <CIcon icon="cil-user" /> Perfil Usuario
      </CDropdownItem>
      <CDropdownItem style="cursor: pointer;">
        <CIcon icon="cil-dollar" /> Cuentas Bancarias
      </CDropdownItem>
      <CDropdownDivider />
      <CDropdownItem style="cursor: pointer;" @click="confirmLogout">
        <CIcon icon="cil-lock-locked" /> Cerrar Sesion
      </CDropdownItem>
    </CDropdownMenu>
  </CDropdown>
</template>
<script setup>

import { ref } from 'vue'
import { useAuth } from '@/composables/useAuth'
import { useUser } from '@/composables/useUsers'
import Swal from 'sweetalert2'
import { useAuthStore } from '@/stores/authStores'
import { API_URL_IMG100 } from "@/env";

const img100 = API_URL_IMG100
const auth = useAuthStore()

var nombre = "/usuario.png"
if (auth.imagen !== "usuario.png") {
  nombre = img100 + auth.imagen
}
const imagen = ref(nombre)


const { logout } = useAuth()
const { goToProfile } = useUser()

const confirmLogout = async () => {
  const result = await Swal.fire({
    title: '¿Desea salir del sistema?',
    icon: 'info',
    showDenyButton: true,
    confirmButtonText: 'Aceptar',
    denyButtonText: 'Cancelar',
  })

  if (result.isConfirmed) {
    logout()
  }
}
const profile = () => {
  goToProfile()
}

</script>
