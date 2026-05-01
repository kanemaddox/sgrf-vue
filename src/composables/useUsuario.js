import { ref } from 'vue'
import { updateUsuarioImagenService, updatePassService } from '@/services/usuarioService'

export const useUsuario = () => {
    const loading = ref(false)
    const errorUse = ref(null)

    const updateUsuarioImagenUse = async (id, imagen) => {
        loading.value = true
        errorUse.value = null
        const usuarioResponse = {
            "id": id,
            "usuario": "",
            "password": "",
            "estado": true,
            "imagen": imagen,
            "fechaCreacion": "",
            "fechaActualizacion": ""
        }
        try {
            return await updateUsuarioImagenService(usuarioResponse)
        } catch (err) {
            errorUse.value = err
            throw err
        } finally {
            loading.value = false
        }
    }

    const updatePassUse = async (pass) => {
        loading.value = true
        errorUse.value = null
        var passRequest = {
            "id": pass.id,
            "pass1": pass.pass1,
            "pass2": pass.pass2,
            "pass3": pass.pass3,
        }
        try {
            const { data } = await updatePassService(passRequest)
            return data
        } catch (err) {
            errorUse.value = err
            throw err
        } finally {
            loading.value = false
        }
    }

    return {
        updatePassUse,
        updateUsuarioImagenUse,
        loading,
        errorUse
    }
}