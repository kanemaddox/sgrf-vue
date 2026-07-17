<template>
    <CRow>
        <!--Lista de Centros de Costo-->

        <CCol :xs="12" :sm="6" :md="6" :lg="6" v-for="(value, index) in listaEstructura" :key="index">
            <br />
            <CCard>
                <CCardHeader class="headercolor">
                    <i class="bi bi-list-task me-2"></i>
                    <label class="mb-0 fs-6 text-white">{{ value.departamento }} | {{ value.codigo }}</label>
                </CCardHeader>
                <CCardBody>
                    <ul v-for="(item, id) in value.costo" :key="id">
                        <li>{{ item.codigo }} | {{ item.departamento }} </li>
                        <ul v-for="(sub, idsub) in item.sub" :key="idsub">
                            <li class="small text-body-secondary">{{sub.codigo}} | {{ sub.departamento }}</li>
                        </ul>
                    </ul>
                </CCardBody>
                <CCardFooter class="text-center">
                    <CButton color="secondary" variant="outline" size="sm">
                        <i class="bi bi-list-task me-2"></i> Ver Lista
                    </CButton>
                </CCardFooter>
            </CCard>
        </CCol>

        <!--End Lista de Centros de Costo-->
    </CRow>
</template>

<script setup>
import 'bootstrap-icons/font/bootstrap-icons.css'
import { reactive, ref, onMounted, watch } from 'vue'

import { useArea } from '@/composables/useArea'
const { getEstructuraUse, listaEstructura } = useArea()

onMounted(async () => {
    const tooltips = document.querySelectorAll('.tooltip');
    tooltips.forEach(tooltip => tooltip.remove());
    await getEstructuraUse()
})

</script>