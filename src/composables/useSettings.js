import { ref, reactive } from 'vue'
import { updateSettingService, getSettingService } from '@/services/settingsService'

import { dtoFormato } from '@/composables/Dto/dtoFormato'
const { getFormatoSRF } = dtoFormato()

import router from '@/router'

import { useAlert } from '@/composables/useAlert'
const { confirm, error, success } = useAlert()

export const useSettings = () => {
    const loadingSetting = ref(false)
    const errorSetting = ref(null)
    const config = reactive({
        id: '',
        categoria: '',
        nombre: '',
        value: {
            idp: '',
            nombre: '',
            correo: '',
            direccion: '',
            telefono: '',
            movil: '',
            doimio: '',
            idioma: 'Spanish'
        }
    })
    const formatoSRF = reactive({})
    const formatoRDG = reactive({
        id: null,
        categoria: '',
        nombre: '',
        value: {
            titulo: "",
            seccionUno: "",
            seccionDos: "",
            seccionTres: "",
        },
        fecha: ''
    })
    const updateSettingsUse = async (value) => {
        const resultAlert = await confirm('Actualizar', 'Desea actualizar los datos ???', '')
        if (resultAlert.isConfirmed) {
            const response = {
                "id": value.id,
                "nombre": value.nombre,
                "categoria": value.categoria,
                "value": value.value,
                "fechaCreacion": "",
                "fechaActualizacion": ""
            }
            try {
                const resultService = await updateSettingService(response)
                if (resultService.status === 200) {
                    await success('Well Done !!', 'Registro actualizado corectamente')
                    return true
                }
                else {
                    await error('Error !!!!', 'Servicio no disponible', '')
                    return false
                }
            } catch (errr) {
                errorSetting.value = errr
                await error('Error  !!!!', 'Servicio de Actualizacion No disponible', errr)
                return false
            } finally {
                loadingSetting.value = false
            }
        }
        else {
            await error('Datos Cancelados', '', '')
            return false
        }
    }
    const getSettingsUse = async (value) => {
        try {
            const { data } = await getSettingService(value)
            return data
        } catch (errr) {
            errorSetting.value = errr
            throw errr
        } finally {
            loadingSetting.value = false
        }
    }
    const getSettingsLocalUse = async () => {

        try {
            const { data } = await getSettingService(1)
            config.id = data.id
            config.categoria = data.categoria
            config.nombre = data.nombre
            config.value.idp = data.value.idp
            config.value.correo = data.value.correo
            config.value.dominio = data.value.dominio
            config.value.nombre = data.value.nombre
            config.value.telefono = data.value.telefono
            config.value.movil = data.value.movil
            config.value.direccion = data.value.direccion
            config.value.idioma = data.value.idioma
        } catch (errr) {
            errorSetting.value = errr
        } finally {
            loadingSetting.value = false
        }
    }
    const getFormatoSrfUse = async () => {
        loadingSetting.value = true
        errorSetting.value = null
        try {
            
            const { data } = await getSettingService(2)
            Object.assign(formatoSRF, getFormatoSRF(data))
            
            /*if (Number(data.value.cantidad) === Number(value)) {
                await error('Error !!!!!!!', 'Has alcanzado el límite de solicitudes. Debes esperar la aprobación de tus solicitudes pendientes antes de crear una nueva.', '')
                router.push({
                    name: 'ListaSRF',
                    params: { estado: 'pendiente' }
                })
            }*/
        } catch (errr) {
            errorSetting.value = errr
        } finally {
            loadingSetting.value = false
        }
    }
    const getFormatoRdgUse = async () => {
        try {
            const { data } = await getSettingService(3)
            formatoRDG.id = data.id
            formatoRDG.categoria = data.categoria
            formatoRDG.nombre = data.nombre
            formatoRDG.value.titulo = data.value.titulo
            formatoRDG.value.seccionUno = data.value.seccionUno
            formatoRDG.value.seccionDos = data.value.seccionDos
            formatoRDG.value.seccionTres = data.value.seccionTres
            formatoRDG.fecha = data.fechaActualizacion
        } catch (errr) {
            errorSetting.value = errr
        } finally {
            loadingSetting.value = false
        }
    }

    return {
        updateSettingsUse,
        getSettingsUse,
        getSettingsLocalUse,
        getFormatoSrfUse,
        getFormatoRdgUse,
        config,
        formatoSRF,
        formatoRDG,
        loadingSetting,
        errorSetting
    }
} 