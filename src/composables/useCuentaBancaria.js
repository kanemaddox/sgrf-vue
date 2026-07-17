import { ref } from 'vue'
import {getCuentasBancariasService } from '@/services/cuentaBancariaService'

export const useCuentasBancarias = () =>{
    const loadingCuentaBancaria = ref(false)
    const errorCuentaBancaria = ref(null)
    const listaBancaria = ref([])

    const getCuentasBancariasUse = async (value) =>{
        loadingCuentaBancaria.value = true
        errorCuentaBancaria.value = null
        listaBancaria.value = []
        try{
            const {data} = await getCuentasBancariasService(value) 
            listaBancaria.value = data.map(item => ({
                id: item.id,
                banco: item.banco.nombre,
                tipo: item.tipoCuenta,
                numero: item.numero,
                estado: item.estado
            }))
        }catch(errr){
            errorCuentaBancaria.value = errr
            throw errr
        }finally{
            loadingCuentaBancaria.value = false
        }

    }

    return{
        getCuentasBancariasUse,
        listaBancaria,
        loadingCuentaBancaria,
        errorCuentaBancaria
    }
}