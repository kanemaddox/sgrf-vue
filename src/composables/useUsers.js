import { useRouter } from 'vue-router'

export function useUser() {
    const router = useRouter()

    const goToProfile = () => {
        router.push({ name: 'Profile' })
    }
    
    return {
        goToProfile,
    }

}