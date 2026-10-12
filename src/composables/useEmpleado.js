import { ref } from 'vue'

import { getPersonaService, findByTipoService } from '@/services/empleadoService'
import { getEmpleadoCargoUsuarioService } from '@/services/empleadoCargoService'

import { API_URL_IMG100 } from "@/env"
const img100 = API_URL_IMG100

export const useEmpleado = () => {
    const loadingEmpleado = ref(false)
    const errorEmpleado = ref(null)
    const listaCargos = ref([])
    const listaJefes = ref([])

    const getPersonaUse = async (value) => {
        loadingEmpleado.value = true
        errorEmpleado.value = null
        try {
            return await getPersonaService(value)
        } catch (errr) {
            errorEmpleado.value = errr
            throw errr
        } finally {
            loadingEmpleado.value = false
        }

    }

    const findByTipoUse = async (value) => {
        loadingEmpleado.value = true
        errorEmpleado.value = null
        listaJefes.value = []
        try {
            const { data } = await findByTipoService(value)
            listaJefes.value = data.map(item => ({
                id: item.id,
                imagen: {
                    foto: item.persona?.foto === 'usuario.png' ? '/usuario.png' : img100 + item.persona?.foto,
                    estado: item.estado ? 'success' : 'danger',
                },
                datos: {
                    idp: item.persona?.idp,
                    nombre: item.persona?.nombre,
                    apellido: item.persona?.paterno + " " + item.persona?.materno,
                    email: item.persona?.email,
                    celular: item.persona?.celular,
                },
                estado: item.estado,
                acciones: item.id,
            }))
        } catch (errr) {
            errorEmpleado.value = errr
            throw errr
        } finally {
            loadingEmpleado.value = false
        }
    }
    const getEmpleadoCargoUsuarioUse = async (value) => {
        loadingEmpleado.value = true
        errorEmpleado.value = null
        listaCargos.value = []
        try {
            const { data } = await getEmpleadoCargoUsuarioService(value)
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
        } catch (errr) {
            errorEmpleado.value = errr
            throw errr
        } finally {
            loadingEmpleado.value = false
        }

    }
    return {
        getPersonaUse,
        findByTipoUse,
        getEmpleadoCargoUsuarioUse,
        listaCargos,
        listaJefes,
        loadingEmpleado,
        errorEmpleado
    }
}