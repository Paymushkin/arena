/**
 * Главное хранилище приложения (Pinia)
 */

import { defineStore } from 'pinia'

interface AppState {
  loading: boolean
  sidebarOpen: boolean
  theme: 'light' | 'dark'
}

export const useAppStore = defineStore('app', {
  state: (): AppState => ({
    loading: false,
    sidebarOpen: false,
    theme: 'light'
  }),

  getters: {
    isLoading: (state) => state.loading,
    isSidebarOpen: (state) => state.sidebarOpen,
    currentTheme: (state) => state.theme
  },

  actions: {
    setLoading(value: boolean) {
      this.loading = value
    },

    toggleSidebar() {
      this.sidebarOpen = !this.sidebarOpen
    },

    setSidebarOpen(value: boolean) {
      this.sidebarOpen = value
    },

    toggleTheme() {
      this.theme = this.theme === 'light' ? 'dark' : 'light'

      // Сохраняем в localStorage
      if (process.client) {
        localStorage.setItem('theme', this.theme)
      }
    },

    setTheme(theme: 'light' | 'dark') {
      this.theme = theme

      if (process.client) {
        localStorage.setItem('theme', theme)
      }
    },

    initTheme() {
      if (process.client) {
        const savedTheme = localStorage.getItem('theme') as 'light' | 'dark' | null
        if (savedTheme) {
          this.theme = savedTheme
        }
      }
    }
  }
})
