import { ref } from 'vue'

import { updateCorreoService,getPersonaService, findByTipoService } from '@/services/empleadoService'
import { getEmpleadoCargoUsuarioService } from '@/services/empleadoCargoService'
import { useAlert } from '@/composables/useAlert'
const { confirm, success, error } = useAlert()

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
    const updateCorreoUse = async (persona) => {
        loadingEmpleado.value = true
        errorEmpleado.value = null
        const personaResponse = {
            "id": persona.id,
            "idp": "",
            "nombre": "",
            "paterno": "",
            "materno": "",
            "email": persona.correo,
            "fechaNacimiento": "",
            "sexo": "",
            "celular": "",
            "fechaCreacion": "",
            "fechaActualizacion": ""
        }
        const resultAlert = await confirm('Actualizar Datos', 'Desea Actualizar el numero de Correo ?', '')
        if (resultAlert.isConfirmed) {
            try {
                const resultservice = await updateCorreoService(personaResponse)
                if(resultservice.status === 200){
                    await success ('Well Done!!!!!', 'Registro Actualizado Corectamente','')
                    return true
                }
                else{
                    await error('Error !!!','Datos Incorectos Verifique e Intente mas tarde','')
                    return false
                }
                
            } catch (errr) {
                errorEmpleado.value = errr
                await error ('Error !!!!','Servicio no Disponible',errr)
                return false
            } finally {
                loadingEmpleado.value = false
            }
        }
        else {
            await error ('Error !!!','Datos Cancelados','','')
            return false
        }
    }
    return {
        getPersonaUse,
        findByTipoUse,
        getEmpleadoCargoUsuarioUse,
        updateCorreoUse,
        listaCargos,
        listaJefes,
        loadingEmpleado,
        errorEmpleado
    }
}