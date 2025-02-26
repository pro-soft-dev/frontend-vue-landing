import axios, { type AxiosInstance } from 'axios'

interface ApiConfig {
  baseURL: string
  timeout: number
}

interface Visitor {
  id: string;
  username: string;
  onlineTime: string;
  country: string;
  city: string;
}

interface VisitorResponse {
  visitors: Visitor[];
  total: number;
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

  // Add this method
  async getVisitors(): Promise<VisitorResponse> {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000));

    return {
      visitors: [
        { id: '1', username: '@Naser2134', onlineTime: '15 Sec', country: 'USA', city: 'USA' },
        { id: '2', username: '@Negi213_21', onlineTime: '25 Sec', country: 'Germany', city: 'Munich' },
        { id: '3', username: '@CreativeDan', onlineTime: '26 Sec', country: 'Germany', city: 'Berlin' },
        { id: '4', username: 'Unknown', onlineTime: '40 Sec', country: 'Ukrine', city: 'Kiev' },
        { id: '5', username: '@SarahaJo#2', onlineTime: '2 Min', country: 'France', city: 'Paris' },
        { id: '6', username: '@Antetek', onlineTime: '5 Min', country: 'Russia', city: 'Moscow' },
        { id: '7', username: '@Liliard', onlineTime: '7 Min', country: 'Russia', city: 'Moscow' },
        { id: '8', username: '@SarahaJo#2', onlineTime: '2 Min', country: 'France', city: 'Paris' },
        { id: '9', username: 'Unknown', onlineTime: '2 Min', country: 'France', city: 'Paris' }
      ],
      total: 9
    };
  }
}

// Create and export API instance
export const api = new ApiService({
  baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000',
  timeout: 10000
})

export default api 