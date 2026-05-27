import { ref } from 'vue'
import { updateSettingService, getSettingService } from '@/services/settingsService'

export const useSettings = () => {
    const loadingSetting = ref(false)
    const errorSetting = ref(null)
    const updateSettingsUse = async (value) => {
        const response = {
            "id": value.id,
            "nombre": value.nombre,
            "categoria": value.categoria,
            "value": value.value,
            "fechaCreacion":"",
            "fechaActualizacion":""
        }
        try {
            return await updateSettingService(response)
        } catch (errr) {
            errorSetting.value = errr
            throw errr
        } finally {
            loadingSetting.value = false
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

    return {
        updateSettingsUse,
        getSettingsUse,
        loadingSetting,
        errorSetting
    }
} 