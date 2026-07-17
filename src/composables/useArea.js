import { reactive, ref } from 'vue'
import { findByAllService, getEstructuraService, createDatosService } from '@/services/areaService'

export const useArea = () => {

    const loadingArea = ref(false)
    const errorArea = ref(null)
    const listaEstructura = ref([])
    const findByAllUse = async (value) => {
        try {
            const { data } = await findByAllService(value)
            return data
        } catch (errr) {
            errorArea.value = errr
            throw errr
        } finally {
            loadingArea.value = false
        }

    }
    const getEstructuraUse = async () => {
        loadingArea.value = true
        errorArea.value = null
        listaEstructura.value = []
        try {
            const { data } = await getEstructuraService()
            listaEstructura.value = data.map(item => ({
                idEstructura: item.idEstructura,
                prefijo: item.prefijo,
                codigo: item.codigo,
                departamento: item.departamento,
                tipo: item.tipo,
                costo: item.costo
            }))
        } catch (errr) {
            errorArea.value = errr
        } finally {
            loadingArea.value = false
        }
    }
    const createDatosUse = async (value) => {

        loadingArea.value = true
        errorArea.value = null
        const request = {
            "nivel": value.nivel,
            "nombre": value.nombre,
            "codigo": value.codigo
        }
        try {
            return await createDatosService(request)
        } catch (errr) {
            errorArea.value = errr
        } finally {
            loadingArea.value = false
        }
    }
    return {
        findByAllUse,
        getEstructuraUse,
        createDatosUse,
        listaEstructura,
        loadingArea,
        errorArea
    }

}