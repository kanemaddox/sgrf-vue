import {ref} from 'vue'

import { getPersonaService, findByTipoService } from '@/services/empleadoService'
import { getEmpleadoCargoUsuarioService } from '@/services/empleadoCargoService'

export const useEmpleado = () =>{
    const loadingEmpleado = ref(false)
    const errorEmpleado = ref(null)
    const listaCargos = ref([])

    const getPersonaUse = async (value) =>{
        loadingEmpleado.value = true
        errorEmpleado.value = null
        try{
            return await getPersonaService(value)
        }catch(errr){
            errorEmpleado.value = errr
            throw errr
        }finally{
            loadingEmpleado.value = false
        }

    }

    const findByTipoUse = async (value) =>{
        loadingEmpleado.value = true
        errorEmpleado.value = null
        try{
            const {data} = await findByTipoService(value)
            return  data
        }catch(errr){
            errorEmpleado.value = errr
            throw errr
        }finally{
            loadingEmpleado.value = false
        }
    }
    const getEmpleadoCargoUsuarioUse = async (value) =>{
        loadingEmpleado.value = true
        errorEmpleado.value = null
        listaCargos.value = []
        try{
            const {data} = await getEmpleadoCargoUsuarioService(value)
            listaCargos.value = data.map(item => ({
                id: item.id,
                cargo: item.cargo,
                estado: item.estado,
                idpJefe: item.idpJefe,
                jefe: item.jefe,
                del: item.fechaCreacion,
                al: item.fechaActualizacion
            }))
            return data
        }catch(errr){
            errorEmpleado.value = errr
            throw errr
        }finally{
            loadingEmpleado.value = false
        }

    }
    return {
        getPersonaUse,
        findByTipoUse,
        getEmpleadoCargoUsuarioUse,
        listaCargos,
        loadingEmpleado,
        errorEmpleado
    }
}