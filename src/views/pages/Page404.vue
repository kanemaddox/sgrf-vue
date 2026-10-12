<template>
  <div class="wrapper min-vh-100 d-flex flex-row align-items-center">
    <CContainer>
      <CRow class="justify-content-center">
        <CCol :md="6">
          <div class="clearfix">
            <h1 class="float-start display-3 me-4">404</h1>
            <h4 class="pt-3">Oops! You're lost.</h4>
            <p class="text-body-secondary float-start">
              The page you are looking for was not found.
            </p>
          </div>
          <CInputGroup class="input-prepend">
            <CButton @click="login" color="primary" class="px-4">
              <CIcon icon="cil-user" class="me-2" />
              Pagina de Inicio
            </CButton>
          </CInputGroup>
        </CCol>
      </CRow>
    </CContainer>
  </div>
</template>
<script setup>

import { useRouter } from 'vue-router'
const router = useRouter()

const login=()=>{
    router.push({
        name: 'Home'
    })

}
</script>
