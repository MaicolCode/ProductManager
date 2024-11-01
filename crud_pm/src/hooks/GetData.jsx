import { useEffect, useState } from 'react'

export default function GetData(id) {
  const [data, setData] = useState(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(`http://localhost:3000/products/${id}`)
        const result = await res.json()
        setData(result.product)
      } catch (error) {
        console.error('Error fetching data:', error)
      }
    }

    fetchData()
  }, [id])

  return data
}
