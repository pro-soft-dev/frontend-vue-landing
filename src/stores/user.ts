import { defineStore } from 'pinia'

interface UserState {
  id: string | null
  name: string | null
  email: string | null
  isAuthenticated: boolean
}

export const useUserStore = defineStore('user', {
  state: (): UserState => ({
    id: null,
    name: null,
    email: null,
    isAuthenticated: false
  }),

  actions: {
    setUser(userData: Partial<UserState>) {
      if (userData.id) this.id = userData.id
      if (userData.name) this.name = userData.name
      if (userData.email) this.email = userData.email
      this.isAuthenticated = true
    },

    clearUser() {
      this.id = null
      this.name = null
      this.email = null
      this.isAuthenticated = false
    }
  },

  getters: {
    getUserProfile: (state): Partial<UserState> => ({
      id: state.id,
      name: state.name,
      email: state.email
    })
  }
}) 