import { ref } from 'vue'
import { findAllService } from '@/services/sucursalService'


export const useSucursal = () =>{
    const loadingSucursal = ref(false)
    const errorSucursal = ref(null)

    const findAllSucursalUse = async () =>{
        try{
            const {data} = await findAllService()
            return data
        }catch(errr){
            errorSucursal.value = errr
            throw errr
        }finally{
            loadingSucursal.value = false
        }
    }
    return{
        findAllSucursalUse,
        loadingSucursal,
        errorSucursal
    }

}
