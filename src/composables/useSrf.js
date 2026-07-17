import { ref, reactive } from 'vue'
import { getSrfUsuarioService,updateSrfService, getSrfService, getSrfUsuarioEstadoService, createSrfService } from '@/services/srfService'

import { useAlert } from '@/composables/useAlert'
const { confirm, error, success } = useAlert()

import { useDto } from '@/composables/useDto'
const { getSRF } = useDto()

export const useSrf = () => {
    const loadingSrf = ref(false)
    const errorSrf = ref(null)
    const srf = reactive({})
    const createSrfUse = async (value) => {
        loadingSrf.value = true
        errorSrf.value = null
        const request = {
            "idUsuario": value.idUsuario,
            "tipo": '',
            "fechaSolicitud": value.fechaInicio,
            "fechaEstimada": value.fechaFin,
            "monto": value.monto,
            "moneda": value.moneda,
            "detalle": value.detalle,
            "campoTexto": value.texto,
            "campoNumerico": value.numerico,
            "cargo": value.cargo,
            "codigo": value.codigo,
            "centrocosto": value.costo,
            "formato":value.formato
        }
        const resultAlert = await confirm('Crear Solicitud', 'Desea crear y enviar la Solicitud ????', '')
        if (resultAlert.isConfirmed) {
            try {
                const resultService = await createSrfService(request)
                if (resultService.status == 201) {
                    await success('Well Done !!', 'Solicitud creada con exito, la solicitud se envio a su inmediato superior')
                    return true
                } else {
                    await error('Error !!!', 'Datos Incinsistentes', 'Revice e intente nuevamente')
                    return false
                }
            } catch (errr) {
                errorSrf.value = errr
                await error('Error !!!', 'Servicio No disponible', errr)
                return false
            } finally {
                loadingSrf.value = false
            }
        } else {
            await error('Error !!!!!', 'Datos Cancelados', '')
            return false
        }
    }

    const getSrfUsuarioEstadoUse = async (idUsuario, estado) => {
        loadingSrf.value = true
        errorSrf.value = null
        try {
            return await getSrfUsuarioEstadoService(idUsuario, estado)
        } catch (errr) {
            errorSrf.value = errr
            throw errr
        } finally {
            loadingSrf.value = false
        }
    }
    const getSrfUse = async (value) => {
        loadingSrf.value = true
        errorSrf.value = null
        try {
            const { data } = await getSrfService(value)
            Object.assign(srf, getSRF(data))
        } catch (errr) {
            errorSrf.value = errr
        } finally {
            loadingSrf.value = false
        }
    }
    const getSrfUsuarioUse = async (idSrf,persona) => {
        loadingSrf.value = true
        errorSrf.value = null
        try {
            const { data } = await getSrfUsuarioService(idSrf,persona)
            Object.assign(srf, getSRF(data))
        } catch (errr) {
            errorSrf.value = errr
        } finally {
            loadingSrf.value = false
        }
    }
    const updateSrfUse = async (value) => {
        loadingSrf.value = true
        errorSrf.value = null
        const response = {
            "id": value.id,
            "numero": '',
            "gestion": '',
            "fechaSolicitud": value.fechaFin,
            "fechaEstimada": '',
            "monto": value.monto,
            "moneda": value.moneda,
            "detalle": value.detalle,
            "campoTexto": value.texto,
            "campoNumerico": value.numerico,
            "tipo": '',
            "estado": 'PENDIENTE',
            "cargo": '',
            "centrocosto": '',
            "codigo": '',
            "cuenta": null,
            "empleado": null,
            "aprobadores": null,
            "formato":value.formato
        }
        const resultAlert = await confirm('Actualizar Solicitud', 'Esta seguro de actualizar el formulario', '')
        if (resultAlert.isConfirmed) {
            try {
                const resultService = await updateSrfService(response)
                if (resultService.status == 200 && resultService.data.id > 0) {
                    await success('Well Done!!!', 'Solicitud Actualizada Corectamente', '')
                    return true
                } else {
                    await error('Error !!!', 'Datos Inconsistentes, verifique e intente nuevamente', '')
                    return false
                }
            } catch (errr) {
                errorSrf.value = errr
                await error('Error !!!', 'Servicio No Disponible', errr)
                return false
            } finally {
                loadingSrf.value = false
            }
        } else {
            await error('Error !!!', 'Datos Cancelados', '')
            return false
        }
    }
    return {
        createSrfUse,
        getSrfUsuarioEstadoUse,
        getSrfUse,
        updateSrfUse,
        getSrfUsuarioUse,
        srf,
        loadingSrf,
        errorSrf
    }
}