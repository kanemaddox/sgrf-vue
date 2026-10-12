import { ref, reactive } from 'vue'
import { useRouter } from 'vue-router'


import { getSrfEstadoService,getSrfUsuarioService, updateSrfService, getSrfService, getSrfUsuarioEstadoService, createSrfService } from '@/services/srfService'
import { getSrfPublicoService } from '@/services/publicoService'

import { useAlert } from '@/composables/useAlert'
const {confirm, error, success } = useAlert()

import { dtoSrf } from '@/composables/Dto/dtoSrf'
const { getSrf } = dtoSrf()

export const useSrf = () => {
    const loadingSrf = ref(false)
    const errorSrf = ref(null)
    const srf = reactive({})
    const listaSrf = ref([])
    const router = useRouter()
    const estado = reactive([])

    const createSrfUse = async (value) => {
        loadingSrf.value = true
        errorSrf.value = null
        const request = {
            "idPersona": value.idPersona,
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
            "formato": value.formato
        }
        const resultAlert = await confirm('Crear Formulario de Solicitud', 'Desea crear y enviar el Formulario de Solicitud de Fondos ?', '')
        if (resultAlert.isConfirmed) {
            try {
                const resultService = await createSrfService(request)
                if (resultService.status == 201) {
                    await success('Well Done !!', 'Formulario de Solicitud creada con exito, la solicitud se envio a su inmediato superior')
                    return true
                } else {
                    await error('Error !!!', 'Datos Incinsostentes', 'Revice e intente nuevamente')
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

    const getSrfUsuarioEstadoUse = async (idPersona, estado) => {
        loadingSrf.value = true
        errorSrf.value = null
        listaSrf.value = []
        try {
            const lista = await getSrfUsuarioEstadoService(idPersona, estado)
            listaSrf.value = lista.data.map(item => ({
                id: item.id,
                datos: {
                    numero: item.numero,
                    gestion: item.gestion,
                    monto: item.monto,
                    moneda: item.moneda,
                    tipo: item.tipo,
                    texto: item.campoTexto,
                    numerico: item.campoNumerico,
                    token:item.token,
                    fechaInicio: item.fechaSolicitud,
                },
                detalle: {
                    detalle: item.detalle,
                    fechaFin: item.fechaEstimada.split('T')[0],
                    monto: item.monto,
                    moneda: item.moneda,
                    fechaTitulo:item.fechaTitulo,
                    montoTitulo:item.montoTitulo,
                    aprobacion:item.aprobacion,
                },
                estado: {
                    estado: item.estado,
                    //lista: item.aprobadores,
                },
                acciones: {
                    id: item.token,
                    estado: item.estado
                }
            }))

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
    const getSrfUsuarioUse = async (idSrf, persona) => {
        loadingSrf.value = true
        errorSrf.value = null
        try {
            const { data } = await getSrfUsuarioService(idSrf, persona)
            Object.assign(srf, getSrf(data))
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
            "formato": value.formato
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
    const getSrfPublicoUse = async (value) => {
        loadingSrf.value = true
        errorSrf.value = null
        try {
            const { data } = await getSrfPublicoService(value)
            Object.assign(srf, getSrf(data))
        } catch (errr) {
            errorSrf.value = errr
            if (errr.response?.status === 404) {
                router.push({name:'Page404'})
            }
        } finally {
            loadingSrf.value = false
        }
    }
    const getSrfEstadoUse = async (idPersona)=>{
        loadingSrf.value = true
        errorSrf.value = null
        try {
            const { data } = await getSrfEstadoService(idPersona)
            Object.assign(estado, data)

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
        getSrfUsuarioUse,
        getSrfPublicoUse,
        getSrfEstadoUse,
        srf,
        estado,
        listaSrf,
        loadingSrf,
        errorSrf
    }
}