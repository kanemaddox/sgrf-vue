import { ref } from 'vue'
import {updateAprobacionService,getAprService, getPendientesService } from '@/services/aprobacionService'

export const useAprobacion = () =>{
    const loadingAprobacion = ref(false)
    const errorAprobacion = ref(null)
    const getPendientesUse = async (idUsuario,estado) => {
        try {
            const { data } = await getPendientesService(idUsuario,estado)
            return data
        } catch (errr) {
            errorAprobacion.value = errr
            throw errr
        } finally {
            loadingAprobacion.value = false
        }

    }
    const getAprUse = async (usuario,apr) => {
        try {
            const { data } = await getAprService(usuario,apr)
            return data
        } catch (errr) {
            errorAprobacion.value = errr
            throw errr
        } finally {
            loadingAprobacion.value = false
        }
    }
    const updateAprobacionUse = async (value) => {
        try {
            const updateRequest ={
                "id":value.idApr,
                "destino":value.destino,
                "estado":value.estado,
                "tipo":value.tipo,
                "idPersona":value.idPersona,
                "idSrf":value.idSrf,
                "obs":value.obs
            }
            return await updateAprobacionService(updateRequest)            
        } catch (errr) {
            errorAprobacion.value = errr
            throw errr
        } finally {
            loadingAprobacion.value = false
        }
    }
    return {
        getPendientesUse,
        getAprUse,
        updateAprobacionUse,
        loadingAprobacion,
        errorAprobacion
    }
}
