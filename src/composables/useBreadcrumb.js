import { ref } from 'vue'

const actions = ref([])

export function useBreadcrumb() {

    const setActions = (newActions) => {
        actions.value = newActions
    }

    const clearActions = () => {
        actions.value = []
    }

    return {
        actions,
        setActions,
        clearActions
    }
}