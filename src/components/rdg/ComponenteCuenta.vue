<template>
    <CRow class="table-responsive">
        <CTable small hover responsive>
            <CTableHead color="dark">
                <CTableRow>
                    <CTableHeaderCell scope="col">#</CTableHeaderCell>
                    <CTableHeaderCell scope="col" :style="{ minWidth: '200px' }">Tipo Gastos</CTableHeaderCell>
                    <CTableHeaderCell scope="col">Cuenta</CTableHeaderCell>
                    <CTableHeaderCell scope="col" :style="{ minWidth: '200px' }">Nombre de Cuenta</CTableHeaderCell>
                    <CTableHeaderCell scope="col">Total</CTableHeaderCell>
                </CTableRow>
            </CTableHead>
            <CTableBody>
                <CTableRow v-for="(value, index) in listaCuentas" :key="value.cuenta">
                    <CTableHeaderCell scope="row">{{ index + 1 }}</CTableHeaderCell>
                    <CTableDataCell>
                        {{ value.cuenta }}
                    </CTableDataCell>
                    <CTableDataCell><span class="text-nowrap">
                        {{ value.codigo }}</span>
                    </CTableDataCell>
                    <CTableDataCell>
                        RG-{{ datos.numero }} {{ value.detalle }}
                    </CTableDataCell>
                    <CTableDataCell class="text-end">
                        <span class="text-nowrap">{{ formatearNumero(value.total) }} {{ datos.moneda }}</span>
                    </CTableDataCell>
                </CTableRow>

                <CTableRow v-for="(value, index) in datos.resumen" :key="index">
                    <CTableHeaderCell>{{ index + listaCuentas.length + 1 }}</CTableHeaderCell>
                    <CTableDataCell>{{ value.tipo }}</CTableDataCell>
                    <CTableDataCell>{{ value.cuenta }}</CTableDataCell>
                    <CTableDataCell>RG-{{ datos.numero }} {{ value.glosa }} </CTableDataCell>
                    <CTableDataCell class="text-end">
                        <span class="text-nowrap">
                            {{ formatearNumero(value.total * -1) }} {{datos.moneda }}
                        </span>
                    </CTableDataCell>
                </CTableRow>

            </CTableBody>
        </CTable>
    </CRow>

</template>

<script setup>
const props = defineProps({
    datos: {
        type: Object,
        required: true
    }
})

import 'bootstrap-icons/font/bootstrap-icons.css'
import { ref, reactive, watch, computed } from 'vue'

import { useFunction } from '@/composables/useFunction'
const { formatearNumero } = useFunction()

const listaCuentas = computed(() => {
    const listaFacturas = props.datos?.factura || []

    const agrupado = listaFacturas.reduce((acumulador, factura) => {
        const gasto = factura.cuenta.tipo
        const codigo = factura.cuenta.cuenta
        const detalle = factura.cuenta.glosa
        const importe = Number(factura.importe)

        const clave = `${gasto}|${codigo}|${detalle}`

        if (!acumulador[clave]) {
            acumulador[clave] = 0
        }
        acumulador[clave] += importe

        return acumulador
    }, {})

    return Object.entries(agrupado).map(([clave, totalImporte]) => {
        const [cuenta, codigo, detalle] = clave.split('|')
        return {
            cuenta: cuenta,
            codigo: codigo,
            detalle: detalle,
            total: totalImporte
        }
    })
})

</script>