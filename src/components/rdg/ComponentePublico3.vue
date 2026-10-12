<template>

    <CRow class="table-responsive">
        <CTable small hover responsive>
            <CTableHead color="dark">
                <CTableRow>
                    <CTableHeaderCell scope="col">#</CTableHeaderCell>
                    <CTableHeaderCell scope="col">Doc.</CTableHeaderCell>
                    <CTableHeaderCell scope="col">Datos</CTableHeaderCell>
                    <CTableHeaderCell scope="col" :style="{ minWidth: '200px' }">Detalle</CTableHeaderCell>
                    <CTableHeaderCell scope="col">Importe</CTableHeaderCell>
                </CTableRow>
            </CTableHead>
            <CTableBody>
                <CTableRow v-for="(value, index) in datos.factura" :key="value.idDetalle" style="cursor: pointer;"
                    @click="getSeccion">
                    <CTableHeaderCell scope="row">{{ index + 1 }}</CTableHeaderCell>
                    <CTableDataCell>
                        <img :src="getImage(value.archivo)" class="img-fluid " alt="...">
                    </CTableDataCell>
                    <CTableDataCell>
                        <div class="small text-body-secondary text-nowrap">
                            <span><strong>Fecha : </strong>{{ fecha(value.fecha) }}</span><br>
                            <span><strong>Tipo Gasto : </strong>{{ value.cuenta.tipo }}</span> <br>
                            <span><strong>Tipo Doc. : </strong>{{ value.documento }}</span><br>
                        </div>
                    </CTableDataCell>
                    <CTableDataCell>{{ value.detalle }}</CTableDataCell>
                    <CTableDataCell> <span class="text-nowrap">{{ formatearNumero(value.importe) }} {{ datos.moneda }}</span></CTableDataCell>
                </CTableRow>

                <CTableRow active>
                    <CTableHeaderCell scope="row" colspan="3" active>TOTAL GASTOS
                        REALIZADOS
                    </CTableHeaderCell>
                    <CTableDataCell colspan="2" class="text-end">
                        <label class="total ">{{ formatearNumero(datos.gasto) }} {{ datos.moneda }} </label>
                    </CTableDataCell>
                </CTableRow>

                <CTableRow active>
                    <CTableHeaderCell scope="row" colspan="3" active>SALDO
                    </CTableHeaderCell>
                    <CTableDataCell colspan="2" class="text-end">
                        <label class="total">{{ formatearNumero(datos.saldo) }} {{ datos.moneda }}</label>
                    </CTableDataCell>
                </CTableRow>

            </CTableBody>
        </CTable>
    </CRow>
    <CRow>
        <CAlert v-if="datos.rembolso > 0" class="text-end">
            Fondos por reembolsar
            <CChip variant="outline" color="success">
                <label class="total">{{ formatearNumero(datos.rembolso) }}</label> {{ datos.moneda }}
            </CChip>
        </CAlert>

        <CAlert v-if="datos.devolver > 0" class="text-end">
            Fondos por devolver a la oficina
            <CChip variant="outline" color="danger">
                <label class="total">{{ formatearNumero(datos.devolver) }}</label> {{ datos.moneda }}
            </CChip>
        </CAlert>
    </CRow>

</template>

<script setup>
const props = defineProps({
    datos: {
        type: Object,
        required: true
    }
})

import { useAlert } from '@/composables/useAlert'
const { error} = useAlert()

import { useFunction } from '@/composables/useFunction'
const { formatearNumero } = useFunction()

import { API_FILE_IMG100 } from "@/env"
const img100 = API_FILE_IMG100

const getImage = (value) => {
    return value === 'ninguno' ? '/sn100.png' : img100 + value + '.jpg'
}
const fecha = (value) => {
    return value.split('T')[0]
}
const getSeccion = async() => {
    await error('Error','Debe de Iniciar Secion para ver el Detalle','')
}
</script>