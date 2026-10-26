<template>
    <CAlert color="success">I. {{ valores.seccionUno }}</CAlert>
    <!--Movile-->
    <div class="d-md-none mb-3">
        <CInputGroup size="sm" class="mb-3">
            <CInputGroupText class="headercolor" as="label">
                <i class="bi bi-person-vcard me-2"></i>{{ datos.idpName }} :
            </CInputGroupText>
            <CFormInput type="text" :value="datos.idp" disabled />
        </CInputGroup>
        <CInputGroup size="sm" class="mb-3">
            <CInputGroupText class="headercolor" as="label">
            </CInputGroupText>
            <CFormInput type="text" :value="datos.nombre" disabled />
        </CInputGroup>

        <CInputGroup size="sm" class="mb-3">
            <CInputGroupText class="headercolor" as="label">
                <i class="bi bi-person-badge-fill me-2"></i>Cargo : 
            </CInputGroupText>
            <CFormInput type="text" :value="datos.cargo" disabled />
        </CInputGroup>
        <CInputGroup size="sm" class="mb-3">
            <CInputGroupText class="headercolor" as="label">
                <i class="bi bi-building me-2"></i>Area : 
            </CInputGroupText>
            <CFormInput type="text" :value="datos.area" disabled />
        </CInputGroup>

        <CInputGroup size="sm" class="mb-3">
            <CInputGroupText class="headercolor" as="label">Tipo CTA. :
            </CInputGroupText>
            <CFormInput type="text" :value="datos.tipo" disabled />

        </CInputGroup>
        <CInputGroup size="sm" class="mb-3">
            <CInputGroupText class="headercolor" as="label">No. CTA. :
            </CInputGroupText>
            <CFormInput type="text" :value="datos.cuenta" disabled />
        </CInputGroup>
        <CInputGroup size="sm" class="mb-3">
            <CInputGroupText class="headercolor" as="label">
                <i class="bi bi-bank me-2"></i>BANCO : 
            </CInputGroupText>
            <CFormInput type="text" :value="datos.banco" disabled />
        </CInputGroup>

        <CInputGroup size="sm" class="mb-3">
            <CInputGroupText class="headercolor" as="label">
                <i class="bi bi-person-rolodex me-2"></i>Centro de Costos :
            </CInputGroupText>
            <CFormInput type="text" :value="datos.centrocostos" disabled />
        </CInputGroup>

        <CInputGroup size="sm" class="mb-3">
            <CInputGroupText class="headercolor" as="label">
                <i class="bi bi-braces me-2"></i>CC : 
            </CInputGroupText>
            <CFormInput type="text" :value="datos.codigo" disabled />
        </CInputGroup>

    </div>
    <!--PC-->
    <div>
        <CInputGroup size="sm" class="mb-3 d-none d-md-flex">
            <CInputGroupText class="headercolor" as="label">
                <i class="bi bi-person me-2"></i>Nombre Completo :
            </CInputGroupText>
            <CFormInput type="text" :value="datos.nombre" disabled />
            <CInputGroupText class="headercolor" as="label">
                <i class="bi bi-person-vcard me-2"></i>{{ datos.idpName }} :
            </CInputGroupText>
            <CFormInput type="text" :value="datos.idp" disabled />
        </CInputGroup>

        <CInputGroup size="sm" class="mb-3 d-none d-md-flex">
            <CInputGroupText class="headercolor" as="label">
                <i class="bi bi-person-badge-fill me-2"></i>Cargo : 
            </CInputGroupText>
            <CFormInput type="text" :value="datos.cargo" disabled />
            <CInputGroupText class="headercolor" as="label">
                <i class="bi bi-building me-2"></i>Area : 
            </CInputGroupText>
            <CFormInput type="text" :value="datos.area" disabled />
        </CInputGroup>

        <CInputGroup size="sm" class="mb-3 d-none d-md-flex">
            <CInputGroupText class="headercolor" as="label">Tipo CTA. :
            </CInputGroupText>
            <CFormInput type="text" :value="datos.tipo" disabled />
            <CInputGroupText class="headercolor" as="label">No. CTA. :
            </CInputGroupText>
            <CFormInput type="text" :value="datos.cuenta" disabled />
            <CInputGroupText class="headercolor" as="label">
                <i class="bi bi-bank me-2"></i>BANCO : 
            </CInputGroupText>
            <CFormInput type="text" :value="datos.banco" disabled />
        </CInputGroup>

        <CInputGroup size="sm" class="mb-3 d-none d-md-flex">
            <CInputGroupText class="headercolor" as="label">
                <i class="bi bi-person-rolodex me-2"></i>Centro de Costos :
            </CInputGroupText>
            <CFormInput type="text" :value="datos.centrocostos" disabled />
            <CInputGroupText class="headercolor" as="label">
                <i class="bi bi-braces me-2"></i>CC : 
            </CInputGroupText>
            <CFormInput type="text" :value="datos.codigo" disabled />
        </CInputGroup>
    </div>
</template>

<script setup>
const props = defineProps({
    datos: {
        type: Object,
        required: true
    },
    valores:{
        type:Object,
        required:true
    }
})
// ============================================================================
// 1. IMPORTACIONES
// ============================================================================
import 'bootstrap-icons/font/bootstrap-icons.css'

// ============================================================================
// 2. INICIALIZACIÓN DE STORES, COMPOSABLES Y ROUTER
// ============================================================================

// ============================================================================
// 3. DATOS DEL USUARIO AUTENTICADO
// ============================================================================

// ============================================================================
// 4. DECLARACIONES DE VARIABLES
// ============================================================================

// ============================================================================
// 5. FUNCIONES DE NAVEGACIÓN
// ============================================================================

// ============================================================================
// 6. CICLO DE VIDA DEL COMPONENTE
// ============================================================================

// ============================================================================
// 7. CONFIGURACIÓN VISUAL
// ============================================================================
</script>