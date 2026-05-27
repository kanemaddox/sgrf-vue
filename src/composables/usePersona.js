import { ref } from 'vue'
import { updateCelularService } from '@/services/personaService'
import {getPersonaProfesionUsuarioService} from '@/services/personaProfesionService'

export const usePersona = () => {
    const loadingPersona = ref(false)
    const errorPersona = ref(null)

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
        try{
            return await updateCelularService(personaResponse)
        }catch(errr){
            errorPersona.value = err
            throw errr
        }finally{
            loadingPersona.value=false
        }
    }
    const getPersonaProfesionUsuarioUse = async (value) => {
        loadingPersona.value = true
        errorPersona.value = null
        try{
            const {data} = await getPersonaProfesionUsuarioService(value)
            return data
        }catch(errr){
            errorPersona.value = err
            throw errr
        }finally{
            loadingPersona.value=false
        }
    }

    return {
        updateCelularUse,
        getPersonaProfesionUsuarioUse,
        loadingPersona,
        errorPersona
    }

}