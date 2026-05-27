import { ref } from 'vue'
import {updateUsuarioRolService,findByRolService,updateUsuarioPernicionsService,getUsuarioValidoService, getDatosEmpleadosService, updateUsuarioImagenService, updatePassService, addDatosService, findAllResponseService, getDatosService, getDatosUsuarioService, updatePasswordService, setEstadoService, getEmpleadosFileService } from '@/services/usuarioService'


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

    const updatePasswordUse = async (value) => {
        loading.value = true
        errorUse.value = null
        var passRequest = {
            "id": value,
            "pass1": "",
            "pass2": "",
            "pass3": "",
        }
        try {
            const { data } = await updatePasswordService(passRequest)
            return data
        } catch (err) {
            errorUse.value = err
            throw err
        } finally {
            loading.value = false
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
            "profesionNombre": datos.profesion,
            "cargoNombre": datos.cargoNombre,
            "numero": datos.numero,
            "tipoCuenta": datos.tipoCuenta,
            "bancoNombre": datos.bancoNombre,
            "codigoSucursal": datos.codigoSucursal,
            "nombreSucursal": datos.nombreSucursal,
            "codigoCentroCostos": datos.codigoCentroCostos,
            "nombreCentroCostos": datos.nombreCentroCostos,
            "nombreArea": datos.nombreArea,
            "idpJefe": datos.idpJefe,
            "tipo": datos.tipo
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
            return data
        } catch (errr) {
            errorUse.value = errr
            throw errr

        } finally {
            loading.value = false
        }
    }
    const getDatosUsuarioUse = async (value) => {
        loading.value = true
        errorUse.value = null
        try {
            const { data } = await getDatosUsuarioService(value)
            return data
        } catch (errr) {
            errorUse.value = errr
            throw errr

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
        loading.value= true
        errorUse.value=null
        try {
            const {data} = await getDatosEmpleadosService()
            return data
        } catch (errr) {
            errorUse.value= errr
            throw errr
        } finally {
            loading.value = false
        }

    }

    const getUsuarioValidoUse = async (usuario,email) =>{
        loading.value= true
        errorUse.value = null
        try{
            const {data} = await getUsuarioValidoService(usuario,email)
            return data
        }catch(errr){
            errorUse.value = errr
            throw errr
        }finally{
            loading.value = false
        }
    }
    const updateUsuarioPernicionsUse = async(value)=>{
        loading.value= true
        errorUse.value = null
        try{
            return await updateUsuarioPernicionsService(value)
        }catch(errr){
            errorUse.value = errr
            throw errr
        }finally{
            loading.value = false
        }
    }
    const updateUsuarioRolUse = async(idAdmin,pass,idUser,rol)=>{
        loading.value= true
        errorUse.value = null
        const user={
            "idAdmin":idAdmin,
            "pass":pass,
            "idUser":idUser,
            "rol":rol,
        }
        try{
            return await updateUsuarioRolService(user)
        }catch(errr){
            errorUse.value = errr
            throw errr
        }finally{
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
        loading,
        errorUse
    }
}