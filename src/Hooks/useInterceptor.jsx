import { useEffect, useContext } from 'react'
import { AppContext } from '../Context/AppProvider'
import useRefreshToken from './useRefreshToken'
import { axiosPrivate } from '../Services/axios'

/* export const useInterceptor = () => {
  const { fetch: originalFetch } = window
  const refreshToken = useRefreshToken()
  console.log(refreshToken)
  window.fetch = async (...args) => {
    let [resource, config] = args
    const response = await originalFetch(resource, config)
    console.log(response)
    return response
  }
} */

export const useAxiosPrivate = () => {
  const refresh = useRefreshToken()
  const { signIn } = useContext(AppContext);

  useEffect(() => { 
    const requestIntercept = axiosPrivate.interceptors.request.use(
      (config) => {
        if (!config.headers.Authorization) {
          config.headers.Authorization = `Bearer ${signIn?.accessToken}`
        }
        return config
      }, (error) => Promise.reject(error)
    )

    const responseIntercept = axiosPrivate.interceptors.response.use(
      response => response,
      async (error) => {
        const prevRequest = error?.config
        if (error?.response?.status === 401 && !prevRequest?.sent) {
          prevRequest.sent = true
          const newAccessToken = await refresh()
          prevRequest.headers.Authorization = `Bearer ${newAccessToken}`
          return axiosPrivate(prevRequest)
        }
        return Promise.reject(error)
      }
    )

    return () => {
      axiosPrivate.interceptors.request.eject(requestIntercept)
      axiosPrivate.interceptors.response.eject(responseIntercept)
    }
  }, [signIn, refresh])

  return axiosPrivate
}
