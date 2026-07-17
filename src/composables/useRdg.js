import { ref, reactive } from 'vue'
import { getRdgUsuarioService,getRdgUsuarioEstadoService, getRdgService} from '@/services/rdgService'

import { useAlert } from '@/composables/useAlert'
const { confirm, error, success } = useAlert()

import { useFunction } from '@/composables/useFunction'
const { getColor, getIcono, getEstado } = useFunction()

import { useDto } from '@/composables/useDto'
const { getRDG, getRdgCreate } = useDto()

export const useRdg = () => {
    const loadingRdg = ref(false)
    const errorRdg = ref(null)
    const listaRdg = ref([])
    const rdg = reactive({})

    const getRdgUsuarioEstadoUse = async (idUsuario, estado) => {
        loadingRdg.value = true
        errorRdg.value = null
        listaRdg.value = []
        try {
            const resultLista = await getRdgUsuarioEstadoService(idUsuario, estado)
            const lista = resultLista.data
            listaRdg.value = lista.map(item => ({
                id: item.id,
                datos: {
                    numero: item.numero,
                    gestion: item.gestion,
                    importe: item.importe,
                    moneda: item.moneda,
                },
                detalle: {
                    actividad: item.actividad,
                },
                estado: {
                    estado: item.estado,
                    color:getColor(estado),
                    icon:getIcono(estado)
                },
                acciones: {
                    id: item.id,
                    estado: item.estado
                }
            }))
        } catch (errr) {
            errorRdg.value = errr
        } finally {
            loadingRdg.value = false
        }
    }

    const getRdgUse = async (value) => {
        loadingRdg.value = true
        errorRdg.value = null
        try {
            const {data} = await getRdgService(value)
            Object.assign(rdg, getRDG(data))
        } catch (errr) {
            errorRdg.value = errr
        } finally {
            loadingRdg.value = false
        }
    }

    const getRdgUsuarioUse = async (idRdg,persona) => {
        loadingRdg.value = true
        errorRdg.value = null
        try {
            const {data} = await getRdgUsuarioService(idRdg,persona)
            Object.assign(rdg, getRdgCreate(data))
        } catch (errr) {
            errorRdg.value = errr
        } finally {
            loadingRdg.value = false
        }
    }

    return {
        getRdgUsuarioEstadoUse,
        getRdgUse,
        getRdgUsuarioUse,
        rdg,
        listaRdg,
        loadingRdg,
        errorRdg
    }

}