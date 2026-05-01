import { ref } from 'vue'
import { updateCelularService } from '@/services/personaService'

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
            throw err
        }finally{
            loadingPersona.value=false
        }
    }

    return {
        updateCelularUse,
        loadingPersona,
        errorPersona
    }

}