import { ref } from 'vue'
import { findAllService } from '@/services/centroCostosService'


export const useCentroCostos = () =>{
    const loadingCentro = ref(false)
    const errorCentro = ref(null)

    const findAllCentroCostosUse = async () =>{
        try{
            const {data} = await findAllService()
            return data
        }catch(errr){
            errorCentro.value = errr
            throw errr
        }finally{
            loadingCentro.value = false
        }
    }
    return{
        findAllCentroCostosUse,
        loadingCentro,
        errorCentro
    }

}
