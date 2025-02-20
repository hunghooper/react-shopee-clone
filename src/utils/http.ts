import axios, { AxiosError, AxiosInstance } from 'axios'
import HttpStatusCode from '../constants/httpStatusCode.enum'
import { toast } from 'react-toastify'
import { AuthResponse } from '../types/auth.type'
import { clearLS, getAccessTokenFromLS, setAccessTokenToLS, setProfileToLS } from './auth'
import path from '../constants/path'

class Http {
  instance: AxiosInstance
  private access_token: string
  constructor() {
    this.access_token = getAccessTokenFromLS()
    this.instance = axios.create({
      baseURL: 'https://api-ecom.duthanhduoc.com/',
      timeout: 10000,
      headers: {
        'Content-Type': 'application/json'
      }
    })
    // Add token to those request need access_token
    this.instance.interceptors.request.use(
      (config) => {
        if (this.access_token && config.headers) {
          config.headers.authorization = this.access_token
          return config
        }
        return config
      },
      (error) => {
        return Promise.reject(error)
      }
    )
    this.instance.interceptors.response.use(
      (response) => {
        const { url } = response.config
        const responseData = response.data as AuthResponse
        if (url === path.login || url === path.register) {
          this.access_token = responseData.data.access_token
          setAccessTokenToLS(this.access_token)
          setProfileToLS(responseData.data.user)
        } else if (url === path.logout) {
          this.access_token = ''
          clearLS()
        }
        return response
      },
      function (error: AxiosError) {
        if (error.response?.status !== HttpStatusCode.UnprocessableEntity) {
          const data: any | undefined = error.response?.data
          const message = data.message || error.message
          toast.error(message)
        }
        return Promise.reject(error)
      }
    )
  }
}

const http = new Http().instance
export default http
