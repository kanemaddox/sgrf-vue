import { ref, reactive } from 'vue'
import { updateAprobacionService, getAprService, getSrfEstadoService } from '@/services/Aprobacion/srfService'

import { dtoSrf } from '@/composables/Dto/dtoSrf'
const { getSrfAprobacion } = dtoSrf()

import { useAlert } from '@/composables/useAlert'
const { confirm, error, success } = useAlert()

import { API_URL_IMG100 } from "@/env"
const img100 = API_URL_IMG100


export const useApSrf = () => {
    const loadingAprobacion = ref(false)
    const errorAprobacion = ref(null)
    const srf = reactive({})
    const listaSrf = ref([])


    /**Funciones para la Aprobacion de una solicitud */
    const getSrfEstadoUse = async (idPersona, estado) => {
        loadingAprobacion.value = true
        errorAprobacion.value = null
        listaSrf.value = []
        try {
            const lista = await getSrfEstadoService(idPersona, estado)
            listaSrf.value = lista.data.map(item => ({
                id: item.id,
                datos: {
                    idp: item.idp,
                    nombre: item.nombre,
                },
                imagen: {
                    foto: item.foto === 'usuario.png' ? '/usuario.png' : img100 + item.foto
                },
                formulario: {
                    idp: item.idp,
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
                },
                estado: item.estado,
                acciones: {
                    token:item.token,
                    estado:item.estado,
                }
            }))
        } catch (errr) {
            errorAprobacion.value = errr
            throw errr
        } finally {
            loadingAprobacion.value = false
        }

    }
    const getAprUse = async (persona, apr) => {
        try {
            const { data } = await getAprService(persona, apr)
            Object.assign(srf, getSrfAprobacion(data))
        } catch (errr) {
            errorAprobacion.value = errr
        } finally {
            loadingAprobacion.value = false
        }
    }
    const updateAprobacionUse = async (value, numero, monto, nombre, sms, titulo) => {
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
                if (resultService.status == 200) {
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
        getSrfEstadoUse,
        getAprUse,
        updateAprobacionUse,
        srf,
        listaSrf,
        loadingAprobacion,
        errorAprobacion
    }
}
