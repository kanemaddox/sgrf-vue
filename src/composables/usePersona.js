import { ref } from 'vue'
import { updateCelularService } from '@/services/personaService'
import { getPersonaProfesionUsuarioService } from '@/services/personaProfesionService'
import { useAlert } from '@/composables/useAlert'
const { confirm, success, error } = useAlert()

export const usePersona = () => {
    const loadingPersona = ref(false)
    const errorPersona = ref(null)
    const listaProfesiones = ref([])

    const updateCelularUse = async (persona) => {
        loadingPersona.value = true
        errorPersona.value = null
        const personaResponse = {
            "id": persona.id,
            "idp": "",
            "nombre": "",
            "paterno": "",
            "materno": "",
            "email": "",
            "fechaNacimiento": "",
            "sexo": "",
            "celular": persona.celular,
            "fechaCreacion": "",
            "fechaActualizacion": ""
        }
        const resultAlert = await confirm('Actualizar Datos', 'Desea Actualizar el numero de Celular ?', '')
        if (resultAlert.isConfirmed) {
            try {
                const resultservice = await updateCelularService(personaResponse)
                if(resultservice.status === 200){
                    await success ('Well Done!!!!!', 'Registro Actualizado Corectamente','')
                    return true
                }
                else{
                    await error('Error !!!','Datos Incorectos Verifique e Intente mas tarde','')
                    return false
                }
                
            } catch (errr) {
                errorPersona.value = errr
                await error ('Error !!!!','Servicio no Disponible',errr)
                return false
            } finally {
                loadingPersona.value = false
            }
        }
        else {
            await error ('Error !!!','Datos Cancelados','','')
            return false
        }
    }
    const getPersonaProfesionUsuarioUse = async (value) => {
        loadingPersona.value = true
        errorPersona.value = null
        listaProfesiones.value = []
        try {
            const { data } = await getPersonaProfesionUsuarioService(value)
            listaProfesiones.value = data.map(item => ({
                id: item.id,
                profesion: item.profesion,
                estado: item.estado,
                del: item.fechaCreacion,
                al: item.fechaActualizacion
            }))
        } catch (errr) {
            errorPersona.value = errr
            throw errr
        } finally {
            loadingPersona.value = false
        }
    }

    return {
        updateCelularUse,
        getPersonaProfesionUsuarioUse,
        listaProfesiones,
        loadingPersona,
        errorPersona
    }

}