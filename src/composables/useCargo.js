import { ref } from 'vue'
import { getCargoUsuarioService } from '@/services/cargoService'

export const useCargo = () => {
    const loadingCargo = ref(false)
    const errorCargo = ref(null)

    const getCargoUsuarioUse = async (value)=>{
        loadingCargo.value=true
        errorCargo.value=null
        try{
            const { data } = await getCargoUsuarioService(value)
            return  data
        }catch(errr){
            errorCargo.value=errr
            throw errr

        }finally{
            loadingCargo.value=false
        }
    }
    return {
        getCargoUsuarioUse,
        loadingCargo,
        errorCargo
    }

}
