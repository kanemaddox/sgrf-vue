<template>
    <!-- ==================================================================== -->
    <!-- Tarjeta: Crear Solicitud de Fondos                                   -->
    <!-- ==================================================================== -->
    <CCol :xs="12" :sm="6" :md="4" :lg="3" v-if="pernicions?.crear_solicitud">
        <div class="d-md-none mb-3"></div>
        <CCard class="mb-4 mb-sm-0">
            <!-- Cabecera de la tarjeta con estilo limpio y profesional -->
            <CCardHeader class="headercolor">
                <i class="bi bi-file-earmark-text me-2"></i>
                <span class="text-white">Solicitud de Fondos</span>
            </CCardHeader>

            <!-- Cuerpo de la tarjeta con icono estilizado y espaciado adecuado -->
            <CCardBody class="text-center d-flex flex-column align-items-center justify-content-center py-4">
                <div class="icon-container mb-3 text-primary bg-light p-3 rounded-circle shadow-inner">
                    <i class="bi bi-file-earmark-text display-4"></i>
                </div>
                <p class="text-muted small mb-0 px-2">Crear Solicitud de Fondos</p>
            </CCardBody>

            <!-- Pie de tarjeta con botón destacado -->
            <CCardFooter class="text-center pb-3">
                <CButton color="primary" variant="outline" size="sm" class="w-75 rounded-pill shadow-sm py-2"
                    @click="getSrf">
                    <i class="bi bi-arrow-right-circle me-1"></i> Ingresar
                </CButton>
            </CCardFooter>
        </CCard>
    </CCol>

    <!-- ==================================================================== -->
    <!-- Tarjeta: Rendición de Gastos                                   -->
    <!-- ==================================================================== -->
    <CCol :xs="12" :sm="6" :md="4" :lg="3" v-if="pernicions?.crear_repocicion">
        <div class="d-md-none mb-3"></div>
        <CCard class="mb-4 mb-sm-0">
            <!-- Cabecera de la tarjeta con estilo limpio y profesional -->
            <CCardHeader class="headercolor">
                <i class="bi bi-file-earmark-text-fill me-2"></i>
                <span class="text-white">Rendicion de Gastos</span>
            </CCardHeader>

            <!-- Cuerpo de la tarjeta con icono estilizado y espaciado adecuado -->
            <CCardBody class="text-center d-flex flex-column align-items-center justify-content-center py-4">
                <div class="icon-container mb-3 text-warning bg-light p-3 rounded-circle shadow-inner">
                    <i class="bi bi-file-earmark-text-fill display-4"></i>
                </div>
                <p class="text-muted small mb-0 px-2">Crear Rendicion de Gastos</p>
            </CCardBody>

            <!-- Pie de tarjeta con botón destacado -->
            <CCardFooter class="text-center pb-3">
                <CButton color="warning" variant="outline" size="sm" class="w-75 rounded-pill shadow-sm py-2 text-dark"
                    @click="getRdg">
                    <i class="bi bi-arrow-right-circle me-1"></i> Ingresar
                </CButton>
            </CCardFooter>
        </CCard>
    </CCol>
</template>

<script setup>
const props = defineProps({
    pernicions: {
        type: Object,
        required: true
    }
})
import 'bootstrap-icons/font/bootstrap-icons.css'
</script>