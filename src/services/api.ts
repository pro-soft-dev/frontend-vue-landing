import axios, { type AxiosInstance } from 'axios'

interface ApiConfig {
  baseURL: string
  timeout: number
}

class ApiService {
  private api: AxiosInstance

  constructor(config: ApiConfig) {
    this.api = axios.create({
      baseURL: config.baseURL,
      timeout: config.timeout,
      headers: {
        'Content-Type': 'application/json'
      }
    })
  }

  // Add request interceptor
  setupInterceptors(): void {
    this.api.interceptors.request.use(
      (config) => {
        const token = localStorage.getItem('token')
        if (token) {
          config.headers.Authorization = `Bearer ${token}`
        }
        return config
      },
      (error) => {
        return Promise.reject(error)
      }
    )
  }

  // Generic GET method
  async get<T>(url: string, params?: object): Promise<T> {
    const response = await this.api.get<T>(url, { params })
    return response.data
  }

  // Generic POST method
  async post<T>(url: string, data: object): Promise<T> {
    const response = await this.api.post<T>(url, data)
    return response.data
  }

  // Generic PUT method
  async put<T>(url: string, data: object): Promise<T> {
    const response = await this.api.put<T>(url, data)
    return response.data
  }

  // Generic DELETE method
  async delete<T>(url: string): Promise<T> {
    const response = await this.api.delete<T>(url)
    return response.data
  }
}

// Create and export API instance
export const api = new ApiService({
  baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000',
  timeout: 10000
})

export default api 