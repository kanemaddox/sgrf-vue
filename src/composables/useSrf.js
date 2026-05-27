import { ref } from 'vue'
import {updateSrfService,getSrfService,getSrfUsuarioEstadoService, createSrfService } from '@/services/srfService'

export const useSrf = () => {
    const loadingSrf = ref(false)
    const errorSrf = ref(null)

    const createSrfUse = async (value) => {
        loadingSrf.value = true
        errorSrf.value = null
        const request ={
            "idUsuario":value.idUsuario,
            "tipo":'',
            "fechaSolicitud":value.fechaInicio,
            "fechaEstimada":value.fechaFin,
            "monto":value.monto,
            "moneda":value.moneda,
            "detalle":value.detalle,
            "campoTexto":value.texto,
            "campoNumerico": value.numerico,
            "cargo":value.cargo,
            "codigo":value.codigo,
            "centrocosto":value.costo
        }
        try {
            return await createSrfService(request)
        } catch (errr) {
            errorSrf.value = errr
            throw errr
        } finally {
            loadingSrf.value = false
        }
    }

    const getSrfUsuarioEstadoUse = async (idUsuario,estado) => {
        loadingSrf.value = true
        errorSrf.value = null
        try {
            return  await getSrfUsuarioEstadoService(idUsuario,estado)
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
            const {data} =await getSrfService(value)
            return  data
        } catch (errr) {
            errorSrf.value = errr
            throw errr
        } finally {
            loadingSrf.value = false
        }
    }
    const updateSrfUse = async (value) => {
        loadingSrf.value = true
        errorSrf.value = null
        try {
            const response = {
                "id":value.id,
                "numero":'',
                "gestion":'',
                "fechaSolicitud":value.fechaFin,
                "fechaEstimada":'',
                "monto":value.monto,
                "moneda":value.moneda,
                "detalle":value.detalle,
                "campoTexto":value.texto,
                "campoNumerico":value.numerico,
                "tipo":'',
                "estado":'PENDIENTE',
                "cargo":'',
                "centrocosto":'',
                "codigo":'',
                "cuenta":null,
                "empleado":null,
                "aprobadores":null,
            }
            return await updateSrfService(response)
        } catch (errr) {
            errorSrf.value = errr
            throw errr
        } finally {
            loadingSrf.value = false
        }
    }
    return {
        createSrfUse,
        getSrfUsuarioEstadoUse,
        getSrfUse,
        updateSrfUse,
        loadingSrf,
        errorSrf
    }
}