import { ref } from 'vue'
import { updateCuentaService,createCuentaService, getCuentasService } from '@/services/cuentaService'

/**Declaraciones para alertas */
import { useAlert } from '@/composables/useAlert'
const { confirm, success, error } = useAlert()

export const useCuenta = () => {
    const loadingCuenta = ref(false)
    const errorCuenta = ref(null)
    const listaCuenta = ref([])

    //Registro de Cuenta Automatico desde Excel
    const createCuentaUse = async (value) => {
        loadingCuenta.value = true
        errorCuenta.value = null
        const cuenta = {
            "tipo": value.tipo,
            "cuenta": value.cuenta,
            "nombre": value.nombre,
            "glosa":value.glosa,
            "categoria":value.categoria
        }
        try {
            return await createCuentaService(cuenta)
        } catch (errr) {
            errorCuenta.value = false
        } finally {
            loadingCuenta.value = false
        }

    }

    const getCuentasUse = async (categoria) => {
        loadingCuenta.value = true
        errorCuenta.value = null
        listaCuenta.value = []
        try {
            const { data } = await getCuentasService(categoria)
            listaCuenta.value = data.map(item => ({
                id: item.idCuenta,
                tipo: item.tipo,
                cuenta: item.cuenta,
                nombre: item.nombre,
                glosa:item.glosa,
                categoria:item.categoria,
                acciones: item.idCuenta
            }))
        } catch (errr) {
            errorCuenta.value = false
        } finally {
            loadingCuenta.value = false
        }

    }

    const updateCuentaUse = async (value) => {
        loadingCuenta.value = true
        errorCuenta.value = null
        const cuenta ={
            "idCuenta":value.id,
            "tipo": value.tipo,
            "cuenta": value.cuenta,
            "nombre": value.nombre,
            "glosa":value.glosa,
            "categoria":value.categoria
        }
        const resultAlert = await confirm('Actuallizar Resgistro ?', 'Desea Actualizar registro de Gasto?', '')
        if (resultAlert.isConfirmed) {
            try {
                const resultService = await updateCuentaService(cuenta)
                if(resultService.status === 200){
                    await success('Well Done!!!!','Gasto Actualizado Corectamente')
                    return true
                }else{
                    await error('Error!!','Datos Incorectos intente mas tarde','')
                    return false
                }
            } catch (errr) {
                errorCuenta.value = errr
                await error('Error !!','Servicio no disponible',errr)
                return false
            } finally {
                loadingCuenta.value = false
            }
        }else{
            await error('Datos Cancelados!!','','')
            return false
        }
    }

    //Registro de cuanta manual desde la Vista
    const registrarCuentaUse = async (value) => {
        loadingCuenta.value = true
        errorCuenta.value = null
        const cuenta ={
            "tipo": value.tipo,
            "cuenta": value.cuenta,
            "nombre": value.nombre,
            "glosa":value.glosa,
            "categoria":value.categoria
        }
        const resultAlert = await confirm('Crear Nuevo Gasto ?', 'Desea Crear un Nuevo Registro de Gasto?', '')
        if (resultAlert.isConfirmed) {
            try {
                const resultService = await createCuentaService(cuenta)
                if(resultService.status === 201){
                    await success('Well Done!!!!','Gasto Creado Corectamente')
                    return true
                }else{
                    await error('Error!!','Datos Incorectos intente mas tarde','')
                    return false
                }
            } catch (errr) {
                errorCuenta.value = errr
                await error('Error !!','Servicio no disponible',errr)
                return false
            } finally {
                loadingCuenta.value = false
            }
        }else{
            await error('Datos Cancelados!!','','')
            return false
        }
    }

    return {
        createCuentaUse,
        getCuentasUse,
        updateCuentaUse,
        registrarCuentaUse,
        listaCuenta,
        loadingCuenta,
        errorCuenta,
        listaCuenta
    }
}
