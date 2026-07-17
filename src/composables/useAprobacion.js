import { ref, reactive } from 'vue'
import { updateAprobacionService, getAprService, getPendientesService } from '@/services/aprobacionService'

import { useDto } from '@/composables/useDto'
const { getSRFAprobacion } = useDto()

import { useAlert } from '@/composables/useAlert'
const { confirm, error, success } = useAlert()

export const useAprobacion = () => {
    const loadingAprobacion = ref(false)
    const errorAprobacion = ref(null)
    const srf = reactive({})


    /**Funciones para la Aprobacion de una solicitud */
    const getPendientesUse = async (idUsuario, estado) => {
        try {
            const { data } = await getPendientesService(idUsuario, estado)
            return data
        } catch (errr) {
            errorAprobacion.value = errr
            throw errr
        } finally {
            loadingAprobacion.value = false
        }

    }
    const getAprUse = async (usuario, apr) => {
        try {
            const { data } = await getAprService(usuario, apr)
            Object.assign(srf, getSRFAprobacion(data))
        } catch (errr) {
            errorAprobacion.value = errr
        } finally {
            loadingAprobacion.value = false
        }
    }
    const updateAprobacionUse = async (value,numero,monto,nombre,sms,titulo) => {
        const detail = 'Solicitud No. ' + numero + ', por ' + monto + ', Solicitado por ' + nombre
        const resultAlert = await confirm(titulo, detail, '')

        const updateRequest = {
            "id": value.idApr,
            "destino": value.destino,
            "estado": value.estado,
            "tipo": value.tipo,
            "idPersona": value.idPersona,
            "idSrf": value.idSrf,
            "obs": value.obs
        }
        if (resultAlert.isConfirmed) {
            try {
                const resultService = await updateAprobacionService(updateRequest)
                if (resultService.status==200) {
                    await success('Well Done!', sms, '')
                    return true
                } else {
                    await error('Error!!!', 'Datos Inconsistentes, Verifique e Intente', '')
                    return false
                }
            } catch (errr) {
                errorAprobacion.value = errr
                await error('Error!!!!', 'Servicio no Disponible', '')
                return false
            } finally {
                loadingAprobacion.value = false
            }
        } else {
            await error('Datos Cancelados !!!!!!', detail, '')
            return false
        }

    }
    return {
        getPendientesUse,
        getAprUse,
        updateAprobacionUse,
        srf,
        loadingAprobacion,
        errorAprobacion
    }
}
