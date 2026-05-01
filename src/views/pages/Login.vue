<template>
  <div class="wrapper min-vh-100 d-flex flex-row align-items-center">
    <CContainer>
      <CRow class="justify-content-center">
        <CCol :md="8">
          <CCardGroup>
            <CCard class="p-4">
              <CCardBody>
                <CForm @submit.prevent="onSubmit">
                  <h1 class="text-center">Iniciar Sesión</h1>
                  <p class="text-body-secondary text-center">Inicia sesión en tu cuenta</p>
                  <CInputGroup class="mb-3">
                    <CInputGroupText>
                      <CIcon icon="cil-user" />
                    </CInputGroupText>
                    <CFormInput v-model="loginRequest.username" placeholder="Username" autocomplete="username" />
                  </CInputGroup>
                  <CInputGroup class="mb-4">
                    <CInputGroupText>
                      <CIcon icon="cil-lock-locked" />
                    </CInputGroupText>
                    <CFormInput v-model="loginRequest.password" type="password" placeholder="Password"
                      autocomplete="current-password" />
                  </CInputGroup>
                  <!-- ERROR -->
                  <p v-if="error" class="text-danger text-center">
                    {{ error }}
                  </p>

                  <CRow class="text-center">
                    <CCol :xs="12" :sm="6">
                      <CButton type="submit" color="primary" class="px-4" :disabled="loading">
                        {{ loading ? 'Cargando...' : 'Iniciar Sesión' }}
                      </CButton>
                    </CCol>
                    <CCol :xs="12" :sm="6" class="text-right">
                      <CButton color="link" class="px-0">
                        Forgot password?
                      </CButton>
                    </CCol>
                  </CRow>
                </CForm>
              </CCardBody>
            </CCard>
            <CCard class="text-white py-5 login-card">
              <CCardBody class="text-center">
                <div>
                  <h2>SGRF</h2>
                  <p>
                    Bienvenido al Sistema de Gestión de Solicitud y Reposición de Fondos. Inicie sesión para administrar
                    sus solicitudes y controlar sus recursos de forma rápida y segura.
                  </p>
                  <CButton color="light" variant="outline" class="mt-3">
                    Regístrate Ahora!
                  </CButton>
                </div>
              </CCardBody>
            </CCard>
          </CCardGroup>
        </CCol>
      </CRow>
    </CContainer>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { reactive } from 'vue'
import { useRouter } from 'vue-router'
import { useAuth } from '@/composables/useAuth'


const router = useRouter()
const { login, loading } = useAuth()

const error = ref(null) 

const loginRequest = reactive({
  username:'',
  password:''
})

const onSubmit = async () => {
  error.value = null // limpiar error previo
  const ok = await login(loginRequest)

  if (ok) {
    router.push({ name: 'Dashboard' })
  } else {
    error.value = 'Usuario o contraseña incorrectos'
  }
}
</script>