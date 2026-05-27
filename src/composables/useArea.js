import { ref } from 'vue'
import { findByAllService } from '@/services/areaService'

export const useArea = () => {
    const loadingArea = ref(false)
    const errorArea = ref(null)
    const findByAllUse = async (value) => {
        try {
            const { data } = await findByAllService(value)
            return data
        } catch (errr) {
            errorArea.value = errr
            throw errr
        } finally {
            loadingArea.value = false
        }

    }
    return {
        findByAllUse,
        loadingArea,
        errorArea
    }

}