import { ref, reactive } from 'vue'

/**Declaraciones para alertas */
import { useAlert } from '@/composables/useAlert'
const { confirm, success, error } = useAlert()
/**End Declaraciones para alertas */

import { useDto } from '@/composables/useDto'
const { getPerfil, getPersona,getPerfilCuenta } = useDto()

/**Declaraciones para Servicios */
import {getPerfilService, updateUsuarioRolService, findByRolService, updateUsuarioPernicionsService, getUsuarioValidoService, getDatosEmpleadosService, updateUsuarioImagenService, updatePassService, addDatosService, findAllResponseService, getDatosService, getDatosUsuarioService, updatePasswordService, setEstadoService, getEmpleadosFileService } from '@/services/usuarioService'


import { API_URL_IMG100, API_URL_IMG200, API_URL_IMG800 } from "@/env"
const img200 = API_URL_IMG200
const img800 = API_URL_IMG800
const img100 = API_URL_IMG100

export const useUsuario = () => {
    const loading = ref(false)
    const errorUse = ref(null)
    const personaUsuario = reactive({})
    const perfilUsuario = reactive({})
    const perfilCuenta = reactive({})

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
        const resultAlert = await confirm('Foto de Perfil', 'Desea Subir su foto de perfil ?', '')
        if (resultAlert.isConfirmed) {
            try {
                const resultService = await updateUsuarioImagenService(usuarioResponse)
                if (resultService.status === 200) {
                    await success('Operación Exitosa !!!', 'La Foto de Perfil fue guardado correctamente')
                    return true
                }
                else {
                    await error('Error !!!!!', 'No se pudo guardar la Foto de Perfil, Verifique e Intente Mas tarde', '')
                    return false
                }
            } catch (err) {
                errorUse.value = err
                await error('Error !!!!!', 'Servicio de Almacenamiento No Disponible', '')
                return false
            } finally {
                loading.value = false
            }
        }
        else {
            await error('Datos Cancelados', '', '')
            return false
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
        const resultAlert = await confirm('Esta Seguro ???', 'Desea Actualizar la Contrasena ?')
        if (resultAlert.isConfirmed) {
            try {
                const resultService = await updatePassService(passRequest)
                if (resultService.status === 200) {
                    await success('Well Done!!!!!', 'Constrasena Actualizada Correctamente, Ingrese nuevamente con sus nuevas credenciales', '')
                    return true
                }
                else {
                    await error('Error !!!', 'Datos Incorectos Verifique e Intente mas tarde', '')
                    return false
                }
            } catch (errr) {
                errorUse.value = errr
                await error('Error !!!!', 'Servicio no Disponible', errr)
                return false
            } finally {
                loading.value = false
            }
        }
        else {
            await error('Datos Cancelados', '', '')
            return false
        }
    }

    const updatePasswordUse = async (value,nombre,paterno) => {
        loading.value = true
        errorUse.value = null
        var passRequest = {
            "id": value,
            "pass1": "",
            "pass2": "",
            "pass3": "",
        }
        const resultAlert = await confirm('Esta seguro ???', 'Restablecer la contraseña del Usuario ' + nombre + ' ' + paterno, '')
        if (resultAlert.isConfirmed) {
            try {
                const { data } = await updatePasswordService(passRequest)
                if(data){
                    await success('Well Done!!!','Constrasena Restablecida Correctamente','')
                    return true
                }
                else{
                    return false
                }
            } catch (errr) {
                errorUse.value = errr
                await error('Error !!!!!','Servicio no Disponible',errr)
                return false
            } finally {
                loading.value = false
            }
        }
        else {
            await error('Error !!!!!','Datos Cancelados','')
            return false 
        }
    }

    const addDatosUse = async (datos) => {
        loading.value = true
        errorUse.value = null
        const datosRequest = {
            "idp": datos.idp,
            "nombre": datos.nombre,
            "paterno": datos.paterno,
            "materno": datos.materno,
            "email": datos.email,
            "foto": '',
            "profesionNombre": datos.profesion,
            "cargoNombre": datos.cargoNombre,
            "emailEmpleado": datos.emailCor,
            "bancoNombre": datos.bancoNombre,
            "numero": datos.numero,
            "tipoCuenta": datos.tipoCuenta,
            "codigoCentroCostos": datos.codigoCentroCostos,
            "nombreCentroCostos": datos.nombreCentroCostos,
            "codigoSubCentroCostos": datos.codigoSubCentroCostos,
            "nombreSubCentroCostos": datos.nombreSubCentroCostos,
            "idpJefe": datos.idpJefe,
            "tipo": datos.tipo,
            "idpPago": datos.idpPago
        }
        try {
            return await addDatosService(datosRequest)
        } catch (err) {
            errorUse.value = err
            throw err
        } finally {
            loading.value = false
        }

    }

    const findAllResponseUse = async (estado) => {
        loading.value = true
        errorUse.value = null
        try {
            return await findAllResponseService(estado)
        } catch (errr) {
            errorUse.value = errr
            throw errr
        } finally {
            loading.value = false
        }

    }
    const findByRolUse = async (value) => {
        loading.value = true
        errorUse.value = null
        try {
            return await findByRolService(value)
        } catch (errr) {
            errorUse.value = errr
            throw errr
        } finally {
            loading.value = false
        }
    }
    const getDatosUse = async (value) => {
        loading.value = true
        errorUse.value = null
        try {
            const { data } = await getDatosService(value)
            Object.assign(perfilUsuario, getPerfil(data, img200))
            Object.assign(personaUsuario, getPersona(data))
            //return data
        } catch (errr) {
            errorUse.value = errr
            throw errr
        } finally {
            loading.value = false
        }
    }
    const getPerfilUse = async (value) => {
        loading.value = true
        errorUse.value = null
        try {
            const { data } = await getPerfilService(value)
            Object.assign(perfilCuenta, getPerfilCuenta(data))
        } catch (errr) {
            errorUse.value = errr
            throw errr
        } finally {
            loading.value = false
        }
    }
    /* Funcion para devolver el perfil del Usuario*/
    const getDatosUsuarioUse = async (value) => {
        loading.value = true
        errorUse.value = null
        try {
            const { data } = await getDatosUsuarioService(value)
            Object.assign(perfilUsuario, getPerfil(data, img100))
            Object.assign(personaUsuario, getPersona(data))
        } catch (errr) {
            errorUse.value = errr
        } finally {
            loading.value = false
        }
    }
    const setEstadoUse = async (value) => {
        loading.value = true
        errorUse.value = null
        try {
            const { status } = await setEstadoService(value)
            return status
        } catch (errr) {
            errorUse.value = errr
            throw errr

        } finally {
            loading.value = false
        }
    }
    const getEmpleadosFileUse = async () => {
        loading.value = true
        errorUse.value = null
        try {
            const { data } = await getEmpleadosFileService()
            return data
        } catch (errr) {
            errorUse.value = errr
            throw errr

        } finally {
            loading.value = false
        }
    }

    const getDatosEmpleadosUse = async () => {
        loading.value = true
        errorUse.value = null
        try {
            const { data } = await getDatosEmpleadosService()
            return data
        } catch (errr) {
            errorUse.value = errr
            throw errr
        } finally {
            loading.value = false
        }

    }

    const getUsuarioValidoUse = async (usuario, email) => {
        loading.value = true
        errorUse.value = null
        try {
            const { data } = await getUsuarioValidoService(usuario, email)
            return data
        } catch (errr) {
            errorUse.value = errr
            throw errr
        } finally {
            loading.value = false
        }
    }
    const updateUsuarioPernicionsUse = async (value) => {
        loading.value = true
        errorUse.value = null
        try {
            return await updateUsuarioPernicionsService(value)
        } catch (errr) {
            errorUse.value = errr
            throw errr
        } finally {
            loading.value = false
        }
    }
    const updateUsuarioRolUse = async (idAdmin, pass, idUser, rol) => {
        loading.value = true
        errorUse.value = null
        const user = {
            "idAdmin": idAdmin,
            "pass": pass,
            "idUser": idUser,
            "rol": rol,
        }
        try {
            return await updateUsuarioRolService(user)
        } catch (errr) {
            errorUse.value = errr
            throw errr
        } finally {
            loading.value = false
        }
    }
    return {
        updatePassUse,
        updatePasswordUse,
        updateUsuarioImagenUse,
        addDatosUse,
        findAllResponseUse,
        findByRolUse,
        getDatosUse,
        getDatosUsuarioUse,
        setEstadoUse,
        getEmpleadosFileUse,
        getDatosEmpleadosUse,
        getUsuarioValidoUse,
        updateUsuarioPernicionsUse,
        updateUsuarioRolUse,
        getPerfilUse,
        perfilUsuario,
        perfilCuenta,
        personaUsuario,
        loading,
        errorUse
    }
}