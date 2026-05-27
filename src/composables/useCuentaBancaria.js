import { ref } from 'vue'
import {getCuentasBancariasService } from '@/services/cuentaBancariaService'

export const useCuentasBancarias = () =>{
    const loadingCuentaBancaria = ref(false)
    const errorCuentaBancaria = ref(null)

    const getCuentasBancariasUse = async (value) =>{
        loadingCuentaBancaria.value = true
        errorCuentaBancaria.value = null
        try{
            const {data} = await getCuentasBancariasService(value) 
            return data
        }catch(errr){
            errorCuentaBancaria.value = errr
            throw errr
        }finally{
            loadingCuentaBancaria.value = false
        }

    }

    return{
        getCuentasBancariasUse,
        loadingCuentaBancaria,
        errorCuentaBancaria
    }
}