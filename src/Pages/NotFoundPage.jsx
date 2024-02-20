import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import axios from '../Services/axios'
import { ErrorMessages } from '../Components/ErrorMessages'
import { Layout } from '../Components/Layout'

export const NotFoundPage = () => {
  const [error, setError] = useState(null)
  const params = useParams()

  useEffect(() => {
    const fetchApi = async () => {
      try {
        await axios({
          url: `${params.url}`
        })
      } catch (error) {
        if (!error?.response) {
          setError(<ErrorMessages>No pudo conectarse al servidor</ErrorMessages>)
        } else if (error?.response?.status === 404) {
          setError(<ErrorMessages>No se pudo encontrar la página</ErrorMessages>)
        }
      }
    }
    fetchApi()
  }, [])

  return (
    <Layout>
      <div>{error}</div>
    </Layout>
  )
}
