import { storeToRefs } from 'pinia'
import { useAuthStore } from '@/stores/authStores'

export function useAuth() {
  const store = useAuthStore()

  const { user, token, loading, isAuthenticated } = storeToRefs(store)

  return {
    user,
    token,
    loading,
    isAuthenticated,

    login: store.login,
    logout: store.logout,
    //fetchUser: store.fetchUser,
    refresh: store.refresh,
  }
}