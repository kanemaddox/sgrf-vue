import { ref, reactive } from 'vue'
import {updateAprobacionRdgService, getRdgRevisarService, getEstadoRdgService } from '@/services/Aprobacion/rdgService'

import { dtoRdg } from '@/composables/Dto/dtoRdg'
const { getRdgRevisar } = dtoRdg()

import { useAlert } from '@/composables/useAlert'
const { confirm, error, success } = useAlert()

import { useFunction } from '@/composables/useFunction'
const { formatearNumero, getColor, getIcono } = useFunction()

import { API_URL_IMG100, API_URL_IMG200, API_URL_IMG800 } from "@/env"
const img200 = API_URL_IMG200
const img800 = API_URL_IMG800
const img100 = API_URL_IMG100

export const useAprobacionRdg = () => {
    const loadingAprobacion = ref(false)
    const errorAprobacion = ref(null)
    const listaRdg = ref([])
    const rdg = reactive({})


    /**Funciones para la Aprobacion de una solicitud */
    const getEstadoRdgUse = async (idPersona, estado) => {
        loadingAprobacion.value = true
        errorAprobacion.value = null
        try {
            const resultLista = await getEstadoRdgService(idPersona, estado)
            listaRdg.value = resultLista.data.map(item => ({
                id: item.id,
                formulario: {
                    detalle:item.detalle,
                    numero: item.numero,
                    idp:item.idp,
                    gestion: item.gestion,
                    gasto: formatearNumero(item.gasto),
                    importe:formatearNumero(item.importe),
                    moneda: item.moneda,
                    fecha: item.fecha,
                },
                solicitante: {
                    idp: item.idp,
                    nombre: item.nombre,
                },
                imagen: {
                    foto: item.foto === 'usuario.png' ? '/usuario.png' : API_URL_IMG100 + item.foto
                },
                estado: item.estado,
                acciones: item.token
            }))
        } catch (errr) {
            errorAprobacion.value = errr
            throw errr
        } finally {
            loadingAprobacion.value = false
        }
    }
    const getRdgRevisarUse = async (idPersona, idRdg) => {
        loadingAprobacion.value = true
        errorAprobacion.value = null
        try {
            const { data } = await getRdgRevisarService(idPersona, idRdg)
            Object.assign(rdg, getRdgRevisar(data))
        } catch (errr) {
            errorAprobacion.value = errr
            throw errr
        } finally {
            loadingAprobacion.value = false
        }
    }

    const updateAprobacionRdgUse = async (idPersona, rdg,obs,estado, sms) => {
        loadingAprobacion.value = true
        errorAprobacion.value = null
        const response = {
            "idAprobacion":rdg.idAprobacion,
            "idPersona":idPersona,
            "idRdg":rdg.idRdg,
            "obs":obs,
            "estado":estado,
            "destino":rdg.destinoAprobacion,
            "factura":rdg.factura
        }
        const resultAlert = await confirm(sms.titulo,sms.detalle, '')
        if (resultAlert) {
            try {
                const resultService = await updateAprobacionRdgService(response)
                if (resultService.status == 200) {
                    await success('Well Done !!', 'Formulario de rendicion de cuentas Aprobada con exito, el formulario se envio a su inmediato superior')
                    return true
                } else {
                    await error('Error !!!', 'Datos Inconsistentes', 'Revice e intente nuevamente')
                    return false
                }
            } catch (errr) {
                errorAprobacion.value = errr
                await error('Error !!!!!', 'Servicio No disponible', errr)
                return false
            } finally {
                loadingAprobacion.value = false
            }
        } else {
            await error('Error !!!!!', 'Datos Cancelados', '')
            return false
        }
    }
    return {
        getEstadoRdgUse,
        getRdgRevisarUse,
        updateAprobacionRdgUse,
        listaRdg,
        rdg,
        loadingAprobacion,
        errorAprobacion
    }
}
