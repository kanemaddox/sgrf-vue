<template>
    <!--Movile-->
    <div class="d-md-none mb-3">
        <CInputGroup size="sm" class="mb-3">
            <CInputGroupText class="headercolor" as="label">{{ datos.idpName }} :
            </CInputGroupText>
            <CFormInput type="text" :value="datos.idp" disabled />
        </CInputGroup>
        <CInputGroup size="sm" class="mb-3">
            <CInputGroupText class="headercolor" as="label">
            </CInputGroupText>
            <CFormInput type="text" :value="datos.nombre" disabled />
        </CInputGroup>

        <CInputGroup size="sm" class="mb-3">
            <CInputGroupText class="headercolor" as="label">Cargo : </CInputGroupText>
            <CFormInput type="text" :value="datos.cargo" disabled />
        </CInputGroup>
        <CInputGroup size="sm" class="mb-3">
            <CInputGroupText class="headercolor" as="label">Area : </CInputGroupText>
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
            <CInputGroupText class="headercolor" as="label">BANCO : </CInputGroupText>
            <CFormInput type="text" :value="datos.banco" disabled />
        </CInputGroup>

        <CInputGroup size="sm" class="mb-3">
            <CInputGroupText class="headercolor" as="label">Centro de Costos :
            </CInputGroupText>
            <CFormInput type="text" :value="datos.centrocostos" disabled />
        </CInputGroup>

        <CInputGroup size="sm" class="mb-3">
            <CInputGroupText class="headercolor" as="label">CC : </CInputGroupText>
            <CFormInput type="text" :value="datos.codigo" disabled />
        </CInputGroup>

    </div>
    <!--PC-->
    <div>
        <CInputGroup size="sm" class="mb-3 d-none d-md-flex">
            <CInputGroupText class="headercolor" as="label">Nombre Completo :
            </CInputGroupText>
            <CFormInput type="text" :value="datos.nombre" disabled />
            <CInputGroupText class="headercolor" as="label">{{ datos.idpName }} :
            </CInputGroupText>
            <CFormInput type="text" :value="datos.idp" disabled />
        </CInputGroup>

        <CInputGroup size="sm" class="mb-3 d-none d-md-flex">
            <CInputGroupText class="headercolor" as="label">Cargo : </CInputGroupText>
            <CFormInput type="text" :value="datos.cargo" disabled />
            <CInputGroupText class="headercolor" as="label">Area : </CInputGroupText>
            <CFormInput type="text" :value="datos.area" disabled />
        </CInputGroup>

        <CInputGroup size="sm" class="mb-3 d-none d-md-flex">
            <CInputGroupText class="headercolor" as="label">Tipo CTA. :
            </CInputGroupText>
            <CFormInput type="text" :value="datos.tipo" disabled />
            <CInputGroupText class="headercolor" as="label">No. CTA. :
            </CInputGroupText>
            <CFormInput type="text" :value="datos.cuenta" disabled />
            <CInputGroupText class="headercolor" as="label">BANCO : </CInputGroupText>
            <CFormInput type="text" :value="datos.banco" disabled />
        </CInputGroup>

        <CInputGroup size="sm" class="mb-3 d-none d-md-flex">
            <CInputGroupText class="headercolor" as="label">Centro de Costos :
            </CInputGroupText>
            <CFormInput type="text" :value="datos.centrocostos" disabled />
            <CInputGroupText class="headercolor" as="label">CC : </CInputGroupText>
            <CFormInput type="text" :value="datos.codigo" disabled />
        </CInputGroup>
    </div>
</template>

<script setup>
const props = defineProps({
    datos: {
        type: Object,
        required: true
    }
})
</script>